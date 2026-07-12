"use client";

import { useLang } from "@/context/LanguageContext";
import { teamMembers } from "@/lib/teamData";

type TeamMember = (typeof teamMembers)[number];

export default function TeamPage() {
  const { t, lang } = useLang();

  const pastors = teamMembers.filter(m => m.type === "pastor");
  const team = teamMembers.filter(m => m.type === "team" || !m.type);

  const TeamMemberCard = ({
    member,
    isPastor = false,
  }: {
    member: TeamMember;
    isPastor?: boolean;
  }) => (
    <div className="group relative">
      <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
        {/* Image Container */}
        {member.image ? (
          <div className="relative w-full h-80 overflow-hidden bg-gray-300">
            <img
              src={member.image}
              alt={lang === "fa" ? member.nameFa : member.nameEn}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ) : (
          <div className={`w-full h-80 ${member.color} flex items-center justify-center text-white font-bold text-5xl`}>
            {member.avatar}
          </div>
        )}

        {/* Info Overlay - Appears on hover for desktop */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
          <h2 className="text-2xl font-bold mb-1">
            {lang === "fa" ? member.nameFa : member.nameEn}
          </h2>
          <p className="text-sm font-semibold mb-3 text-blue-300">
            {lang === "fa" ? member.roleFa : member.roleEn}
          </p>
          <p className="text-xs leading-relaxed mb-4 line-clamp-2">
            {lang === "fa" ? member.bioFa : member.bioEn}
          </p>
        </div>
      </div>

      {/* Info Below Card */}
      <div className="mt-4 text-center px-2">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
          {lang === "fa" ? member.nameFa : member.nameEn}
        </h3>
        <p className={`text-sm font-semibold mb-2 ${member.color.replace("bg-", "text-")}`}>
          {lang === "fa" ? member.roleFa : member.roleEn}
        </p>

        <div className="flex items-center justify-center gap-3 mt-3">
  <a
    href={`mailto:${member.email}`}
    className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-200 transform hover:scale-110"
    title={member.email}
  >
    <svg
      className="w-4 h-4 text-blue-600 hover:text-white transition-colors"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  </a>

  <a
    href={`tel:${member.phone}`}
    className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all duration-200 transform hover:scale-110"
    title={member.phone}
  >
    <svg
      className="w-4 h-4 text-green-600 hover:text-white transition-colors"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  </a>
</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Pastors Section */}
        {pastors.length > 0 && (
          <div className="mb-24">
            <div className="text-center mb-16">
              <div className="inline-block mb-4">
                <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold">
                  {lang === "fa" ? "قیادت روحانی" : "Spiritual Leadership"}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {lang === "fa" ? "رهبران ما" : "Our Pastors"}
              </h2>
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-12 h-1 bg-red-500 rounded-full" />
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-12 h-1 bg-red-500 rounded-full" />
              </div>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                {lang === "fa" ? "رهبرانی که با ایمان و تعهد کلیسای آب حیات را رهبری می‌کنند" : "Leading our church with faith and dedication"}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastors.map((member) => (
                <TeamMemberCard key={member.id} member={member} isPastor={true} />
              ))}
            </div>
          </div>
        )}

        {/* Team Section Divider */}
        {pastors.length > 0 && (
          <div className="flex items-center gap-4 my-20">
            <div className="flex-1 h-1 bg-gradient-to-r from-transparent to-blue-300" />
            <span className="text-gray-400 text-sm font-medium px-4">{lang === "fa" ? "تیم ما" : "Our Team"}</span>
            <div className="flex-1 h-1 bg-gradient-to-l from-transparent to-blue-300" />
          </div>
        )}

        {/* Team Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
              {lang === "fa" ? "تیم خدمتگزار" : "Serving Team"}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {lang === "fa" ? t.team?.title || "اعضای تیم" : t.team?.title || "Team Members"}
          </h1>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-1 bg-blue-500 rounded-full" />
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <div className="w-12 h-1 bg-blue-500 rounded-full" />
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {lang === "fa" ? t.team?.subtitle || "تیم متعهدی که با شور و اشتیاق خدمت می‌کنند" : t.team?.subtitle || "A dedicated team serving with passion and commitment"}
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>

        {/* Footer Stats */}
        <div className="mt-24 pt-16 border-t border-blue-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 bg-white rounded-xl shadow-md">
              <div className="text-3xl font-bold text-blue-600 mb-2">{team.length}</div>
              <div className="text-gray-600 text-sm">{lang === "fa" ? "اعضای تیم" : "Team Members"}</div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md">
              <div className="text-3xl font-bold text-red-600 mb-2">{pastors.length}</div>
              <div className="text-gray-600 text-sm">{lang === "fa" ? "رهبران" : "Pastors"}</div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md">
              <div className="text-3xl font-bold text-green-600 mb-2">{teamMembers.length}</div>
              <div className="text-gray-600 text-sm">{lang === "fa" ? "مجموع اعضا" : "Total Members"}</div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md">
              <div className="text-3xl font-bold text-purple-600 mb-2">∞</div>
              <div className="text-gray-600 text-sm">{lang === "fa" ? "خدمت" : "Service"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}