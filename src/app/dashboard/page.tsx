"use client";

import { useState, useEffect, useCallback } from "react";
import { useLang } from "@/context/LanguageContext";

interface Registration {
  id: string;
  first_name: string;
  last_name: string;
  gender?: string;
  address: string;
  phone: string;
  email?: string;
  country?: string;
  city?: string;
  church_name?: string;
  prev_retreat?: string;
  special_needs?: string;
  created_at: string;
}

interface EditForm {
  first_name: string;
  last_name: string;
  gender: string;
  address: string;
  phone: string;
  email: string;
  country: string;
  city: string;
  church_name: string;
  prev_retreat: string;
  special_needs: string;
}

interface ManagedUserRecord {
  id: string;
  first_name: string;
  last_name: string;
  gender?: string | null;
  phone: string;
  email?: string | null;
  country?: string | null;
  city?: string | null;
  church_name?: string | null;
  role: "manager" | "assistant" | "member";
  notes?: string | null;
  created_at: string;
  updated_at: string;
}

interface SmallGroupRecord {
  id: string;
  name: string;
  description?: string | null;
  manager_ids: string[];
  assistant_ids: string[];
  member_ids: string[];
  created_at: string;
  updated_at: string;
}

interface UserForm {
  first_name: string;
  last_name: string;
  gender: string;
  phone: string;
  email: string;
  country: string;
  city: string;
  church_name: string;
  role: "manager" | "assistant" | "member";
  notes: string;
}

interface GroupForm {
  name: string;
  description: string;
  manager_ids: string[];
  assistant_ids: string[];
  member_ids: string[];
}

