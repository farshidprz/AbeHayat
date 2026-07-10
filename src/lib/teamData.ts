// Team member data — update with real info
export interface TeamMember {
  id: number;
  nameEn: string;
  nameFa: string;
  roleEn: string;
  roleFa: string;
  email: string;
  phone: string;
  bioEn: string;
  bioFa: string;
  avatar: string; // initials for avatar
  color: string;  // bg color for avatar
}

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    nameEn: "Pastor David",
    nameFa: "کشیش داوید",
    roleEn: "Lead Pastor & Retreat Director",
    roleFa: "کشیش اصلی و مدیر ریتریت",
    email: "pastor@abehayat.church",
    phone: "+1 (555) 100-0001",
    bioEn: "Lead pastor with 20+ years of ministry experience. Passionate about seeing lives transformed through God's Word.",
    bioFa: "کشیش اصلی با بیش از ۲۰ سال تجربه خدمت. دلسوز برای تغییر زندگی‌ها از طریق کلام خدا.",
    avatar: "PD",
    color: "bg-blue-600",
  },
  {
    id: 2,
    nameEn: "Sarah Johnson",
    nameFa: "سارا جانسون",
    roleEn: "Worship Leader",
    roleFa: "رهبر پرستش",
    email: "worship@abehayat.church",
    phone: "+1 (555) 100-0002",
    bioEn: "Worship leader dedicated to creating an atmosphere where people can encounter God through music and prayer.",
    bioFa: "رهبر پرستش که به ایجاد فضایی اختصاص دارد که مردم بتوانند از طریق موسیقی و دعا با خدا ملاقات کنند.",
    avatar: "SJ",
    color: "bg-purple-600",
  },
  {
    id: 3,
    nameEn: "Michael Chen",
    nameFa: "مایکل چن",
    roleEn: "Retreat Coordinator",
    roleFa: "هماهنگ‌کننده ریتریت",
    email: "coordinator@abehayat.church",
    phone: "+1 (555) 100-0003",
    bioEn: "Organizes all logistics for the retreat with excellence and attention to detail.",
    bioFa: "تمام جزئیات لجستیکی ریتریت را با برتری و دقت سازماندهی می‌کند.",
    avatar: "MC",
    color: "bg-green-600",
  },
  {
    id: 4,
    nameEn: "Ruth Williams",
    nameFa: "روت ویلیامز",
    roleEn: "Prayer & Intercession",
    roleFa: "دعا و شفاعت",
    email: "prayer@abehayat.church",
    phone: "+1 (555) 100-0004",
    bioEn: "Leads the prayer team and intercession ministry for the church and retreat.",
    bioFa: "تیم دعا و خدمت شفاعت کلیسا و ریتریت را رهبری می‌کند.",
    avatar: "RW",
    color: "bg-rose-600",
  },
  {
    id: 5,
    nameEn: "James Martinez",
    nameFa: "جیمز مارتینز",
    roleEn: "Youth & Young Adults",
    roleFa: "جوانان و بزرگسالان جوان",
    email: "youth@abehayat.church",
    phone: "+1 (555) 100-0005",
    bioEn: "Passionate about reaching the next generation and helping young adults grow in their faith.",
    bioFa: "دلسوز برای رسیدن به نسل بعدی و کمک به رشد ایمان جوانان.",
    avatar: "JM",
    color: "bg-orange-600",
  },
  {
    id: 6,
    nameEn: "Grace Kim",
    nameFa: "گریس کیم",
    roleEn: "Women's Ministry",
    roleFa: "خدمت زنان",
    email: "women@abehayat.church",
    phone: "+1 (555) 100-0006",
    bioEn: "Leads the women's ministry and creates spaces for women to grow in faith and community.",
    bioFa: "خدمت زنان را رهبری می‌کند و فضاهایی برای رشد زنان در ایمان و جامعه ایجاد می‌کند.",
    avatar: "GK",
    color: "bg-teal-600",
  },
];

export const churchInfo = {
  nameEn: "Abe Hayaat Church",
  nameFa: "کلیسای آب حیات",
  address: "123 Church Street, City, State 00000",
  addressFa: "خیابان کلیسا ۱۲۳، شهر، ایالت",
  phone: "+1 (555) 000-0000",
  email: "info@abehayat.church",
  website: "www.abehayat.church",
};
