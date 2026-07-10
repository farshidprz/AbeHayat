import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";
import { localInsert, localGetAll } from "@/lib/localStore";

function validateToken(token: string): boolean {
  const adminPass = process.env.ADMIN_PASSWORD || "Abehayat123.";
  const secret = process.env.ADMIN_SECRET || "abehayat-secret";
  const expected = createHash("sha256").update(adminPass + secret).digest("hex");
  return token === expected;
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  // Reject placeholder values
  if (!url || !key) return null;
  if (url.includes("your-project") || key === "your-anon-key") return null;
  return createClient(url, key);
}

function buildEmailHtml(data: {
  first_name: string;
  last_name: string;
  gender?: string;
  address: string;
  phone: string;
  email?: string;
  country?: string;
  city?: string;
  church_name?: string;
  prev_retreat?: string;
  special_needs?: string;
}) {
  const genderLabel = data.gender === "male" ? "آقا" : data.gender === "female" ? "خانم" : "—";
  const prevRetreatLabel = data.prev_retreat === "yes" ? "بله" : data.prev_retreat === "no" ? "خیر" : "—";
  return `
<!DOCTYPE html>
<html dir="rtl" lang="fa">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: Tahoma, Arial, sans-serif; background: #f0f4f8; margin: 0; padding: 20px; direction: rtl; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #1e3a5f, #2563eb); color: white; padding: 32px 24px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; }
    .header p { margin: 8px 0 0; opacity: 0.85; font-size: 14px; }
    .badge { display: inline-block; background: rgba(255,255,255,0.2); padding: 4px 14px; border-radius: 20px; font-size: 12px; margin-bottom: 12px; }
    .body { padding: 32px 24px; }
    .field { margin-bottom: 20px; border-bottom: 1px solid #f0f0f0; padding-bottom: 16px; }
    .label { font-size: 12px; color: #6b7280; margin-bottom: 4px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
    .value { font-size: 16px; color: #1f2937; font-weight: 500; }
    .footer { background: #f8fafc; padding: 20px 24px; text-align: center; color: #6b7280; font-size: 12px; border-top: 1px solid #e5e7eb; }
    .footer strong { color: #2563eb; }
    .timestamp { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 12px 16px; margin-top: 24px; font-size: 13px; color: #1d4ed8; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="badge">ثبت‌نام جدید</div>
      <h1>ریتریت آب حیات</h1>
      <p>یک نفر جدید ثبت‌نام کرده است</p>
    </div>
    <div class="body">
      <div class="field">
        <div class="label">نام</div>
        <div class="value">${data.first_name}</div>
      </div>
      <div class="field">
        <div class="label">نام خانوادگی</div>
        <div class="value">${data.last_name}</div>
      </div>
      <div class="field">
        <div class="label">جنسیت</div>
        <div class="value">${genderLabel}</div>
      </div>
      <div class="field">
        <div class="label">شماره تلفن</div>
        <div class="value" dir="ltr">${data.phone}</div>
      </div>
      ${data.email ? `<div class="field"><div class="label">ایمیل</div><div class="value" dir="ltr">${data.email}</div></div>` : ""}
      <div class="field">
        <div class="label">کشور</div>
        <div class="value">${data.country || "—"}</div>
      </div>
      <div class="field">
        <div class="label">شهر</div>
        <div class="value">${data.city || "—"}</div>
      </div>
      <div class="field">
        <div class="label">آدرس</div>
        <div class="value">${data.address}</div>
      </div>
      ${data.church_name ? `<div class="field"><div class="label">نام کلیسا</div><div class="value">${data.church_name}</div></div>` : ""}
      <div class="field">
        <div class="label">قبلاً در ریتریت بوده</div>
        <div class="value">${prevRetreatLabel}</div>
      </div>
      ${data.special_needs ? `<div class="field"><div class="label">نیازهای خاص</div><div class="value">${data.special_needs}</div></div>` : ""}
      <div class="timestamp">
        📅 تاریخ ثبت‌نام: ${new Date().toLocaleString("fa-IR")}
      </div>
    </div>
    <div class="footer">
      <strong>کلیسای آب حیات</strong> — سیستم ثبت‌نام ریتریت
    </div>
  </div>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { first_name, last_name, gender, address, phone, email, country, city, church_name, prev_retreat, special_needs } = body;

    if (!first_name || !last_name || !address || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Save to Supabase or local file fallback
    const supabase = getSupabase();
    let dbId: string | null = null;
    if (supabase) {
      const { data, error } = await supabase
        .from("registrations")
        .insert([{
          first_name, last_name, gender: gender || null, address, phone,
          email: email || null, country: country || null, city: city || null,
          church_name: church_name || null, prev_retreat: prev_retreat || null,
          special_needs: special_needs || null, accepted_rules: true,
        }])
        .select("id")
        .single();

      if (error) {
        console.error("Supabase insert error:", error.message, error.code);
        // Return a clear error so we know what's wrong
        return NextResponse.json(
          { error: "Database error: " + error.message, code: error.code },
          { status: 500 }
        );
      }
      if (data) dbId = data.id;
    } else {
      // Fallback: save to local JSON file (only works in local dev)
      try {
        const record = await localInsert({
          first_name, last_name, gender: gender || null, address, phone,
          email: email || null, country: country || null, city: city || null,
          church_name: church_name || null, prev_retreat: prev_retreat || null,
          special_needs: special_needs || null, accepted_rules: true,
        });
        dbId = record.id;
      } catch (localErr) {
        console.error("Local store error:", localErr);
        return NextResponse.json({ error: "No database configured" }, { status: 503 });
      }
    }

    // Send email (non-fatal — registration succeeds even if email fails)
    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_PASS;
    const adminEmail = process.env.ADMIN_EMAIL || gmailUser;
    const emailConfigured = gmailUser && gmailPass &&
      !gmailUser.includes("your-email") && gmailPass !== "your-app-password";

    if (emailConfigured && adminEmail) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: { user: gmailUser, pass: gmailPass },
        });
        await transporter.sendMail({
          from: `"آب حیات - ثبت‌نام" <${gmailUser}>`,
          to: adminEmail,
          subject: `✅ ثبت‌نام جدید: ${first_name} ${last_name}`,
          html: buildEmailHtml({ first_name, last_name, gender, address, phone, email, country, city, church_name, prev_retreat, special_needs }),
        });
      } catch (emailErr) {
        console.warn("Email send failed (non-fatal):", emailErr);
      }
    }

    return NextResponse.json({ success: true, id: dbId });
  } catch (err) {
    console.error("Register error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// GET all registrations (admin only)
export async function GET(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "") || "";
  if (!validateToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabase();
  if (!supabase) {
    // Fallback: read from local JSON file
    const data = await localGetAll();
    return NextResponse.json({ data });
  }

  const { data, error } = await supabase
    .from("registrations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}
