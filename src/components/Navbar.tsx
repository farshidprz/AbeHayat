"use client";

import Link from "next/link";
import { useState } from "react";
import { useLang } from "@/context/LanguageContext";

export default function Navbar() {
  const { t, toggleLang, lang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/register", label: t.nav.register },
    { href: "/team", label: t.nav.team },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-bold text-sm">
              آب
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-blue-800 font-bold text-sm">
                {lang === "fa" ? "کلیسای آب حیات" : "Abe Hayaat"}
              </span>
              <span className="text-blue-500 text-xs">
                {lang === "fa" ? "Water of Life" : "آب حیات"}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-blue-700 font-medium text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={toggleLang}
              className="px-3 py-1 rounded-full border border-blue-300 text-blue-700 text-sm font-medium hover:bg-blue-50 transition-colors"
            >
              {t.common.lang_toggle}
            </button>
            <Link
              href="/register"
              className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors"
            >
              {t.nav.register}
            </Link>
          </div>

          {/* Mobile: lang toggle + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleLang}
              className="px-2 py-1 rounded-full border border-blue-300 text-blue-700 text-xs font-medium"
            >
              {t.common.lang_toggle}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-700 rounded-lg font-medium"
              >
                {link.label}
              </Link>
            ))}
            <div className="px-4 pt-2">
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="block text-center bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                {t.nav.register}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
