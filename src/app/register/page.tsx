"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/context/LanguageContext";

const COUNTRIES_FA = [
  "ایران", "آمریکا", "کانادا", "آلمان", "انگلستان", "استرالیا",
  "سوئد", "نروژ", "هلند", "ترکیه", "امارات", "فرانسه", "ایتالیا", "سایر",
];
const COUNTRIES_EN = [
  "Iran", "USA", "Canada", "Germany", "UK", "Australia",
  "Sweden", "Norway", "Netherlands", "Turkey", "UAE", "France", "Italy", "Other",
];

export default function RegisterPage() {
  const { lang } = useLang();
  const router = useRouter();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    phone: "",
    email: "",
    country: "",
    city: "",
    address: "",
    church_name: "",
    prev_retreat: "",
    special_needs: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fa = lang === "fa";

  const validate = () => {
    const e: Record<string, string> = {};
    const req = fa ? "این فیلد الزامی است" : "This field is required";
    if (!form.first_name.trim()) e.first_name = req;
    if (!form.last_name.trim()) e.last_name = req;
    if (!form.gender) e.gender = req;
    if (!form.phone.trim()) e.phone = req;
    else if (!/^[+\d\s\-()]{7,}$/.test(form.phone))
      e.phone = fa ? "شماره تلفن معتبر نیست" : "Invalid phone number";
    if (!form.country) e.country = req;
    if (!form.city.trim()) e.city = req;
    if (!form.address.trim()) e.address = req;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    sessionStorage.setItem("abehayat-reg", JSON.stringify(form));
    router.push("/rules");
  };

  const set = (field: string, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
  };

  const countries = fa ? COUNTRIES_FA : COUNTRIES_EN;

  return (
    <div
      className="min-h-screen py-12 px-4 relative"
      style={{
        backgroundImage: "url('/hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-blue-950/72" />

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Steps */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-amber-400 text-blue-950 flex items-center justify-center text-sm font-bold shadow-lg">1</div>
            <span className="text-sm font-semibold text-amber-300 hidden sm:block">
              {fa ? "اطلاعات شخصی" : "Personal Info"}
            </span>
          </div>
          <div className="w-16 h-0.5 bg-white/20" />
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-white/20 text-white/50 flex items-center justify-center text-sm font-bold">2</div>
            <span className="text-sm text-white/40 hidden sm:block">
              {fa ? "قوانین" : "Rules"}
            </span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 px-8 py-6 text-center">
            <div className="text-4xl mb-2">💧</div>
            <h1 className="text-2xl font-bold text-white">
              {fa ? "فرم ثبت‌نام ریتریت آب حیات" : "Abe Hayaat Retreat Registration"}
            </h1>
            <p className="text-blue-200 text-sm mt-1">
              {fa ? "لطفاً اطلاعات خود را با دقت وارد کنید" : "Please fill in your information carefully"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-5" noValidate>
            {/* First + Last name */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  {fa ? "نام" : "First Name"} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder={fa ? "نام کوچک" : "First name"}
                  value={form.first_name}
                  onChange={(e) => set("first_name", e.target.value)}
                  className={`input-field ${errors.first_name ? "border-red-400 ring-1 ring-red-300" : ""}`}
                />
                {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>}
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  {fa ? "نام خانوادگی" : "Last Name"} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder={fa ? "فامیلی" : "Last name"}
                  value={form.last_name}
                  onChange={(e) => set("last_name", e.target.value)}
                  className={`input-field ${errors.last_name ? "border-red-400 ring-1 ring-red-300" : ""}`}
                />
                {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>}
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                {fa ? "جنسیت" : "Gender"} <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4">
                {[{ val: "male", label: fa ? "آقا" : "Male" }, { val: "female", label: fa ? "خانم" : "Female" }].map((g) => (
                  <label
                    key={g.val}
                    className={`flex items-center gap-2 cursor-pointer flex-1 border-2 rounded-xl px-4 py-3 transition-all ${
                      form.gender === g.val ? "border-blue-600 bg-blue-50" : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <input type="radio" name="gender" value={g.val} checked={form.gender === g.val}
                      onChange={() => set("gender", g.val)} className="accent-blue-600" />
                    <span className="font-medium text-gray-700">{g.label}</span>
                  </label>
                ))}
              </div>
              {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
            </div>

            {/* Phone + Email */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  {fa ? "شماره تلفن" : "Phone"} <span className="text-red-500">*</span>
                </label>
                <input type="tel" dir="ltr"
                  placeholder={fa ? "مثال: ۰۹۱۲۱۲۳۴۵۶۷" : "+1 (555) 000-0000"}
                  value={form.phone} onChange={(e) => set("phone", e.target.value)}
                  className={`input-field ${errors.phone ? "border-red-400 ring-1 ring-red-300" : ""}`}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  {fa ? "ایمیل (اختیاری)" : "Email (Optional)"}
                </label>
                <input type="email" dir="ltr" placeholder="email@example.com"
                  value={form.email} onChange={(e) => set("email", e.target.value)} className="input-field" />
              </div>
            </div>

            {/* Country + City */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  {fa ? "کشور" : "Country"} <span className="text-red-500">*</span>
                </label>
                <select value={form.country} onChange={(e) => set("country", e.target.value)}
                  className={`input-field ${errors.country ? "border-red-400 ring-1 ring-red-300" : ""}`}>
                  <option value="">{fa ? "انتخاب کنید..." : "Select..."}</option>
                  {countries.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  {fa ? "شهر / محل سکونت" : "City"} <span className="text-red-500">*</span>
                </label>
                <input type="text" placeholder={fa ? "شهر یا محله" : "Your city"}
                  value={form.city} onChange={(e) => set("city", e.target.value)}
                  className={`input-field ${errors.city ? "border-red-400 ring-1 ring-red-300" : ""}`} />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">
                {fa ? "آدرس کامل" : "Full Address"} <span className="text-red-500">*</span>
              </label>
              <textarea rows={2} placeholder={fa ? "آدرس دقیق محل سکونت" : "Your full residential address"}
                value={form.address} onChange={(e) => set("address", e.target.value)}
                className={`input-field resize-none ${errors.address ? "border-red-400 ring-1 ring-red-300" : ""}`} />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>

            {/* Church + Prev Retreat */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  {fa ? "نام کلیسا (اختیاری)" : "Church Name (Optional)"}
                </label>
                <input type="text" placeholder={fa ? "نام کلیسای عضو" : "Your church"}
                  value={form.church_name} onChange={(e) => set("church_name", e.target.value)} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {fa ? "قبلاً در ریتریت بوده‌اید؟" : "Attended retreat before?"}
                </label>
                <div className="flex gap-3">
                  {[{ val: "yes", label: fa ? "بله" : "Yes" }, { val: "no", label: fa ? "خیر" : "No" }].map((opt) => (
                    <label key={opt.val}
                      className={`flex items-center gap-2 cursor-pointer flex-1 border-2 rounded-xl px-3 py-2.5 transition-all text-sm ${
                        form.prev_retreat === opt.val ? "border-blue-600 bg-blue-50" : "border-gray-200 hover:border-blue-300"
                      }`}>
                      <input type="radio" name="prev_retreat" value={opt.val}
                        checked={form.prev_retreat === opt.val} onChange={() => set("prev_retreat", opt.val)}
                        className="accent-blue-600" />
                      <span className="font-medium text-gray-700">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Special needs */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">
                {fa ? "نیازهای خاص / بیماری‌ها (اختیاری)" : "Special Needs / Medical Conditions (Optional)"}
              </label>
              <textarea rows={2}
                placeholder={fa ? "اگر نیاز خاصی دارید اینجا بنویسید..." : "Mention any special requirements..."}
                value={form.special_needs} onChange={(e) => set("special_needs", e.target.value)}
                className="input-field resize-none" />
            </div>

            <p className="text-gray-400 text-xs">{fa ? "* فیلدهای الزامی" : "* Required fields"}</p>

            <button type="submit"
              className="w-full bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-bold py-4 rounded-2xl text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5">
              {fa ? "بعدی — مشاهده قوانین ریتریت ←" : "Next — View Retreat Rules →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
