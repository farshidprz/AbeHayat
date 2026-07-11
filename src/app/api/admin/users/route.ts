import { NextRequest, NextResponse } from "next/server";
import { dbInsert, dbSelect, dbDelete, dbUpdate, isConfigured } from "@/lib/supabaseRest";
import { localGetUsers, localInsertUser, localUpdateUser, localDeleteUser } from "@/lib/adminLocalStore";
import { validateAdminToken } from "@/lib/adminAuth";

export async function GET(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "") || "";
  if (!validateAdminToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isConfigured()) {
    const data = await localGetUsers();
    return NextResponse.json({ data });
  }

  const { data, error } = await dbSelect("managed_users", { order: "created_at.desc" });
  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ data: data || [] });
}

export async function POST(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "") || "";
  if (!validateAdminToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const fields = {
    first_name: body.first_name,
    last_name: body.last_name,
    gender: body.gender || null,
    phone: body.phone,
    email: body.email || null,
    country: body.country || null,
    city: body.city || null,
    church_name: body.church_name || null,
    role: body.role || "member",
    notes: body.notes || null,
  };

  if (!fields.first_name || !fields.last_name || !fields.phone) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (!isConfigured()) {
    const data = await localInsertUser(fields);
    return NextResponse.json({ data });
  }

  const { data, error } = await dbInsert("managed_users", fields);
  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ data });
}

export async function PATCH(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "") || "";
  if (!validateAdminToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { id, ...fields } = body;
  if (!id) return NextResponse.json({ error: "Missing user id" }, { status: 400 });

  if (!isConfigured()) {
    const data = await localUpdateUser(id, fields);
    if (!data) return NextResponse.json({ error: "User not found" }, { status: 404 });
    return NextResponse.json({ data });
  }

  const { data, error } = await dbUpdate("managed_users", id, fields);
  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ data });
}

export async function DELETE(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "") || "";
  if (!validateAdminToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const id = body.id || "";
  if (!id) return NextResponse.json({ error: "Missing user id" }, { status: 400 });

  if (!isConfigured()) {
    const deleted = await localDeleteUser(id);
    if (!deleted) return NextResponse.json({ error: "User not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  }

  const { error } = await dbDelete("managed_users", id);
  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ success: true });
}
