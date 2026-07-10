import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "registrations.json");

export interface Registration {
  id: string;
  first_name: string;
  last_name: string;
  gender?: string | null;
  address: string;
  phone: string;
  email?: string | null;
  country?: string | null;
  city?: string | null;
  church_name?: string | null;
  prev_retreat?: string | null;
  special_needs?: string | null;
  accepted_rules?: boolean;
  created_at: string;
}

async function ensureFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, "[]", "utf-8");
  }
}

async function readAll(): Promise<Registration[]> {
  await ensureFile();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(raw) as Registration[];
}

async function writeAll(data: Registration[]): Promise<void> {
  await ensureFile();
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export async function localInsert(
  fields: Omit<Registration, "id" | "created_at">
): Promise<Registration> {
  const records = await readAll();
  const record: Registration = {
    ...fields,
    id: randomUUID(),
    created_at: new Date().toISOString(),
  };
  records.unshift(record);
  await writeAll(records);
  return record;
}

export async function localGetAll(): Promise<Registration[]> {
  return readAll();
}

export async function localUpdate(
  id: string,
  fields: Partial<Omit<Registration, "id" | "created_at">>
): Promise<Registration | null> {
  const records = await readAll();
  const idx = records.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  records[idx] = { ...records[idx], ...fields };
  await writeAll(records);
  return records[idx];
}

export async function localDelete(id: string): Promise<boolean> {
  const records = await readAll();
  const next = records.filter((r) => r.id !== id);
  if (next.length === records.length) return false;
  await writeAll(next);
  return true;
}
