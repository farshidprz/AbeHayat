import { Pool } from "pg";

// Connection pool — uses DATABASE_URL env var (server-side only, never sent to browser)
let pool: Pool | null = null;

function getPool(): Pool {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("DATABASE_URL is not set");
    }
    pool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false }, // required for Supabase
      max: 5,
      idleTimeoutMillis: 30000,
    });
  }
  return pool;
}

export type Row = Record<string, unknown>;

export async function query<T extends Row = Row>(
  sql: string,
  params: unknown[] = []
): Promise<T[]> {
  const client = await getPool().connect();
  try {
    const result = await client.query(sql, params);
    return result.rows as T[];
  } finally {
    client.release();
  }
}

export async function queryOne<T extends Row = Row>(
  sql: string,
  params: unknown[] = []
): Promise<T | null> {
  const rows = await query<T>(sql, params);
  return rows[0] ?? null;
}

export function isDbConfigured(): boolean {
  const url = process.env.DATABASE_URL;
  return !!url && !url.includes("[YOUR-PASSWORD]");
}
