"use client";

import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import { churchInfo } from "@/lib/teamData";

export default function Footer() {
  const { t, lang } = useLang();

  return (
    <footer className="bg-blue-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
                آب
              </div>
              <span className="font-bold text-lg">
                {lang === "fa" ? churchInfo.nameFa : churchInfo.nameEn}
              </span>
            </div>
            <p className="text-blue-200 text-sm">{t.footer.tagline}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-3 text-gold-400" style={{ color: "#f0c040" }}>
              {t.footer.quick_links}
            </h3>
            <ul className="space-y-2 text-sm text-blue-200">
              <li><Link href="/" className="hover:text-white transition-colors">{t.nav.home}</Link></li>
              <li><Link href="/register" className="hover:text-white transition-colors">{t.nav.register}</Link></li>
              <li><Link href="/team" className="hover:text-white transition-colors">{t.nav.team}</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">{t.nav.contact}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-3" style={{ color: "#f0c040" }}>
              {t.footer.connect}
            </h3>
            <ul className="space-y-2 text-sm text-blue-200">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{churchInfo.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{churchInfo.email}</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{lang === "fa" ? churchInfo.addressFa : churchInfo.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-6 text-center text-blue-300 text-sm">
          <p>
            © {new Date().getFullYear()}{" "}
            {lang === "fa" ? churchInfo.nameFa : churchInfo.nameEn}.{" "}
            {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
