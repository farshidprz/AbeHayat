import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

const DATA_DIR = path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "managed_users.json");
const GROUPS_FILE = path.join(DATA_DIR, "small_groups.json");

export interface ManagedUserRecord {
  id: string;
  first_name: string;
  last_name: string;
  gender?: string | null;
  phone: string;
  email?: string | null;
  country?: string | null;
  city?: string | null;
  church_name?: string | null;
  role: "manager" | "assistant" | "member";
  notes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface SmallGroupRecord {
  id: string;
  name: string;
  description?: string | null;
  manager_ids: string[];
  assistant_ids: string[];
  member_ids: string[];
  created_at: string;
  updated_at: string;
}

async function ensureFile(filePath: string) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, "[]", "utf-8");
  }
}

async function readJson<T>(filePath: string): Promise<T[]> {
  await ensureFile(filePath);
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw) as T[];
}

async function writeJson<T>(filePath: string, data: T[]): Promise<void> {
  await ensureFile(filePath);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export async function localGetUsers(): Promise<ManagedUserRecord[]> {
  return readJson<ManagedUserRecord>(USERS_FILE);
}

export async function localInsertUser(fields: Omit<ManagedUserRecord, "id" | "created_at" | "updated_at">): Promise<ManagedUserRecord> {
  const records = await localGetUsers();
  const now = new Date().toISOString();
  const record: ManagedUserRecord = {
    ...fields,
    id: randomUUID(),
    created_at: now,
    updated_at: now,
  };
  records.unshift(record);
  await writeJson(USERS_FILE, records);
  return record;
}

export async function localUpdateUser(id: string, fields: Partial<Omit<ManagedUserRecord, "id" | "created_at" | "updated_at">>): Promise<ManagedUserRecord | null> {
  const records = await localGetUsers();
  const idx = records.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  records[idx] = { ...records[idx], ...fields, updated_at: new Date().toISOString() };
  await writeJson(USERS_FILE, records);
  return records[idx];
}

export async function localDeleteUser(id: string): Promise<boolean> {
  const records = await localGetUsers();
  const next = records.filter((r) => r.id !== id);
  if (next.length === records.length) return false;
  await writeJson(USERS_FILE, next);
  return true;
}

export async function localGetGroups(): Promise<SmallGroupRecord[]> {
  return readJson<SmallGroupRecord>(GROUPS_FILE);
}

export async function localInsertGroup(fields: Omit<SmallGroupRecord, "id" | "created_at" | "updated_at">): Promise<SmallGroupRecord> {
  const records = await localGetGroups();
  const now = new Date().toISOString();
  const record: SmallGroupRecord = {
    ...fields,
    id: randomUUID(),
    created_at: now,
    updated_at: now,
  };
  records.unshift(record);
  await writeJson(GROUPS_FILE, records);
  return record;
}

export async function localUpdateGroup(id: string, fields: Partial<Omit<SmallGroupRecord, "id" | "created_at" | "updated_at">>): Promise<SmallGroupRecord | null> {
  const records = await localGetGroups();
  const idx = records.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  records[idx] = { ...records[idx], ...fields, updated_at: new Date().toISOString() };
  await writeJson(GROUPS_FILE, records);
  return records[idx];
}

export async function localDeleteGroup(id: string): Promise<boolean> {
  const records = await localGetGroups();
  const next = records.filter((r) => r.id !== id);
  if (next.length === records.length) return false;
  await writeJson(GROUPS_FILE, next);
  return true;
}
