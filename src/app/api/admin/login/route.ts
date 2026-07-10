import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";

function makeToken(password: string): string {
  const secret = process.env.ADMIN_SECRET || "abehayat-secret";
  return createHash("sha256").update(password + secret).digest("hex");
}

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    const adminUser = process.env.ADMIN_USER || "admin";
    const adminPass = process.env.ADMIN_PASSWORD || "Abehayat123.";

    if (username !== adminUser || password !== adminPass) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = makeToken(adminPass);
    return NextResponse.json({ token });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
