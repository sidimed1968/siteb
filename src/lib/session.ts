import { cookies } from "next/headers";
import {
  signSession,
  verifySession,
  type SessionPayload,
} from "@/lib/crypto";

export const SESSION_COOKIE = "onps_session";
const SESSION_DAYS = 7;

function getSecret(): string {
  return process.env.AUTH_SECRET ?? "onps-dev-secret-change-me";
}

export async function createSession(payload: {
  userId: number;
  username: string;
  role: string;
}): Promise<void> {
  const exp = Math.floor(Date.now() / 1000) + SESSION_DAYS * 24 * 60 * 60;
  const token = await signSession({ ...payload, exp }, getSecret());
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySession(token, getSecret());
}
