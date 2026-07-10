import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key || url.includes("your-project") || key === "your-anon-key") {
    return NextResponse.json({ ok: false, error: "Supabase not configured" });
  }

  try {
    const supabase = createClient(url, key);

    // Try to select from the table
    const { data, error } = await supabase
      .from("registrations")
      .select("id")
      .limit(1);

    if (error) {
      // Table might not exist — try to create it
      const createResult = await supabase.rpc("exec_sql", {
        sql: `CREATE TABLE IF NOT EXISTS registrations (
          id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
          first_name text NOT NULL,
          last_name text NOT NULL,
          gender text,
          address text NOT NULL,
          phone text NOT NULL,
          email text,
          country text,
          city text,
          church_name text,
          prev_retreat text,
          special_needs text,
          accepted_rules boolean DEFAULT true,
          created_at timestamptz DEFAULT now()
        );`,
      });

      return NextResponse.json({
        ok: false,
        supabase_url: url.substring(0, 40) + "...",
        key_prefix: key.substring(0, 20) + "...",
        error: error.message,
        hint: "Table 'registrations' does not exist. Please run the SQL migration in Supabase SQL Editor.",
        create_attempt: createResult,
      });
    }

    return NextResponse.json({
      ok: true,
      supabase_url: url.substring(0, 40) + "...",
      key_prefix: key.substring(0, 20) + "...",
      message: "Supabase connected and table exists",
      row_count: data?.length ?? 0,
    });
  } catch (err: unknown) {
    return NextResponse.json({
      ok: false,
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
}
