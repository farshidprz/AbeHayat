import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { queryOne, query } from "@/lib/db";

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

  try {
    const data = await queryOne(
      `UPDATE registrations SET
        first_name=$1, last_name=$2, gender=$3, address=$4, phone=$5,
        email=$6, country=$7, city=$8, church_name=$9, prev_retreat=$10, special_needs=$11
       WHERE id=$12 RETURNING *`,
      [first_name, last_name, gender, address, phone, email, country, city, church_name, prev_retreat, special_needs, params.id]
    );
    return NextResponse.json({ data });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
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

  try {
    await query("DELETE FROM registrations WHERE id=$1", [params.id]);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