export default function DashboardPage() {
  const { lang } = useLang();
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [editTarget, setEditTarget] = useState<Registration | null>(null);
  const [editForm, setEditForm] = useState<EditForm>({
    first_name: "",
    last_name: "",
    gender: "",
    address: "",
    phone: "",
    email: "",
    country: "",
    city: "",
    church_name: "",
    prev_retreat: "",
    special_needs: "",
  });
  const [saving, setSaving] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<Registration | null>(null);
  const [deleting, setDeleting] = useState(false);

  const [activeTab, setActiveTab] = useState<"registrations" | "users" | "groups">("registrations");
  const [users, setUsers] = useState<ManagedUserRecord[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [userSearch, setUserSearch] = useState("");
  const [showUserModal, setShowUserModal] = useState(false);
  const [userEditTarget, setUserEditTarget] = useState<ManagedUserRecord | null>(null);
  const [userDeleteTarget, setUserDeleteTarget] = useState<ManagedUserRecord | null>(null);
  const [userForm, setUserForm] = useState<UserForm>({
    first_name: "",
    last_name: "",
    gender: "",
    phone: "",
    email: "",
    country: "",
    city: "",
    church_name: "",
    role: "member",
    notes: "",
  });
  const [savingUser, setSavingUser] = useState(false);

  const [groups, setGroups] = useState<SmallGroupRecord[]>([]);
  const [loadingGroups, setLoadingGroups] = useState(false);
  const [groupSearch, setGroupSearch] = useState("");
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [groupEditTarget, setGroupEditTarget] = useState<SmallGroupRecord | null>(null);
  const [groupDeleteTarget, setGroupDeleteTarget] = useState<SmallGroupRecord | null>(null);
  const [groupForm, setGroupForm] = useState<GroupForm>({
    name: "",
    description: "",
    manager_ids: [],
    assistant_ids: [],
    member_ids: [],
  });
  const [savingGroup, setSavingGroup] = useState(false);

  const adminCopy = lang === "en"
    ? {
        loginTitle: "Admin Dashboard",
        loginSubtitle: "Sign in to the admin panel",
        username: "Username",
        password: "Password",
        signin: "Login to dashboard",
        loginInProgress: "Signing in...",
        wrongCreds: "Incorrect username or password",
        title: "Abe Hayaat Admin Dashboard",
        subtitle: "Manage registrations, users, and small groups",
        totalRegistrations: "Registrations",
        exportCsv: "Export CSV",
        logout: "Logout",
        stats: {
          total: "Total registrations",
          male: "Men",
          female: "Women",
          today: "New today",
        },
        tabs: {
          registrations: "Registrations",
          users: "Users",
          groups: "Small Groups",
        },
        searchPlaceholder: "Search by name, phone, address, or email...",
        searchResults: "results from",
        noResults: "No results found",
        loading: "Loading...",
        noRegistrations: "No registrations yet",
        editRegistration: "Edit registration",
        deleteRegistration: "Delete registration",
        edit: "Edit",
        delete: "Delete",
        confirmDeleteRegistration: "Are you sure you want to delete this registration?",
        cancel: "Cancel",
        save: "Save changes",
        saving: "Saving...",
        yesDelete: "Yes, delete",
        deleting: "Deleting...",
        userManagement: "User management",
        userRole: "Role",
        manager: "Manager",
        assistant: "Assistant",
        member: "Member",
        addUser: "Add user",
        editUser: "Edit user",
        deleteUser: "Delete user",
        userList: "Managed users",
        groupManagement: "Small Group management",
        groupName: "Group name",
        groupDesc: "Description",
        managers: "Managers",
        assistants: "Assistants",
        members: "Members",
        addGroup: "Add group",
        editGroup: "Edit group",
        deleteGroup: "Delete group",
        groupNote: "A group can have up to 2 managers.",
        name: "Name",
        phone: "Phone",
        email: "Email",
        country: "Country",
        city: "City",
        church: "Church",
        notes: "Notes",
        gender: "Gender",
        male: "Male",
        female: "Female",
        noGender: "—",
        firstName: "First name",
        lastName: "Last name",
        address: "Address",
        saveUser: "Save user",
        savingUser: "Saving user...",
        saveGroup: "Save group",
        savingGroup: "Saving group...",
      }
    : {
        loginTitle: "داشبورد مدیریت",
        loginSubtitle: "ورود به پنل ادمین",
        username: "نام کاربری",
        password: "رمز عبور",
        signin: "ورود به داشبورد",
        loginInProgress: "در حال ورود...",
        wrongCreds: "نام کاربری یا رمز اشتباه است",
        title: "داشبورد ادمین — آب حیات",
        subtitle: "مدیریت ثبت‌نام‌ها، کاربران و گروه‌های کوچک",
        totalRegistrations: "ثبت‌نام",
        exportCsv: "دانلود CSV",
        logout: "خروج",
        stats: {
          total: "مجموع ثبت‌نام‌ها",
          male: "آقایان",
          female: "خانم‌ها",
          today: "ثبت‌نام امروز",
        },
        tabs: {
          registrations: "ثبت‌نام‌ها",
          users: "کاربران",
          groups: "گروه‌های کوچک",
        },
        searchPlaceholder: "جستجو بر اساس نام، تلفن، آدرس یا ایمیل...",
        searchResults: "نتیجه از",
        noResults: "نتیجه‌ای یافت نشد",
        loading: "در حال بارگذاری...",
        noRegistrations: "هنوز ثبت‌نامی وجود ندارد",
        editRegistration: "ویرایش اطلاعات",
        deleteRegistration: "حذف ثبت‌نام",
        edit: "ویرایش",
        delete: "حذف",
        confirmDeleteRegistration: "آیا مطمئن هستید که می‌خواهید این ثبت‌نام را حذف کنید؟",
        cancel: "انصراف",
        save: "ذخیره تغییرات",
        saving: "در حال ذخیره...",
        yesDelete: "بله، حذف کن",
        deleting: "در حال حذف...",
        userManagement: "مدیریت کاربران",
        userRole: "نقش",
        manager: "مدیر",
        assistant: "دستیار",
        member: "عضو",
        addUser: "افزودن کاربر",
        editUser: "ویرایش کاربر",
        deleteUser: "حذف کاربر",
        userList: "کاربران مدیریتی",
        groupManagement: "مدیریت گروه‌های کوچک",
        groupName: "نام گروه",
        groupDesc: "توضیحات",
        managers: "مدیران",
        assistants: "دستیاران",
        members: "اعضا",
        addGroup: "افزودن گروه",
        editGroup: "ویرایش گروه",
        deleteGroup: "حذف گروه",
        groupNote: "هر گروه می‌تواند حداکثر ۲ مدیر داشته باشد.",
        name: "نام",
        phone: "تلفن",
        email: "ایمیل",
        country: "کشور",
        city: "شهر",
        church: "کلیسا",
        notes: "یادداشت",
        gender: "جنسیت",
        male: "آقا",
        female: "خانم",
        noGender: "—",
        firstName: "نام",
        lastName: "نام خانوادگی",
        address: "آدرس",
        saveUser: "ذخیره کاربر",
        savingUser: "در حال ذخیره کاربر...",
        saveGroup: "ذخیره گروه",
        savingGroup: "در حال ذخیره گروه...",
      };

  useEffect(() => {
    const t = sessionStorage.getItem("admin-token");
    if (t) setToken(t);
  }, []);

  const fetchRegistrations = useCallback(async (t: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        headers: { authorization: `Bearer ${t}` },
      });
      if (res.status === 401) {
        setToken(null);
        sessionStorage.removeItem("admin-token");
        return;
      }
      const json = await res.json();
      setRegistrations(json.data || []);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUsers = useCallback(async (t: string) => {
    setLoadingUsers(true);
    try {
      const res = await fetch("/api/admin/users", {
        headers: { authorization: `Bearer ${t}` },
      });
      if (res.status === 401) {
        setToken(null);
        sessionStorage.removeItem("admin-token");
        return;
      }
      const json = await res.json();
      setUsers(json.data || []);
    } finally {
      setLoadingUsers(false);
    }
  }, []);

  const fetchGroups = useCallback(async (t: string) => {
    setLoadingGroups(true);
    try {
      const res = await fetch("/api/admin/groups", {
        headers: { authorization: `Bearer ${t}` },
      });
      if (res.status === 401) {
        setToken(null);
        sessionStorage.removeItem("admin-token");
        return;
      }
      const json = await res.json();
      setGroups(json.data || []);
    } finally {
      setLoadingGroups(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchRegistrations(token);
      fetchUsers(token);
      fetchGroups(token);
    }
  }, [token, fetchRegistrations, fetchUsers, fetchGroups]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoggingIn(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        setLoginError(adminCopy.wrongCreds);
        return;
      }
      const { token: t } = await res.json();
      sessionStorage.setItem("admin-token", t);
      setToken(t);
    } finally {
      setLoggingIn(false);
    }
  };

  const openEdit = (r: Registration) => {
    setEditTarget(r);
    setEditForm({
      first_name: r.first_name,
      last_name: r.last_name,
      gender: r.gender || "",
      address: r.address,
      phone: r.phone,
      email: r.email || "",
      country: r.country || "",
      city: r.city || "",
      church_name: r.church_name || "",
      prev_retreat: r.prev_retreat || "",
      special_needs: r.special_needs || "",
    });
  };

  const handleSave = async () => {
    if (!editTarget || !token) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/registrations/${editTarget.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
        body: JSON.stringify(editForm),
      });
      if (res.ok) {
        setRegistrations((prev) =>
          prev.map((r) => (r.id === editTarget.id ? { ...r, ...editForm } : r))
        );
        setEditTarget(null);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget || !token) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/registrations/${deleteTarget.id}`, {
        method: "DELETE",
        headers: { authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setRegistrations((prev) => prev.filter((r) => r.id !== deleteTarget.id));
        setDeleteTarget(null);
      }
    } finally {
      setDeleting(false);
    }
  };

  const openUserEditor = (record?: ManagedUserRecord) => {
    setShowUserModal(true);
    if (record) {
      setUserEditTarget(record);
      setUserForm({
        first_name: record.first_name,
        last_name: record.last_name,
        gender: record.gender || "",
        phone: record.phone,
        email: record.email || "",
        country: record.country || "",
        city: record.city || "",
        church_name: record.church_name || "",
        role: record.role,
        notes: record.notes || "",
      });
    } else {
      setUserEditTarget(null);
      setUserForm({
        first_name: "",
        last_name: "",
        gender: "",
        phone: "",
        email: "",
        country: "",
        city: "",
        church_name: "",
        role: "member",
        notes: "",
      });
    }
  };

  const closeUserEditor = () => {
    setShowUserModal(false);
    setUserEditTarget(null);
    setUserForm({
      first_name: "",
      last_name: "",
      gender: "",
      phone: "",
      email: "",
      country: "",
      city: "",
      church_name: "",
      role: "member",
      notes: "",
    });
  };

  const handleUserSave = async () => {
    if (!token) return;
    setSavingUser(true);
    try {
      const payload = userEditTarget ? { ...userForm, id: userEditTarget.id } : userForm;
      const res = await fetch("/api/admin/users", {
        method: userEditTarget ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      if (!res.ok) return;
      const json = await res.json();
      const data = json.data as ManagedUserRecord;
      if (userEditTarget) {
        setUsers((prev) => prev.map((item) => (item.id === data.id ? data : item)));
      } else {
        setUsers((prev) => [data, ...prev]);
      }
      closeUserEditor();
    } finally {
      setSavingUser(false);
    }
  };

  const handleUserDelete = async () => {
    if (!userDeleteTarget || !token) return;
    setSavingUser(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
        body: JSON.stringify({ id: userDeleteTarget.id }),
      });
      if (res.ok) {
        setUsers((prev) => prev.filter((item) => item.id !== userDeleteTarget.id));
        setUserDeleteTarget(null);
      }
    } finally {
      setSavingUser(false);
    }
  };

  const openGroupEditor = (record?: SmallGroupRecord) => {
    setShowGroupModal(true);
    if (record) {
      setGroupEditTarget(record);
      setGroupForm({
        name: record.name,
        description: record.description || "",
        manager_ids: record.manager_ids || [],
        assistant_ids: record.assistant_ids || [],
        member_ids: record.member_ids || [],
      });
    } else {
      setGroupEditTarget(null);
      setGroupForm({
        name: "",
        description: "",
        manager_ids: [],
        assistant_ids: [],
        member_ids: [],
      });
    }
  };

  const closeGroupEditor = () => {
    setShowGroupModal(false);
    setGroupEditTarget(null);
    setGroupForm({
      name: "",
      description: "",
      manager_ids: [],
      assistant_ids: [],
      member_ids: [],
    });
  };

  const handleGroupSave = async () => {
    if (!token) return;
    if (groupForm.manager_ids.length > 2) return;
    setSavingGroup(true);
    try {
      const payload = groupEditTarget ? { ...groupForm, id: groupEditTarget.id } : groupForm;
      const res = await fetch("/api/admin/groups", {
        method: groupEditTarget ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      if (!res.ok) return;
      const json = await res.json();
      const data = json.data as SmallGroupRecord;
      if (groupEditTarget) {
        setGroups((prev) => prev.map((item) => (item.id === data.id ? data : item)));
      } else {
        setGroups((prev) => [data, ...prev]);
      }
      closeGroupEditor();
    } finally {
      setSavingGroup(false);
    }
  };

  const handleGroupDelete = async () => {
    if (!groupDeleteTarget || !token) return;
    setSavingGroup(true);
    try {
      const res = await fetch("/api/admin/groups", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
        body: JSON.stringify({ id: groupDeleteTarget.id }),
      });
      if (res.ok) {
        setGroups((prev) => prev.filter((item) => item.id !== groupDeleteTarget.id));
        setGroupDeleteTarget(null);
      }
    } finally {
      setSavingGroup(false);
    }
  };

  const exportCSV = () => {
    const header = [
      "نام",
      "نام خانوادگی",
      "جنسیت",
      "تلفن",
      "ایمیل",
      "کشور",
      "شهر",
      "آدرس",
      "نام کلیسا",
      "قبلاً در ریتریت",
      "نیازهای خاص",
      "تاریخ ثبت‌نام",
    ];
    const rows = filtered.map((r) => [
      r.first_name,
      r.last_name,
      r.gender === "male" ? "آقا" : r.gender === "female" ? "خانم" : "",
      r.phone,
      r.email || "",
      r.country || "",
      r.city || "",
      r.address,
      r.church_name || "",
      r.prev_retreat === "yes" ? "بله" : r.prev_retreat === "no" ? "خیر" : "",
      r.special_needs || "",
      new Date(r.created_at).toLocaleString("fa-IR"),
    ]);
    const csv = [header, ...rows].map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "abehayat-registrations.csv";
    a.click();
  };

  const filtered = registrations.filter((r) => {
    const q = search.toLowerCase();
    return (
      r.first_name.toLowerCase().includes(q) ||
      r.last_name.toLowerCase().includes(q) ||
      r.phone.includes(q) ||
      r.address.toLowerCase().includes(q) ||
      (r.email || "").toLowerCase().includes(q) ||
      (r.country || "").toLowerCase().includes(q) ||
      (r.city || "").toLowerCase().includes(q) ||
      (r.church_name || "").toLowerCase().includes(q)
    );
  });

  const filteredUsers = users.filter((u) => {
    const q = userSearch.toLowerCase();
    return (
      `${u.first_name} ${u.last_name}`.toLowerCase().includes(q) ||
      u.phone.toLowerCase().includes(q) ||
      (u.email || "").toLowerCase().includes(q) ||
      (u.country || "").toLowerCase().includes(q) ||
      (u.city || "").toLowerCase().includes(q)
    );
  });

  const filteredGroups = groups.filter((group) => {
    const q = groupSearch.toLowerCase();
    return group.name.toLowerCase().includes(q) || (group.description || "").toLowerCase().includes(q);
  });

  const userLookup = Object.fromEntries(users.map((user) => [user.id, `${user.first_name} ${user.last_name}`]));

  const roleBadge = (role: ManagedUserRecord["role"]) => {
    if (role === "manager") return lang === "en" ? "Manager" : "مدیر";
    if (role === "assistant") return lang === "en" ? "Assistant" : "دستیار";
    return lang === "en" ? "Member" : "عضو";
  };

  const roleColor = (role: ManagedUserRecord["role"]) => {
    if (role === "manager") return "bg-amber-100 text-amber-700";
    if (role === "assistant") return "bg-blue-100 text-blue-700";
    return "bg-emerald-100 text-emerald-700";
  };

  const formatDate = (value?: string) => {
    if (!value) return "—";
    return new Date(value).toLocaleDateString(lang === "en" ? "en-US" : "fa-IR");
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-950 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-3xl">🔐</span>
            </div>
            <h1 className="text-xl font-bold text-gray-800">{adminCopy.loginTitle}</h1>
            <p className="text-gray-400 text-sm mt-1">{adminCopy.loginSubtitle}</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">{adminCopy.username}</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="input-field"
                dir="ltr"
                autoComplete="username"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">{adminCopy.password}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-field"
                dir="ltr"
                autoComplete="current-password"
              />
            </div>

            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-3 text-sm text-center">
                {loginError}
              </div>
            )}

            <button type="submit" disabled={loggingIn} className="btn-primary w-full">
              {loggingIn ? adminCopy.loginInProgress : adminCopy.signin}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-3 rounded-3xl bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-sky-200 shadow-sm">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-white/20 text-base">⚙️</span>
              Admin Panel
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-bold">{adminCopy.title}</h1>
              <p className="max-w-2xl text-slate-200/90 leading-relaxed">{adminCopy.subtitle}</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="inline-flex items-center gap-2 rounded-3xl bg-white/10 px-4 py-3 text-sm text-slate-100">
              <span className="font-semibold text-white">{registrations.length}</span>
              <span className="text-slate-200">{adminCopy.totalRegistrations}</span>
            </div>
            <button onClick={exportCSV} className="btn-primary">
              📥 {adminCopy.exportCsv}
            </button>
            <button
              onClick={() => {
                setToken(null);
                sessionStorage.removeItem("admin-token");
              }}
              className="btn-outline"
            >
              {adminCopy.logout}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          <div className="card flex items-center gap-4">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-blue-50 text-blue-700 text-2xl shadow-sm">📋</div>
            <div>
              <p className="text-3xl font-bold text-slate-900">{registrations.length}</p>
              <p className="text-sm text-slate-500 mt-1">{adminCopy.stats.total}</p>
            </div>
          </div>
          <div className="card flex items-center gap-4">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-blue-50 text-blue-700 text-2xl shadow-sm">♂️</div>
            <div>
              <p className="text-3xl font-bold text-slate-900">{registrations.filter((r) => r.gender === "male").length}</p>
              <p className="text-sm text-slate-500 mt-1">{adminCopy.stats.male}</p>
            </div>
          </div>
          <div className="card flex items-center gap-4">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-pink-50 text-pink-700 text-2xl shadow-sm">♀️</div>
            <div>
              <p className="text-3xl font-bold text-slate-900">{registrations.filter((r) => r.gender === "female").length}</p>
              <p className="text-sm text-slate-500 mt-1">{adminCopy.stats.female}</p>
            </div>
          </div>
          <div className="card flex items-center gap-4">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-700 text-2xl shadow-sm">📅</div>
            <div>
              <p className="text-3xl font-bold text-slate-900">
                {registrations.filter((r) => {
                  const d = new Date(r.created_at);
                  const today = new Date();
                  return d.toDateString() === today.toDateString();
                }).length}
              </p>
              <p className="text-sm text-slate-500 mt-1">{adminCopy.stats.today}</p>
            </div>
          </div>
        </div>

        <div className="card mb-6">
          <div className="flex flex-wrap gap-2">
            {(["registrations", "users", "groups"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`admin-pill ${activeTab === tab ? "admin-pill-active" : "admin-pill-inactive"}`}
              >
                {adminCopy.tabs[tab]}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "registrations" && (
          <div className="space-y-4">
            <div className="card">
              <div className="relative">
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder={adminCopy.searchPlaceholder}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input-field pr-10"
                />
              </div>
              {search && (
                <p className="text-sm text-gray-400 mt-2">
                  {filtered.length} {adminCopy.searchResults} {registrations.length}
                </p>
              )}
            </div>

            <div className="card overflow-hidden p-0">
              {loading ? (
                <div className="text-center py-16 text-gray-400">{adminCopy.loading}</div>
              ) : filtered.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                  <div className="text-5xl mb-4">📭</div>
                  <p>{search ? adminCopy.noResults : adminCopy.noRegistrations}</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        {["#", adminCopy.name, adminCopy.gender, adminCopy.phone, "Country / City", adminCopy.address, "Date", "Actions"].map((h) => (
                          <th key={h} className="text-right px-4 py-3 text-xs font-bold text-gray-500 uppercase">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {filtered.map((r, i) => (
                        <tr key={r.id} className="hover:bg-blue-50/50 transition-colors">
                          <td className="px-4 py-3 text-gray-400 text-sm">{i + 1}</td>
                          <td className="px-4 py-3">
                            <div className="font-semibold text-gray-800">{r.first_name} {r.last_name}</div>
                            {r.church_name && <div className="text-xs text-gray-400 mt-0.5">🏛️ {r.church_name}</div>}
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${r.gender === "male" ? "bg-blue-100 text-blue-700" : r.gender === "female" ? "bg-pink-100 text-pink-700" : "bg-gray-100 text-gray-500"}`}>
                              {r.gender === "male" ? adminCopy.male : r.gender === "female" ? adminCopy.female : adminCopy.noGender}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-600 text-sm" dir="ltr">{r.phone}</td>
                          <td className="px-4 py-3 text-gray-600 text-sm">
                            <div>{r.country || "—"}</div>
                            {r.city && <div className="text-xs text-gray-400">{r.city}</div>}
                          </td>
                          <td className="px-4 py-3 text-gray-600 text-sm max-w-[180px] truncate">{r.address}</td>
                          <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">{formatDate(r.created_at)}</td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <button onClick={() => openEdit(r)} className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors">
                                ✏️ {adminCopy.save}
                              </button>
                              <button onClick={() => setDeleteTarget(r)} className="bg-red-100 hover:bg-red-200 text-red-600 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors">
                                🗑️ {adminCopy.deleteRegistration}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className="space-y-4">
            <div className="card">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{adminCopy.userManagement}</h2>
                  <p className="text-sm text-gray-400">{adminCopy.userList}</p>
                </div>
                <button onClick={() => openUserEditor()} className="btn-primary text-sm py-2.5">
                  {adminCopy.addUser}
                </button>
              </div>
            </div>

            <div className="card">
              <input
                type="text"
                placeholder={adminCopy.searchPlaceholder}
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="input-field"
              />
              {loadingUsers ? (
                <div className="text-center py-10 text-gray-400">{adminCopy.loading}</div>
              ) : filteredUsers.length === 0 ? (
                <div className="text-center py-10 text-gray-400">{adminCopy.noResults}</div>
              ) : (
                <div className="overflow-x-auto mt-4">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        {[adminCopy.name, adminCopy.userRole, adminCopy.phone, adminCopy.email, adminCopy.city, adminCopy.country, "Actions"].map((h) => (
                          <th key={h} className="text-right px-4 py-3 text-xs font-bold text-gray-500 uppercase">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {filteredUsers.map((item) => (
                        <tr key={item.id} className="hover:bg-blue-50/50 transition-colors">
                          <td className="px-4 py-3 font-semibold text-gray-800">{item.first_name} {item.last_name}</td>
                          <td className="px-4 py-3">
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${roleColor(item.role)}`}>{roleBadge(item.role)}</span>
                          </td>
                          <td className="px-4 py-3 text-gray-600 text-sm" dir="ltr">{item.phone}</td>
                          <td className="px-4 py-3 text-gray-600 text-sm" dir="ltr">{item.email || "—"}</td>
                          <td className="px-4 py-3 text-gray-600 text-sm">{item.city || "—"}</td>
                          <td className="px-4 py-3 text-gray-600 text-sm">{item.country || "—"}</td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <button onClick={() => openUserEditor(item)} className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors">
                                ✏️ {adminCopy.editUser}
                              </button>
                              <button onClick={() => setUserDeleteTarget(item)} className="bg-red-100 hover:bg-red-200 text-red-600 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors">
                                🗑️ {adminCopy.deleteUser}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "groups" && (
          <div className="space-y-4">
            <div className="card">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{adminCopy.groupManagement}</h2>
                  <p className="text-sm text-slate-500">{adminCopy.groupNote}</p>
                </div>
                <button onClick={() => openGroupEditor()} className="btn-primary text-sm py-2.5">
                  {adminCopy.addGroup}
                </button>
              </div>
            </div>

            <div className="card">
              <input
                type="text"
                placeholder={adminCopy.searchPlaceholder}
                value={groupSearch}
                onChange={(e) => setGroupSearch(e.target.value)}
                className="input-field"
              />
              {loadingGroups ? (
                <div className="text-center py-10 text-slate-500">{adminCopy.loading}</div>
              ) : filteredGroups.length === 0 ? (
                <div className="text-center py-10 text-slate-500">{adminCopy.noResults}</div>
              ) : (
                <div className="grid gap-4 mt-4">
                  {filteredGroups.map((group) => (
                    <div key={group.id} className="border border-slate-200 rounded-[24px] p-4 bg-slate-50/80">
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">{group.name}</h3>
                          {group.description && <p className="text-sm text-slate-500 mt-1">{group.description}</p>}
                        </div>
                        <div className="flex gap-2">
                          <button type="button" onClick={() => openGroupEditor(group)} className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 transition hover:bg-blue-100">
                            ✏️ {adminCopy.editGroup}
                          </button>
                          <button type="button" onClick={() => setGroupDeleteTarget(group)} className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100">
                            🗑️ {adminCopy.deleteGroup}
                          </button>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-3 mt-4">
                        <div className="bg-white rounded-3xl p-4 shadow-sm">
                          <p className="text-xs font-semibold text-amber-700">{adminCopy.managers}</p>
                          <p className="text-sm text-slate-700 mt-2">{group.manager_ids.map((id) => userLookup[id] || id).join(", ") || "—"}</p>
                        </div>
                        <div className="bg-white rounded-3xl p-4 shadow-sm">
                          <p className="text-xs font-semibold text-blue-700">{adminCopy.assistants}</p>
                          <p className="text-sm text-slate-700 mt-2">{group.assistant_ids.map((id) => userLookup[id] || id).join(", ") || "—"}</p>
                        </div>
                        <div className="bg-white rounded-3xl p-4 shadow-sm">
                          <p className="text-xs font-semibold text-emerald-700">{adminCopy.members}</p>
                          <p className="text-sm text-slate-700 mt-2">{group.member_ids.map((id) => userLookup[id] || id).join(", ") || "—"}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {editTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-md">
            <h2 className="font-bold text-lg text-gray-800 mb-5">{adminCopy.editRegistration}</h2>
            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
              {[
                { key: "first_name", label: adminCopy.firstName },
                { key: "last_name", label: adminCopy.lastName },
                { key: "phone", label: adminCopy.phone, ltr: true },
                { key: "email", label: adminCopy.email, ltr: true },
                { key: "country", label: adminCopy.country },
                { key: "city", label: adminCopy.city },
                { key: "address", label: adminCopy.address },
                { key: "church_name", label: adminCopy.church },
                { key: "special_needs", label: adminCopy.notes },
              ].map(({ key, label, ltr }) => (
                <div key={key}>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">{label}</label>
                  <input
                    type="text"
                    value={editForm[key as keyof EditForm]}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, [key]: e.target.value }))}
                    className="input-field"
                    dir={ltr ? "ltr" : undefined}
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">{adminCopy.gender}</label>
                <select value={editForm.gender} onChange={(e) => setEditForm((prev) => ({ ...prev, gender: e.target.value }))} className="input-field">
                  <option value="">—</option>
                  <option value="male">{adminCopy.male}</option>
                  <option value="female">{adminCopy.female}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Previous retreat</label>
                <select value={editForm.prev_retreat} onChange={(e) => setEditForm((prev) => ({ ...prev, prev_retreat: e.target.value }))} className="input-field">
                  <option value="">—</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setEditTarget(null)} className="btn-outline flex-1 text-sm py-2.5">{adminCopy.cancel}</button>
              <button onClick={handleSave} disabled={saving} className="btn-primary flex-1 text-sm py-2.5">{saving ? adminCopy.saving : adminCopy.save}</button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-sm text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🗑️</span>
            </div>
            <h2 className="font-bold text-lg text-gray-800 mb-2">{adminCopy.deleteRegistration}</h2>
            <p className="text-gray-500 text-sm mb-6">
              {adminCopy.confirmDeleteRegistration} <strong>{deleteTarget.first_name} {deleteTarget.last_name}</strong>.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)} className="btn-outline flex-1 text-sm py-2.5">{adminCopy.cancel}</button>
              <button onClick={handleDelete} disabled={deleting} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors">
                {deleting ? adminCopy.deleting : adminCopy.yesDelete}
              </button>
            </div>
          </div>
        </div>
      )}

      {showUserModal || userDeleteTarget !== null ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-3 sm:px-4">
          {showUserModal && (
            <div className="bg-white rounded-3xl shadow-2xl p-4 sm:p-6 w-[95vw] max-w-[32rem] max-h-[90vh] overflow-hidden">
              <h2 className="font-bold text-lg text-gray-800 mb-5">{userEditTarget ? adminCopy.editUser : adminCopy.addUser}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pr-1">
                {[
                  { key: "first_name", label: adminCopy.firstName },
                  { key: "last_name", label: adminCopy.lastName },
                  { key: "phone", label: adminCopy.phone, ltr: true },
                  { key: "email", label: adminCopy.email, ltr: true },
                  { key: "country", label: adminCopy.country },
                  { key: "city", label: adminCopy.city },
                  { key: "church_name", label: adminCopy.church },
                ].map(({ key, label, ltr }) => (
                  <div key={key} className={key === "first_name" || key === "last_name" || key === "phone" || key === "email" ? "" : ""}>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">{label}</label>
                    <input
                      type="text"
                      value={userForm[key as keyof UserForm] as string}
                      onChange={(e) => setUserForm((prev) => ({ ...prev, [key]: e.target.value }))}
                      className="input-field"
                      dir={ltr ? "ltr" : undefined}
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">{adminCopy.gender}</label>
                  <select value={userForm.gender} onChange={(e) => setUserForm((prev) => ({ ...prev, gender: e.target.value }))} className="input-field">
                    <option value="">—</option>
                    <option value="male">{adminCopy.male}</option>
                    <option value="female">{adminCopy.female}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">{adminCopy.userRole}</label>
                  <select value={userForm.role} onChange={(e) => setUserForm((prev) => ({ ...prev, role: e.target.value as ManagedUserRecord["role"] }))} className="input-field">
                    <option value="manager">{adminCopy.manager}</option>
                    <option value="assistant">{adminCopy.assistant}</option>
                    <option value="member">{adminCopy.member}</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-600 mb-1">{adminCopy.notes}</label>
                  <textarea value={userForm.notes} onChange={(e) => setUserForm((prev) => ({ ...prev, notes: e.target.value }))} className="input-field" rows={3} />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={closeUserEditor} className="btn-outline flex-1 text-sm py-2.5">{adminCopy.cancel}</button>
                <button onClick={handleUserSave} disabled={savingUser} className="btn-primary flex-1 text-sm py-2.5">{savingUser ? adminCopy.savingUser : adminCopy.saveUser}</button>
              </div>
            </div>
          )}

          {userDeleteTarget && (
            <div className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-sm text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🗑️</span>
              </div>
              <h2 className="font-bold text-lg text-gray-800 mb-2">{adminCopy.deleteUser}</h2>
              <p className="text-gray-500 text-sm mb-6">
                {adminCopy.confirmDeleteRegistration} <strong>{userDeleteTarget.first_name} {userDeleteTarget.last_name}</strong>.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setUserDeleteTarget(null)} className="btn-outline flex-1 text-sm py-2.5">{adminCopy.cancel}</button>
                <button onClick={handleUserDelete} disabled={savingUser} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors">
                  {savingUser ? adminCopy.deleting : adminCopy.yesDelete}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : null}

      {showGroupModal || groupDeleteTarget !== null ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-3 sm:px-4">
          {showGroupModal && (
            <div className="bg-white rounded-3xl shadow-2xl p-4 sm:p-6 w-[95vw] max-w-[48rem] max-h-[90vh] overflow-hidden">
              <h2 className="font-bold text-lg text-gray-800 mb-5">{groupEditTarget ? adminCopy.editGroup : adminCopy.addGroup}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[64vh] overflow-y-auto pr-1">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-600 mb-1">{adminCopy.groupName}</label>
                  <input type="text" value={groupForm.name} onChange={(e) => setGroupForm((prev) => ({ ...prev, name: e.target.value }))} className="input-field" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-600 mb-1">{adminCopy.groupDesc}</label>
                  <textarea value={groupForm.description} onChange={(e) => setGroupForm((prev) => ({ ...prev, description: e.target.value }))} className="input-field" rows={3} />
                </div>
                {[
                  { key: "manager_ids", label: adminCopy.managers },
                  { key: "assistant_ids", label: adminCopy.assistants },
                  { key: "member_ids", label: adminCopy.members },
                ].map(({ key, label }) => (
                  <div key={key}>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">{label}</label>
                    <select
                      multiple
                      value={groupForm[key as keyof GroupForm] as string[]}
                      onChange={(e) => {
                        const selected = Array.from(e.target.selectedOptions).map((option) => option.value);
                        setGroupForm((prev) => ({ ...prev, [key]: selected }));
                      }}
                      className="input-field min-h-[180px]"
                    >
                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.first_name} {user.last_name} — {roleBadge(user.role)}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={closeGroupEditor} className="btn-outline flex-1 text-sm py-2.5">{adminCopy.cancel}</button>
                <button onClick={handleGroupSave} disabled={savingGroup} className="btn-primary flex-1 text-sm py-2.5">{savingGroup ? adminCopy.savingGroup : adminCopy.saveGroup}</button>
              </div>
            </div>
          )}

          {groupDeleteTarget && (
            <div className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-sm text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🗑️</span>
              </div>
              <h2 className="font-bold text-lg text-gray-800 mb-2">{adminCopy.deleteGroup}</h2>
              <p className="text-gray-500 text-sm mb-6">
                {adminCopy.confirmDeleteRegistration} <strong>{groupDeleteTarget.name}</strong>.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setGroupDeleteTarget(null)} className="btn-outline flex-1 text-sm py-2.5">{adminCopy.cancel}</button>
                <button onClick={handleGroupDelete} disabled={savingGroup} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors">
                  {savingGroup ? adminCopy.deleting : adminCopy.yesDelete}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
