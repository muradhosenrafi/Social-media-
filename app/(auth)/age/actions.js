"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function confirmAge() {
  const cookieStore = await cookies();
  cookieStore.set("age_verified", "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // ১ বছর
  });
  redirect("/register");
}