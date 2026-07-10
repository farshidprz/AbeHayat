"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/context/LanguageContext";

export default function RulesPage() {
  const { t } = useLang();
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [regData, setRegData] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("abehayat-reg");
    if (!stored) {
      router.replace("/register");
      return;
    }
    setRegData(JSON.parse(stored));
  }, [router]);

  const handleSubmit = async () => {
    if (!accepted || !regData) return;
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(regData),
      });

      if (!res.ok) throw new Error("Server error");

      sessionStorage.setItem("abehayat-confirmed", JSON.stringify(regData));
      sessionStorage.removeItem("abehayat-reg");
      router.push("/confirmation");
    } catch {
      setError(t.common.error);
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Steps */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold">✓</div>
            <span className="text-sm text-green-600 font-medium">اطلاعات</span>
          </div>
          <div className="w-12 h-0.5 bg-blue-400" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center text-sm font-bold">2</div>
            <span className="text-sm font-medium text-blue-700">{t.rules.title}</span>
          </div>
        </div>

        <div className="card shadow-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-3xl">📋</span>
            </div>
            <h1 className="text-2xl font-bold text-blue-900">{t.rules.title}</h1>
            <p className="text-gray-500 text-sm mt-1">{t.rules.desc}</p>
          </div>

          {/* Rules */}
          <div className="space-y-6 mb-8">
            {t.rules.rules_list.map((section, si) => (
              <div key={si} className="bg-blue-50 rounded-2xl p-5">
                <h3 className="font-bold text-blue-800 text-base mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-700 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                    {si + 1}
                  </span>
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.items.map((item, ii) => (
                    <li key={ii} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-blue-500 mt-0.5 shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Accept checkbox */}
          <label className="flex items-start gap-3 cursor-pointer bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="w-5 h-5 mt-0.5 accent-green-600 shrink-0"
            />
            <span className="text-sm text-gray-700 font-medium">{t.rules.accept_label}</span>
          </label>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-3 text-sm mb-4 text-center">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!accepted || submitting}
            className={`w-full py-4 rounded-2xl font-bold text-base transition-all ${
              accepted && !submitting
                ? "bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                {t.rules.submitting}
              </span>
            ) : (
              `✅ ${t.rules.submit_btn}`
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
