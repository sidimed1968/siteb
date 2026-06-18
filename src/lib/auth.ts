import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users, type User } from "@/db/schema";
import { verifyPassword } from "@/lib/crypto";
import { getSession } from "@/lib/session";

export type SafeUser = Omit<User, "passwordHash">;

function toSafeUser(user: User): SafeUser {
  const { passwordHash: _passwordHash, ...safe } = user;
  return safe;
}

// Authentifie via identifiant + mot de passe. Renvoie l'utilisateur si valide et actif.
export async function authenticate(
  username: string,
  password: string,
): Promise<SafeUser | null> {
  const normalized = username.trim().toLowerCase();
  const rows = await db
    .select()
    .from(users)
    .where(eq(users.username, normalized))
    .limit(1);
  const user = rows[0];
  if (!user || !user.isActive) return null;
  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) return null;
  return toSafeUser(user);
}

// Récupère l'utilisateur courant (depuis la session) en revalidant en base.
export async function getCurrentUser(): Promise<SafeUser | null> {
  const session = await getSession();
  if (!session) return null;
  const rows = await db
    .select()
    .from(users)
    .where(eq(users.id, session.userId))
    .limit(1);
  const user = rows[0];
  if (!user || !user.isActive) return null;
  return toSafeUser(user);
}

export async function requireAdmin(): Promise<SafeUser | null> {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") return null;
  return user;
}
