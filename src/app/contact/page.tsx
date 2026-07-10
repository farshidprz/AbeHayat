"use client";

import { useLang } from "@/context/LanguageContext";
import { churchInfo, teamMembers } from "@/lib/teamData";

export default function ContactPage() {
  const { t, lang } = useLang();

  // Main contacts (first 3 team members)
  const contacts = teamMembers.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="section-title">{t.contact.title}</h1>
          <p className="section-subtitle">{t.contact.subtitle}</p>
          <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="card">
              <h2 className="font-bold text-blue-800 text-lg mb-6">{t.contact.info_title}</h2>
              <div className="space-y-5">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">{t.contact.phone_label}</p>
                    <a href={`tel:${churchInfo.phone}`} className="font-semibold text-gray-800 hover:text-blue-600" dir="ltr">
                      {churchInfo.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">{t.contact.email_label}</p>
                    <a href={`mailto:${churchInfo.email}`} className="font-semibold text-gray-800 hover:text-purple-600" dir="ltr">
                      {churchInfo.email}
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">{t.contact.address_label}</p>
                    <p className="font-semibold text-gray-800 text-sm">
                      {lang === "fa" ? churchInfo.addressFa : churchInfo.address}
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">{t.contact.hours_label}</p>
                    <p className="font-semibold text-gray-800 text-sm">{t.contact.hours_value}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Team contacts */}
            <div className="card">
              <h2 className="font-bold text-blue-800 text-lg mb-4">
                {lang === "fa" ? "تماس با تیم" : "Team Contacts"}
              </h2>
              <div className="space-y-4">
                {contacts.map((m) => (
                  <div key={m.id} className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${m.color} rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                      {m.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 text-sm">
                        {lang === "fa" ? m.nameFa : m.nameEn}
                      </p>
                      <p className="text-gray-400 text-xs">{lang === "fa" ? m.roleFa : m.roleEn}</p>
                    </div>
                    <div className="flex gap-2">
                      <a href={`mailto:${m.email}`} className="w-8 h-8 bg-blue-50 hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </a>
                      <a href={`tel:${m.phone}`} className="w-8 h-8 bg-green-50 hover:bg-green-100 rounded-lg flex items-center justify-center transition-colors">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Register CTA */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl p-8 text-white text-center">
              <div className="text-5xl mb-4">💧</div>
              <h3 className="text-xl font-bold mb-3">
                {lang === "fa" ? "آماده‌اید برای ریتریت آب حیات؟" : "Ready for Abe Hayaat Retreat?"}
              </h3>
              <p className="text-blue-100 text-sm mb-6">
                {lang === "fa"
                  ? "همین‌الان ثبت‌نام کنید و جای خود را رزرو کنید."
                  : "Register now and reserve your spot."}
              </p>
              <a
                href="/register"
                className="bg-white text-blue-800 font-bold px-6 py-3 rounded-xl inline-block hover:bg-blue-50 transition-colors shadow-lg"
              >
                {lang === "fa" ? "ثبت‌نام کنید" : "Register Now"}
              </a>
            </div>

            <div className="card">
              <h3 className="font-bold text-gray-800 mb-4">
                {lang === "fa" ? "سوالی دارید؟" : "Have Questions?"}
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                {lang === "fa"
                  ? "می‌توانید مستقیماً با ما تماس بگیرید یا ایمیل بزنید."
                  : "You can contact us directly by phone or email."}
              </p>
              <div className="flex gap-3">
                <a
                  href={`tel:${churchInfo.phone}`}
                  className="flex-1 bg-green-600 text-white text-center py-3 rounded-xl font-semibold text-sm hover:bg-green-700 transition-colors"
                >
                  📞 {lang === "fa" ? "تماس" : "Call"}
                </a>
                <a
                  href={`mailto:${churchInfo.email}`}
                  className="flex-1 bg-blue-600 text-white text-center py-3 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors"
                >
                  ✉️ {lang === "fa" ? "ایمیل" : "Email"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
