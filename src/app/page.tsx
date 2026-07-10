"use client";

import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import { teamMembers } from "@/lib/teamData";

export default function HomePage() {
  const { t, lang } = useLang();

  const features = [
    { icon: "🙏", title: t.home.feature1_title, desc: t.home.feature1_desc, color: "from-blue-500 to-blue-700" },
    { icon: "📖", title: t.home.feature2_title, desc: t.home.feature2_desc, color: "from-purple-500 to-purple-700" },
    { icon: "🤝", title: t.home.feature3_title, desc: t.home.feature3_desc, color: "from-amber-500 to-amber-700" },
    { icon: "💧", title: t.home.feature4_title, desc: t.home.feature4_desc, color: "from-teal-500 to-teal-700" },
  ];

  return (
    <div className="flex flex-col">

      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('/hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/85 via-blue-900/75 to-indigo-950/80" />

        {/* Decorative cross */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="text-white/5 text-[28rem] font-bold leading-none">✝</span>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-16 pb-20">
          {/* Badge */}
          <span className="inline-block border border-amber-400/50 text-amber-300 text-xs font-bold tracking-widest uppercase px-5 py-2 rounded-full mb-8 backdrop-blur-sm bg-white/5">
            ✦ {t.home.hero_badge} ✦
          </span>

          {/* Title */}
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-3 leading-tight drop-shadow-2xl">
            {lang === "fa" ? "آب حیات" : "Abe Hayaat"}
          </h1>
          <p className="text-amber-300 text-xl md:text-2xl mb-2 font-light tracking-wide">
            ✝ Water of Life — آب زنده ✝
          </p>

          {/* Scripture quote */}
          <blockquote className="italic text-blue-100/80 text-base md:text-lg max-w-2xl mx-auto mb-4 leading-relaxed">
            {lang === "fa"
              ? "«اما هر که از این آبی که من می‌دهم بنوشد، هرگز تشنه نخواهد شد.» — یوحنا ۴:۱۴"
              : '"Whoever drinks the water I give them will never thirst." — John 4:14'}
          </blockquote>

          <p className="text-blue-100 text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
            {t.home.hero_desc}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-amber-400 hover:bg-amber-300 text-blue-950 font-bold px-10 py-4 rounded-2xl text-lg shadow-2xl hover:shadow-amber-400/30 transition-all duration-200 hover:-translate-y-0.5"
            >
              💧 {t.home.register_btn}
            </Link>
            <Link
              href="#about"
              className="border-2 border-white/30 text-white font-semibold px-10 py-4 rounded-2xl text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-200"
            >
              {t.home.learn_more}
            </Link>
          </div>
        </div>

        {/* Scroll arrow */}
        <a
          href="#about"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/70 transition-colors animate-bounce"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div>
              <p className="text-amber-500 font-bold text-sm tracking-widest uppercase mb-3">
                ✦ {lang === "fa" ? "درباره ریتریت" : "About the Retreat"}
              </p>
              <h2 className="text-4xl font-bold text-blue-900 mb-6 leading-tight">
                {t.home.about_title}
              </h2>
              <div className="w-12 h-1 bg-amber-400 mb-6 rounded-full" />
              <p className="text-gray-600 leading-relaxed mb-4">{t.home.about_text1}</p>
              <p className="text-gray-600 leading-relaxed mb-8">{t.home.about_text2}</p>
              <Link href="/register" className="btn-primary inline-block">
                {t.home.register_btn} →
              </Link>
            </div>

            {/* Visual card */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-3xl p-10 text-white text-center shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 right-4 text-8xl">✝</div>
                  <div className="absolute bottom-4 left-4 text-8xl">✝</div>
                </div>
                <div className="text-7xl mb-6">💧</div>
                <p className="text-4xl font-bold text-amber-300 mb-3">
                  {lang === "fa" ? "آب حیات" : "Abe Hayaat"}
                </p>
                <p className="text-blue-200 text-lg mb-6">
                  {lang === "fa" ? "یوحنا ۴:۱۴" : "John 4:14"}
                </p>
                <div className="border-t border-white/20 pt-6">
                  <p className="italic text-blue-100 text-sm leading-relaxed">
                    {lang === "fa"
                      ? "«آب زنده‌ای که من می‌دهم در او چشمه‌ای خواهد شد جوشنده به حیات ابدی»"
                      : '"The water I give will become a spring of water welling up to eternal life"'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24 px-4 bg-gradient-to-b from-slate-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-amber-500 font-bold text-sm tracking-widest uppercase mb-3">
              ✦ {lang === "fa" ? "برنامه ریتریت" : "Retreat Program"}
            </p>
            <h2 className="text-4xl font-bold text-blue-900">{t.home.features_title}</h2>
            <div className="w-12 h-1 bg-amber-400 mx-auto mt-4 rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl bg-white p-8 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${f.color}`} />
                <div className="text-5xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-blue-900 text-lg mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM PREVIEW ── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-amber-500 font-bold text-sm tracking-widest uppercase mb-3">
              ✦ {lang === "fa" ? "خادمان" : "Servants"}
            </p>
            <h2 className="text-4xl font-bold text-blue-900">{t.home.team_preview_title}</h2>
            <div className="w-12 h-1 bg-amber-400 mx-auto mt-4 rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {teamMembers.slice(0, 3).map((member) => (
              <div
                key={member.id}
                className="card text-center group hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-20 h-20 ${member.color} rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-md group-hover:scale-105 transition-transform`}>
                  {member.avatar}
                </div>
                <h3 className="font-bold text-gray-800 mb-1">
                  {lang === "fa" ? member.nameFa : member.nameEn}
                </h3>
                <p className="text-blue-600 text-sm mb-3">
                  {lang === "fa" ? member.roleFa : member.roleEn}
                </p>
                <div className="flex justify-center gap-2">
                  <a href={`mailto:${member.email}`} className="w-8 h-8 bg-blue-50 hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors text-blue-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                  <a href={`tel:${member.phone}`} className="w-8 h-8 bg-green-50 hover:bg-green-100 rounded-lg flex items-center justify-center transition-colors text-green-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/team" className="btn-outline inline-block">
              {t.home.team_preview_btn} →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/hero.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 to-indigo-900/90" />
        <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
          <div className="text-5xl mb-6">✝</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.home.cta_title}</h2>
          <p className="text-blue-100 text-lg mb-10">{t.home.cta_desc}</p>
          <Link
            href="/register"
            className="bg-amber-400 hover:bg-amber-300 text-blue-950 font-bold px-12 py-5 rounded-2xl text-xl shadow-2xl hover:shadow-amber-400/30 transition-all inline-block hover:-translate-y-0.5"
          >
            💧 {t.home.cta_btn}
          </Link>
        </div>
      </section>
    </div>
  );
}
