import { NextRequest, NextResponse } from "next/server";
import { dbInsert, dbSelect, dbDelete, dbUpdate, isConfigured } from "@/lib/supabaseRest";
import { localGetGroups, localInsertGroup, localUpdateGroup, localDeleteGroup } from "@/lib/adminLocalStore";
import { validateAdminToken } from "@/lib/adminAuth";

export async function GET(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "") || "";
  if (!validateAdminToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isConfigured()) {
    const groups = await localGetGroups();
    return NextResponse.json({ data: groups });
  }

  const { data, error } = await dbSelect("small_groups", { order: "created_at.desc" });
  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ data: data || [] });
}

export async function POST(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "") || "";
  if (!validateAdminToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const managerIds = Array.isArray(body.manager_ids) ? body.manager_ids.filter(Boolean) : [];
  const assistantIds = Array.isArray(body.assistant_ids) ? body.assistant_ids.filter(Boolean) : [];
  const memberIds = Array.isArray(body.member_ids) ? body.member_ids.filter(Boolean) : [];

  if (!body.name) {
    return NextResponse.json({ error: "Group name is required" }, { status: 400 });
  }
  if (managerIds.length > 2) {
    return NextResponse.json({ error: "Each group can have up to 2 managers" }, { status: 400 });
  }

  const fields = {
    name: body.name,
    description: body.description || null,
    manager_ids: managerIds,
    assistant_ids: assistantIds,
    member_ids: memberIds,
  };

  if (!isConfigured()) {
    const data = await localInsertGroup(fields);
    return NextResponse.json({ data });
  }

  const { data, error } = await dbInsert("small_groups", fields);
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
  if (!id) return NextResponse.json({ error: "Missing group id" }, { status: 400 });

  if (Array.isArray(fields.manager_ids) && fields.manager_ids.length > 2) {
    return NextResponse.json({ error: "Each group can have up to 2 managers" }, { status: 400 });
  }

  if (!isConfigured()) {
    const data = await localUpdateGroup(id, fields);
    if (!data) return NextResponse.json({ error: "Group not found" }, { status: 404 });
    return NextResponse.json({ data });
  }

  const { data, error } = await dbUpdate("small_groups", id, fields);
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
  if (!id) return NextResponse.json({ error: "Missing group id" }, { status: 400 });

  if (!isConfigured()) {
    const deleted = await localDeleteGroup(id);
    if (!deleted) return NextResponse.json({ error: "Group not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  }

  const { error } = await dbDelete("small_groups", id);
  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ success: true });
}
