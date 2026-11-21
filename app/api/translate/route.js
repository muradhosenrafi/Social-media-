const rateLimit = globalThis.__dateflowTranslationRateLimit ?? new Map();
globalThis.__dateflowTranslationRateLimit = rateLimit;

export async function POST(request) {
  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "translation_not_configured" }, { status: 503 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const { target, texts } = body ?? {};
  if (
    typeof target !== "string" ||
    !/^[a-z]{2,3}(?:-[A-Z]{2})?$/.test(target) ||
    !Array.isArray(texts) ||
    texts.length < 1 ||
    texts.length > 100 ||
    texts.some((text) => typeof text !== "string" || text.length > 2000) ||
    texts.reduce((total, text) => total + text.length, 0) > 20000
  ) {
    return Response.json({ error: "invalid_translation_request" }, { status: 400 });
  }

  const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || "unknown";
  const now = Date.now();
  const recent = (rateLimit.get(clientIp) ?? []).filter((time) => now - time < 60_000);
  if (recent.length >= 30) {
    return Response.json({ error: "translation_rate_limited" }, { status: 429 });
  }
  recent.push(now);
  rateLimit.set(clientIp, recent);

  try {
    const googleResponse = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${encodeURIComponent(apiKey)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: texts, source: "en", target, format: "text" }),
      },
    );
    const result = await googleResponse.json();
    if (!googleResponse.ok) {
      return Response.json({ error: "google_translation_failed" }, { status: 502 });
    }

    return Response.json({
      translations: result.data.translations.map((item) => item.translatedText),
    });
  } catch {
    return Response.json({ error: "translation_service_unavailable" }, { status: 502 });
  }
}
