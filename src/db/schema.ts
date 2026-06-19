import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Utilisateurs : administrateurs et visiteurs autorisés (comptes créés par l'admin)
export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),
  fullName: text("full_name").notNull().default(""),
  email: text("email").notNull().default(""),
  passwordHash: text("password_hash").notNull(),
  // "admin" ou "visitor"
  role: text("role").notNull().default("visitor"),
  // 1 = compte autorisé/actif, 0 = désactivé
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

// Paramètres globaux du site (clé/valeur) : maintenance, textes, etc.
export const siteSettings = sqliteTable("site_settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull().default(""),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

// Annuaire des professionnels de santé
export const professionals = sqliteTable("professionals", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  fullName: text("full_name").notNull(),
  profession: text("profession").notNull().default(""),
  speciality: text("speciality").notNull().default(""),
  city: text("city").notNull().default(""),
  region: text("region").notNull().default(""),
  phone: text("phone").notNull().default(""),
  email: text("email").notNull().default(""),
  licenseNumber: text("license_number").notNull().default(""),
  bio: text("bio").notNull().default(""),
  isPublished: integer("is_published", { mode: "boolean" })
    .notNull()
    .default(true),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

// Demandes d'inscription soumises depuis le site public
export const registrations = sqliteTable("registrations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  fullName: text("full_name").notNull(),
  profession: text("profession").notNull().default(""),
  speciality: text("speciality").notNull().default(""),
  city: text("city").notNull().default(""),
  phone: text("phone").notNull().default(""),
  email: text("email").notNull().default(""),
  licenseNumber: text("license_number").notNull().default(""),
  message: text("message").notNull().default(""),
  // "pending" | "approved" | "rejected"
  status: text("status").notNull().default("pending"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

// Actualités / annonces
export const news = sqliteTable("news", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull().default(""),
  content: text("content").notNull().default(""),
  coverImage: text("cover_image").notNull().default(""),
  isPublished: integer("is_published", { mode: "boolean" })
    .notNull()
    .default(true),
  publishedAt: text("published_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

// Messages reçus via le formulaire de contact
export const contactMessages = sqliteTable("contact_messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull().default(""),
  phone: text("phone").notNull().default(""),
  subject: text("subject").notNull().default(""),
  message: text("message").notNull(),
  isRead: integer("is_read", { mode: "boolean" }).notNull().default(false),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Professional = typeof professionals.$inferSelect;
export type Registration = typeof registrations.$inferSelect;
export type News = typeof news.$inferSelect;
export type ContactMessage = typeof contactMessages.$inferSelect;
