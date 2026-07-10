import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { createClient } from "@supabase/supabase-js";

function validateToken(token: string): boolean {
  const adminPass = process.env.ADMIN_PASSWORD || "Abehayat123.";
  const secret = process.env.ADMIN_SECRET || "abehayat-secret";
  const expected = createHash("sha256").update(adminPass + secret).digest("hex");
  return token === expected;
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

// PATCH /api/registrations/[id]
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "") || "";
  if (!validateToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabase();
  if (!supabase) return NextResponse.json({ error: "No database" }, { status: 503 });

  const body = await req.json();
  const { first_name, last_name, gender, address, phone, email, country, city, church_name, prev_retreat, special_needs } = body;

  const { data, error } = await supabase
    .from("registrations")
    .update({ first_name, last_name, gender, address, phone, email, country, city, church_name, prev_retreat, special_needs })
    .eq("id", params.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

// DELETE /api/registrations/[id]
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "") || "";
  if (!validateToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabase();
  if (!supabase) return NextResponse.json({ error: "No database" }, { status: 503 });

  const { error } = await supabase
    .from("registrations")
    .delete()
    .eq("id", params.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
