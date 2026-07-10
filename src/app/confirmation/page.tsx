"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";

export default function ConfirmationPage() {
  const { t } = useLang();
  const [data, setData] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("abehayat-confirmed");
    if (stored) setData(JSON.parse(stored));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4">
      <div className="max-w-lg mx-auto">
        <div className="card shadow-xl text-center">
          {/* Success icon */}
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-green-700 mb-2">{t.confirmation.title}</h1>
          <p className="text-gray-600 mb-6">{t.confirmation.subtitle}</p>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">{t.confirmation.message}</p>

          {/* Registration details */}
          {data && (
            <div className="bg-blue-50 rounded-2xl p-5 text-start mb-8">
              <h3 className="font-bold text-blue-800 mb-4 text-center">{t.confirmation.details_title}</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">{t.confirmation.name_label}</span>
                  <span className="font-semibold text-gray-800">{data.first_name} {data.last_name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">{t.confirmation.phone_label}</span>
                  <span className="font-semibold text-gray-800" dir="ltr">{data.phone}</span>
                </div>
                <div className="flex justify-between items-start gap-4">
                  <span className="text-gray-500 text-sm shrink-0">{t.confirmation.address_label}</span>
                  <span className="font-semibold text-gray-800 text-sm text-end">{data.address}</span>
                </div>
              </div>
            </div>
          )}

          {/* Next steps */}
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 text-start mb-8">
            <h3 className="font-bold text-amber-800 mb-3">{t.confirmation.next_steps_title}</h3>
            <ul className="space-y-2">
              {[t.confirmation.step1, t.confirmation.step2, t.confirmation.step3].map((step, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-amber-700">
                  <span className="shrink-0 font-bold">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/" className="btn-outline flex-1 text-center text-sm py-3">
              {t.confirmation.back_home}
            </Link>
            <Link href="/register" className="btn-primary flex-1 text-center text-sm py-3">
              {t.confirmation.register_another}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
