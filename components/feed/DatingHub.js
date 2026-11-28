"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { currentUser, datingPosts } from "@/lib/mock-data";
import { useVerification } from "@/lib/verification";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const KEY = "dateflow.datingRequests";
const ROLE_KEY = "dateflow.datingRole";
const defaultRequests = [{ id: "req-1", postId: 5, from: { id: "sadia", name: "সাদিয়া", username: "sadia" }, status: "pending" }];

export default function DatingHub() {
  const { t } = useLanguage();
  const verification = useVerification();
  const verified = verification.status === "verified" || (verification.status === "none" && currentUser.verified);
  const [requests, setRequests] = useState([]);
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState("");
  const [role, setRole] = useState("member");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      setRequests(saved ? JSON.parse(saved) : defaultRequests);
      setRole(localStorage.getItem(ROLE_KEY) || "member");
    } catch {
      setRequests(defaultRequests);
    }
    setReady(true);
  }, []);

  const saveRequests = (next) => {
    setRequests(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
  };

  if (!verified) {
    return <section className="mx-auto max-w-2xl rounded-2xl bg-surface p-6 shadow-sm">
      <h1 className="text-2xl font-bold">{t("dating.verifyTitle")}</h1>
      <p className="mt-2 text-ink/70">{t("dating.verifyDesc")}</p>
      <Link className="mt-5 inline-flex rounded-xl bg-maroon-700 px-5 py-3 font-semibold text-white" href="/settings/verification">{t("dating.verifyButton")}</Link>
    </section>;
  }

  const sendRequest = (postId) => {
    const exists = requests.some((request) => request.postId === postId && request.from.username === currentUser.username);
    if (exists) return;
    saveRequests([...requests, { id: `req-${Date.now()}`, postId, from: { id: currentUser.username, name: currentUser.name, username: currentUser.username }, status: "pending" }]);
    setNotice(t("dating.requestSent"));
  };

  const respond = (id, status) => saveRequests(requests.map((request) => request.id === id ? { ...request, status } : request));
  const incoming = requests.filter((request) => request.status === "pending" && request.from.username !== currentUser.username);

  return <main className="mx-auto w-full max-w-2xl space-y-6 px-4 py-6">
    <header className="flex flex-wrap items-center justify-between gap-3">
      <div><h1 className="text-2xl font-bold">{t("dating.title")}</h1><p className="mt-1 text-sm text-ink/65">{t("dating.description")}</p></div>
      {role === "host" && <Link href="/create-listing" className="rounded-xl bg-maroon-700 px-4 py-2.5 text-sm font-semibold text-white">{t("dating.createPost")}</Link>}
    </header>

    {role === "host" && <section className="rounded-2xl bg-surface p-5 shadow-sm" aria-labelledby="dating-requests-heading">
      <h2 id="dating-requests-heading" className="text-lg font-bold">{t("dating.confirmTitle")}</h2>
      {!ready ? <p className="mt-3 text-sm text-ink/60">{t("dating.loading")}</p> : incoming.length === 0 ? <p className="mt-3 text-sm text-ink/60">{t("dating.noRequests")}</p> : <ul className="mt-3 divide-y divide-ink/10">
        {incoming.map((request) => {
          const post = datingPosts.find((item) => item.id === request.postId);
          return <li key={request.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
            <div><p className="font-semibold">{request.from.name} <span className="font-normal text-ink/60">(@{request.from.username})</span></p><p className="text-sm text-ink/65">{post?.title ?? t("dating.postUnavailable")}</p></div>
            <div className="flex gap-2"><button onClick={() => saveRequests(requests.filter((item) => item.id !== request.id))} className="rounded-lg border border-ink/15 px-3 py-2 text-sm font-semibold">{t("dating.delete")}</button><button onClick={() => respond(request.id, "confirmed")} className="rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white">{t("dating.confirm")}</button></div>
          </li>;
        })}
      </ul>}
    </section>}

    {notice && <p role="status" className="rounded-xl bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-800">{notice}</p>}
    <section className="space-y-4" aria-label={t("dating.posts")}>
      {datingPosts.map((post) => {
        const ownRequest = requests.find((request) => request.postId === post.id && request.from.username === currentUser.username);
        return <article key={post.id} className="rounded-2xl bg-surface p-5 shadow-sm">
          <div className="flex items-start justify-between gap-3"><div><Link href={`/profile/${post.user.username}`} className="font-bold hover:text-maroon-700">{post.user.name}</Link><p className="mt-1 text-xs text-ink/55">{post.timeAgo}</p></div><span className="rounded-full bg-maroon-50 px-3 py-1 text-xs font-semibold text-maroon-800">{t("listing.category.dating")}</span></div>
          <h2 className="mt-4 text-lg font-bold">{post.title}</h2><p className="mt-2 whitespace-pre-line text-sm leading-6 text-ink/80">{post.text}</p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink/65">{post.location && <span>📍 {post.location}</span>}{post.schedule && <span>🗓 {post.schedule}</span>}</div>
          {post.user.username === currentUser.username ? <p className="mt-5 text-sm font-semibold text-ink/60">{t("dating.yourPost")}</p> : role === "guest" ? <button disabled={Boolean(ownRequest)} onClick={() => sendRequest(post.id)} className="mt-5 rounded-xl bg-maroon-700 px-4 py-2.5 text-sm font-semibold text-white disabled:cursor-default disabled:bg-ink/20 disabled:text-ink/60">{ownRequest ? t(ownRequest.status === "confirmed" ? "dating.requestConfirmed" : "dating.requestPending") : t("dating.request")}</button> : null}
        </article>;
      })}
    </section>
  </main>;
}
