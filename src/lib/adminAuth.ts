import { createHash } from "crypto";

export function createAdminToken(password: string): string {
  const secret = process.env.ADMIN_SECRET || "abehayat-secret";
  return createHash("sha256").update(password + secret).digest("hex");
}

export function validateAdminToken(token: string): boolean {
  const adminPass = process.env.ADMIN_PASSWORD || "Abehayat123.";
  return token === createAdminToken(adminPass);
}
