"use client";

import { useState, useEffect, useCallback } from "react";

interface Registration {
  id: string;
  first_name: string;
  last_name: string;
  address: string;
  phone: string;
  email?: string;
  created_at: string;
}

interface EditForm {
  first_name: string;
  last_name: string;
  address: string;
  phone: string;
  email: string;
}

export default function DashboardPage() {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [editTarget, setEditTarget] = useState<Registration | null>(null);
  const [editForm, setEditForm] = useState<EditForm>({ first_name: "", last_name: "", address: "", phone: "", email: "" });
  const [saving, setSaving] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<Registration | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Restore token from sessionStorage
  useEffect(() => {
    const t = sessionStorage.getItem("admin-token");
    if (t) setToken(t);
  }, []);

  const fetchRegistrations = useCallback(async (t: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        headers: { authorization: `Bearer ${t}` },
      });
      if (res.status === 401) {
        setToken(null);
        sessionStorage.removeItem("admin-token");
        return;
      }
      const json = await res.json();
      setRegistrations(json.data || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) fetchRegistrations(token);
  }, [token, fetchRegistrations]);

  // ---- LOGIN ----
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoggingIn(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        setLoginError("نام کاربری یا رمز اشتباه است");
        return;
      }
      const { token: t } = await res.json();
      sessionStorage.setItem("admin-token", t);
      setToken(t);
    } finally {
      setLoggingIn(false);
    }
  };

  // ---- EDIT ----
  const openEdit = (r: Registration) => {
    setEditTarget(r);
    setEditForm({ first_name: r.first_name, last_name: r.last_name, address: r.address, phone: r.phone, email: r.email || "" });
  };

  const handleSave = async () => {
    if (!editTarget || !token) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/registrations/${editTarget.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
        body: JSON.stringify(editForm),
      });
      if (res.ok) {
        setRegistrations((prev) =>
          prev.map((r) => (r.id === editTarget.id ? { ...r, ...editForm } : r))
        );
        setEditTarget(null);
      }
    } finally {
      setSaving(false);
    }
  };

  // ---- DELETE ----
  const handleDelete = async () => {
    if (!deleteTarget || !token) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/registrations/${deleteTarget.id}`, {
        method: "DELETE",
        headers: { authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setRegistrations((prev) => prev.filter((r) => r.id !== deleteTarget.id));
        setDeleteTarget(null);
      }
    } finally {
      setDeleting(false);
    }
  };

  // ---- CSV EXPORT ----
  const exportCSV = () => {
    const header = ["نام", "نام خانوادگی", "تلفن", "آدرس", "ایمیل", "تاریخ ثبت‌نام"];
    const rows = filtered.map((r) => [
      r.first_name, r.last_name, r.phone, r.address, r.email || "",
      new Date(r.created_at).toLocaleString("fa-IR"),
    ]);
    const csv = [header, ...rows].map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "abehayat-registrations.csv";
    a.click();
  };

  const filtered = registrations.filter((r) => {
    const q = search.toLowerCase();
    return (
      r.first_name.toLowerCase().includes(q) ||
      r.last_name.toLowerCase().includes(q) ||
      r.phone.includes(q) ||
      r.address.toLowerCase().includes(q) ||
      (r.email || "").toLowerCase().includes(q)
    );
  });

  // ---- LOGIN SCREEN ----
  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-950 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-3xl">🔐</span>
            </div>
            <h1 className="text-xl font-bold text-gray-800">داشبورد مدیریت</h1>
            <p className="text-gray-400 text-sm mt-1">ورود به پنل ادمین</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">نام کاربری</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="input-field"
                dir="ltr"
                autoComplete="username"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">رمز عبور</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-field"
                dir="ltr"
                autoComplete="current-password"
              />
            </div>

            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-3 text-sm text-center">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={loggingIn}
              className="btn-primary w-full"
            >
              {loggingIn ? "در حال ورود..." : "ورود به داشبورد"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ---- DASHBOARD SCREEN ----
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-blue-900 text-white px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-lg font-bold">داشبورد ادمین — آب حیات</h1>
            <p className="text-blue-300 text-sm">مشاهده و مدیریت ثبت‌نام‌ها</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-blue-700 px-3 py-1.5 rounded-xl text-sm font-bold">
              {registrations.length} ثبت‌نام
            </span>
            <button
              onClick={exportCSV}
              className="bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded-xl text-sm font-semibold transition-colors"
            >
              📥 دانلود CSV
            </button>
            <button
              onClick={() => { setToken(null); sessionStorage.removeItem("admin-token"); }}
              className="bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-xl text-sm font-semibold transition-colors"
            >
              خروج
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="card text-center">
            <p className="text-3xl font-bold text-blue-700">{registrations.length}</p>
            <p className="text-gray-500 text-sm mt-1">مجموع ثبت‌نام‌ها</p>
          </div>
          <div className="card text-center">
            <p className="text-3xl font-bold text-green-600">
              {registrations.filter(r => {
                const d = new Date(r.created_at);
                const today = new Date();
                return d.toDateString() === today.toDateString();
              }).length}
            </p>
            <p className="text-gray-500 text-sm mt-1">ثبت‌نام امروز</p>
          </div>
          <div className="card text-center">
            <p className="text-3xl font-bold text-purple-600">
              {registrations.filter(r => r.email).length}
            </p>
            <p className="text-gray-500 text-sm mt-1">با ایمیل</p>
          </div>
        </div>

        {/* Search */}
        <div className="card mb-4">
          <div className="relative">
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="جستجو بر اساس نام، تلفن، آدرس یا ایمیل..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pr-10"
            />
          </div>
          {search && (
            <p className="text-sm text-gray-400 mt-2">
              {filtered.length} نتیجه از {registrations.length}
            </p>
          )}
        </div>

        {/* Table */}
        <div className="card overflow-hidden p-0">
          {loading ? (
            <div className="text-center py-16 text-gray-400">
              <svg className="animate-spin h-8 w-8 mx-auto mb-3" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              در حال بارگذاری...
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <div className="text-5xl mb-4">📭</div>
              <p>{search ? "نتیجه‌ای یافت نشد" : "هنوز ثبت‌نامی وجود ندارد"}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    {["#", "نام کامل", "تلفن", "آدرس", "ایمیل", "تاریخ", "عملیات"].map((h) => (
                      <th key={h} className="text-right px-4 py-3 text-xs font-bold text-gray-500 uppercase">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((r, i) => (
                    <tr key={r.id} className="hover:bg-blue-50/50 transition-colors">
                      <td className="px-4 py-3 text-gray-400 text-sm">{i + 1}</td>
                      <td className="px-4 py-3">
                        <span className="font-semibold text-gray-800">{r.first_name} {r.last_name}</span>
                      </td>
                      <td className="px-4 py-3 text-gray-600 text-sm" dir="ltr">{r.phone}</td>
                      <td className="px-4 py-3 text-gray-600 text-sm max-w-[180px] truncate">{r.address}</td>
                      <td className="px-4 py-3 text-gray-500 text-sm" dir="ltr">{r.email || "—"}</td>
                      <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                        {new Date(r.created_at).toLocaleDateString("fa-IR")}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEdit(r)}
                            className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                          >
                            ✏️ ویرایش
                          </button>
                          <button
                            onClick={() => setDeleteTarget(r)}
                            className="bg-red-100 hover:bg-red-200 text-red-600 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                          >
                            🗑️ حذف
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ---- EDIT MODAL ---- */}
      {editTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-md">
            <h2 className="font-bold text-lg text-gray-800 mb-5">ویرایش اطلاعات</h2>
            <div className="space-y-4">
              {[
                { key: "first_name", label: "نام" },
                { key: "last_name", label: "نام خانوادگی" },
                { key: "phone", label: "تلفن" },
                { key: "address", label: "آدرس" },
                { key: "email", label: "ایمیل (اختیاری)" },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">{label}</label>
                  <input
                    type="text"
                    value={editForm[key as keyof EditForm]}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, [key]: e.target.value }))}
                    className="input-field"
                    dir={key === "phone" || key === "email" ? "ltr" : undefined}
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setEditTarget(null)} className="btn-outline flex-1 text-sm py-2.5">
                انصراف
              </button>
              <button onClick={handleSave} disabled={saving} className="btn-primary flex-1 text-sm py-2.5">
                {saving ? "در حال ذخیره..." : "ذخیره تغییرات"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---- DELETE CONFIRM MODAL ---- */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-sm text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🗑️</span>
            </div>
            <h2 className="font-bold text-lg text-gray-800 mb-2">حذف ثبت‌نام</h2>
            <p className="text-gray-500 text-sm mb-6">
              آیا مطمئن هستید که می‌خواهید ثبت‌نام{" "}
              <strong>{deleteTarget.first_name} {deleteTarget.last_name}</strong> را حذف کنید؟
              این عمل قابل بازگشت نیست.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)} className="btn-outline flex-1 text-sm py-2.5">
                انصراف
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
              >
                {deleting ? "در حال حذف..." : "بله، حذف کن"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
