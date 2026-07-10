import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { dbUpdate, dbDelete } from "@/lib/supabaseRest";

function validateToken(token: string): boolean {
  const adminPass = process.env.ADMIN_PASSWORD || "Abehayat123.";
  const secret = process.env.ADMIN_SECRET || "abehayat-secret";
  const expected = createHash("sha256").update(adminPass + secret).digest("hex");
  return token === expected;
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

  const body = await req.json();
  const { first_name, last_name, gender, address, phone, email, country, city, church_name, prev_retreat, special_needs } = body;

  const { data, error } = await dbUpdate("registrations", params.id, {
    first_name, last_name, gender, address, phone, email, country, city, church_name, prev_retreat, special_needs,
  });

  if (error) return NextResponse.json({ error }, { status: 500 });
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

  const { error } = await dbDelete("registrations", params.id);
  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ success: true });
}
