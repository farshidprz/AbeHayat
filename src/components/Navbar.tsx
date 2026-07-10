"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Globe, LayoutDashboard, UserPlus } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

export default function Navbar() {
  const { t, toggleLang, lang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/team", label: t.nav.team },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a1a3f]/90 backdrop-blur-xl shadow-xl shadow-black/20 border-b border-white/5"
          : "bg-[#0f2554] border-b border-white/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-9 h-9 drop-shadow-lg group-hover:scale-105 transition-transform duration-200">
              <Image src="/logo.svg" alt="آب حیات" fill className="object-contain" priority />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-white font-bold text-[15px] tracking-wide group-hover:text-amber-300 transition-colors duration-200">
                {lang === "fa" ? "آب حیات" : "Abe Hayaat"}
              </span>
              <span className="text-blue-400 text-[9px] tracking-[0.25em] uppercase font-medium">
                {lang === "fa" ? "Water of Life" : "آب حیات"}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-blue-200 hover:text-white rounded-lg hover:bg-white/8 transition-all duration-200 group"
              >
                {link.label}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 group-hover:w-1/2 h-[2px] bg-amber-400 rounded-full transition-all duration-300" />
              </Link>
            ))}
            <div className="w-px h-5 bg-white/15 mx-3" />
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-blue-300 text-sm font-medium hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <Globe className="w-3.5 h-3.5" />
              {t.common.lang_toggle}
            </button>
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-blue-300 text-sm font-medium hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>{lang === "fa" ? "ادمین" : "Admin"}</span>
            </Link>
            <Link
              href="/register"
              className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 active:scale-95 text-[#0a1635] font-semibold px-5 py-2 rounded-xl text-sm shadow-md hover:shadow-amber-400/25 transition-all duration-200 ml-1"
            >
              <UserPlus className="w-3.5 h-3.5" />
              {t.nav.register}
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-1.5">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-blue-300 text-xs font-medium hover:bg-white/10 transition-all"
            >
              <Globe className="w-3 h-3" />
              {t.common.lang_toggle}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg text-blue-200 hover:bg-white/10 transition-all"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/10 py-3 space-y-0.5 pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center px-4 py-2.5 text-blue-200 hover:bg-white/10 hover:text-white rounded-xl font-medium transition-all"
              >
                {link.label}
              </Link>
            ))}
            <div className="h-px bg-white/10 mx-4 my-1" />
            <Link
              href="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-2.5 text-blue-200 hover:bg-white/10 hover:text-white rounded-xl font-medium transition-all"
            >
              <LayoutDashboard className="w-4 h-4" />
              {lang === "fa" ? "پنل ادمین" : "Admin Panel"}
            </Link>
            <div className="px-4 pt-2">
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-[#0a1635] font-semibold px-4 py-2.5 rounded-xl text-sm transition-all"
              >
                <UserPlus className="w-4 h-4" />
                {t.nav.register}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
