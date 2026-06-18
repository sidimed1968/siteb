import { inArray } from "drizzle-orm";
import { db } from "@/db";
import { siteSettings } from "@/db/schema";

export const SETTINGS_KEYS = {
  maintenanceMode: "maintenance_mode", // "on" | "off"
  maintenanceMessageFr: "maintenance_message_fr",
  maintenanceMessageAr: "maintenance_message_ar",
  disabledPages: "disabled_pages", // liste séparée par des virgules, ex: "/annuaire,/contact"
} as const;

export const DEFAULT_SETTINGS: Record<string, string> = {
  [SETTINGS_KEYS.maintenanceMode]: "off",
  [SETTINGS_KEYS.maintenanceMessageFr]:
    "Le site est en cours de maintenance. Merci de revenir plus tard.",
  [SETTINGS_KEYS.maintenanceMessageAr]:
    "الموقع قيد الصيانة حاليًا. يرجى العودة لاحقًا.",
  [SETTINGS_KEYS.disabledPages]: "",
};

export async function getSettings(
  keys?: string[],
): Promise<Record<string, string>> {
  const wanted = keys ?? Object.values(SETTINGS_KEYS);
  const rows = await db
    .select()
    .from(siteSettings)
    .where(inArray(siteSettings.key, wanted));
  const result: Record<string, string> = {};
  for (const key of wanted) {
    const row = rows.find((r) => r.key === key);
    result[key] = row?.value ?? DEFAULT_SETTINGS[key] ?? "";
  }
  return result;
}

export async function setSetting(key: string, value: string): Promise<void> {
  await db
    .insert(siteSettings)
    .values({ key, value, updatedAt: new Date().toISOString() })
    .onConflictDoUpdate({
      target: siteSettings.key,
      set: { value, updatedAt: new Date().toISOString() },
    });
}
