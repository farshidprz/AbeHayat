// Direct Supabase REST API helper — bypasses supabase-js client issues
// with the new sb_publishable_ key format

// Anon key: only for public INSERT (registration)
function getAnonConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
  if (!url || !key || url.includes("your-project") || key === "your-anon-key")
    return null;
  return { url: url.replace(/\/$/, ""), key };
}

// Service role key: for admin SELECT/UPDATE/DELETE — never sent to browser
function getServiceConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const key = process.env.SUPABASE_SERVICE_KEY ?? "";
  if (!url || !key) return null;
  return { url: url.replace(/\/$/, ""), key };
}

// For backward compat: prefer service key, fall back to anon
function getConfig() {
  return getServiceConfig() ?? getAnonConfig();
}

function headers(key: string) {
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  };
}

export type SupabaseRow = Record<string, unknown>;

export async function dbInsert(
  table: string,
  row: SupabaseRow
): Promise<{ data: SupabaseRow | null; error: string | null }> {
  // INSERT uses anon key — public registration is intentional
  const cfg = getAnonConfig();
  if (!cfg) return { data: null, error: "Supabase not configured" };

  const res = await fetch(`${cfg.url}/rest/v1/${table}`, {
    method: "POST",
    headers: headers(cfg.key),
    body: JSON.stringify(row),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    return { data: null, error: err.message ?? res.statusText };
  }

  const rows = (await res.json()) as SupabaseRow[];
  return { data: rows[0] ?? null, error: null };
}

export async function dbSelect(
  table: string,
  params: Record<string, string> = {}
): Promise<{ data: SupabaseRow[] | null; error: string | null }> {
  // Prefer service key for reads; fall back to anon key (protected at API layer by admin token)
  const cfg = getServiceConfig() ?? getAnonConfig();
  if (!cfg) return { data: null, error: "Supabase not configured" };

  const qs = new URLSearchParams({ select: "*", order: "created_at.desc", ...params });
  const res = await fetch(`${cfg.url}/rest/v1/${table}?${qs}`, {
    headers: { apikey: cfg.key, Authorization: `Bearer ${cfg.key}` },
    cache: "no-store",
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    return { data: null, error: err.message ?? res.statusText };
  }

  return { data: (await res.json()) as SupabaseRow[], error: null };
}

export async function dbUpdate(
  table: string,
  id: string,
  row: SupabaseRow
): Promise<{ data: SupabaseRow | null; error: string | null }> {
  const cfg = getServiceConfig() ?? getAnonConfig();
  if (!cfg) return { data: null, error: "Supabase not configured" };

  const res = await fetch(`${cfg.url}/rest/v1/${table}?id=eq.${id}`, {
    method: "PATCH",
    headers: headers(cfg.key),
    body: JSON.stringify(row),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    return { data: null, error: err.message ?? res.statusText };
  }

  const rows = (await res.json()) as SupabaseRow[];
  return { data: rows[0] ?? null, error: null };
}

export async function dbDelete(
  table: string,
  id: string
): Promise<{ error: string | null }> {
  const cfg = getServiceConfig() ?? getAnonConfig();
  if (!cfg) return { error: "Supabase not configured" };

  const res = await fetch(`${cfg.url}/rest/v1/${table}?id=eq.${id}`, {
    method: "DELETE",
    headers: { apikey: cfg.key, Authorization: `Bearer ${cfg.key}` },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    return { error: err.message ?? res.statusText };
  }

  return { error: null };
}

export function isConfigured(): boolean {
  return getAnonConfig() !== null;
}

export function isAdminConfigured(): boolean {
  return getServiceConfig() !== null;
}
