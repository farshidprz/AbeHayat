"use client";

import { useLang } from "@/context/LanguageContext";
import { teamMembers } from "@/lib/teamData";

export default function TeamPage() {
  const { t, lang } = useLang();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="section-title">{t.team.title}</h1>
          <p className="section-subtitle">{t.team.subtitle}</p>
          <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full" />
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="card hover:shadow-lg transition-all duration-200 flex flex-col"
            >
              {/* Avatar */}
              <div className={`w-20 h-20 ${member.color} rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-5 shadow-md`}>
                {member.avatar}
              </div>

              {/* Info */}
              <div className="text-center flex-1">
                <h2 className="text-lg font-bold text-gray-800 mb-1">
                  {lang === "fa" ? member.nameFa : member.nameEn}
                </h2>
                <p className={`text-sm font-semibold mb-3 ${member.color.replace("bg-", "text-")}`}>
                  {lang === "fa" ? member.roleFa : member.roleEn}
                </p>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">
                  {lang === "fa" ? member.bioFa : member.bioEn}
                </p>
              </div>

              {/* Contact info */}
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors group"
                  dir="ltr"
                >
                  <span className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors shrink-0">
                    <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <span className="truncate">{member.email}</span>
                </a>
                <a
                  href={`tel:${member.phone}`}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-green-600 transition-colors group"
                  dir="ltr"
                >
                  <span className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors shrink-0">
                    <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                  <span>{member.phone}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
