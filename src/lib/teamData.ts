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
    nameEn: "Ali",
    nameFa: "علی",
    roleEn: "Team Member",
    roleFa: "عضو تیم",
    email: "parvizianfarshid@gmail.com",
    phone: "+49 17650971",
    bioEn: "Dedicated servant of the Abe Hayaat retreat team.",
    bioFa: "خادم متعهد تیم ریتریت آب حیات.",
    avatar: "ع",
    color: "bg-blue-600",
  },
  {
    id: 2,
    nameEn: "Mehran",
    nameFa: "مهران",
    roleEn: "Team Member",
    roleFa: "عضو تیم",
    email: "parvizianfarshid@gmail.com",
    phone: "+49 17650971",
    bioEn: "Dedicated servant of the Abe Hayaat retreat team.",
    bioFa: "خادم متعهد تیم ریتریت آب حیات.",
    avatar: "م",
    color: "bg-purple-600",
  },
  {
    id: 3,
    nameEn: "Alireza",
    nameFa: "علیرضا",
    roleEn: "Team Member",
    roleFa: "عضو تیم",
    email: "parvizianfarshid@gmail.com",
    phone: "+49 17650971",
    bioEn: "Dedicated servant of the Abe Hayaat retreat team.",
    bioFa: "خادم متعهد تیم ریتریت آب حیات.",
    avatar: "ع‌ر",
    color: "bg-green-600",
  },
  {
    id: 4,
    nameEn: "Maryam",
    nameFa: "مریم",
    roleEn: "Team Member",
    roleFa: "عضو تیم",
    email: "parvizianfarshid@gmail.com",
    phone: "+49 17650971",
    bioEn: "Dedicated servant of the Abe Hayaat retreat team.",
    bioFa: "خادم متعهد تیم ریتریت آب حیات.",
    avatar: "م‌م",
    color: "bg-rose-600",
  },
  {
    id: 5,
    nameEn: "Ahmad",
    nameFa: "احمد",
    roleEn: "Team Member",
    roleFa: "عضو تیم",
    email: "parvizianfarshid@gmail.com",
    phone: "+49 17650971",
    bioEn: "Dedicated servant of the Abe Hayaat retreat team.",
    bioFa: "خادم متعهد تیم ریتریت آب حیات.",
    avatar: "احـ",
    color: "bg-orange-600",
  },
  {
    id: 6,
    nameEn: "Sara",
    nameFa: "سارا",
    roleEn: "Team Member",
    roleFa: "عضو تیم",
    email: "parvizianfarshid@gmail.com",
    phone: "+49 17650971",
    bioEn: "Dedicated servant of the Abe Hayaat retreat team.",
    bioFa: "خادم متعهد تیم ریتریت آب حیات.",
    avatar: "س",
    color: "bg-teal-600",
  },
  {
    id: 7,
    nameEn: "Matin",
    nameFa: "متین",
    roleEn: "Team Member",
    roleFa: "عضو تیم",
    email: "parvizianfarshid@gmail.com",
    phone: "+49 17650971",
    bioEn: "Dedicated servant of the Abe Hayaat retreat team.",
    bioFa: "خادم متعهد تیم ریتریت آب حیات.",
    avatar: "مت",
    color: "bg-indigo-600",
  },
  {
    id: 8,
    nameEn: "Farshid",
    nameFa: "فرشید",
    roleEn: "Team Member",
    roleFa: "عضو تیم",
    email: "parvizianfarshid@gmail.com",
    phone: "+49 17650971",
    bioEn: "Dedicated servant of the Abe Hayaat retreat team.",
    bioFa: "خادم متعهد تیم ریتریت آب حیات.",
    avatar: "ف",
    color: "bg-amber-600",
  },
];

export const churchInfo = {
  nameEn: "Abe Hayaat Church",
  nameFa: "کلیسای آب حیات",
  address: "Germany",
  addressFa: "آلمان",
  phone: "+49 17650971",
  email: "parvizianfarshid@gmail.com",
  website: "abehayat.vercel.app",
};
