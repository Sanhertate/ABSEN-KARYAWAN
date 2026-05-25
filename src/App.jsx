import React, { useEffect, useMemo, useRef, useState } from "react";
import * as LucideIcons from "lucide-react";

const FallbackIcon = (props) => <span {...props} />;
const {
  Activity = FallbackIcon,
  AlertCircle = FallbackIcon,
  AlertTriangle = FallbackIcon,
  Bell = FallbackIcon,
  Briefcase = FallbackIcon,
  Building2 = FallbackIcon,
  Calendar = FallbackIcon,
  Camera = FallbackIcon,
  Check = FallbackIcon,
  CheckCircle2 = FallbackIcon,
  ChevronLeft = FallbackIcon,
  ChevronRight = FallbackIcon,
  ClipboardCheck = FallbackIcon,
  ClipboardList = FallbackIcon,
  Clock = FallbackIcon,
  Clock3 = FallbackIcon,
  Cloud = FallbackIcon,
  CloudRain = FallbackIcon,
  CloudLightning = FallbackIcon,
  CloudSun = FallbackIcon,
  Coffee = FallbackIcon,
  Edit3 = FallbackIcon,
  Eye = FallbackIcon,
  EyeOff = FallbackIcon,
  FileCheck2 = FallbackIcon,
  FileText = FallbackIcon,
  Filter = FallbackIcon,
  Heart = FallbackIcon,
  HeartPulse = FallbackIcon,
  Home = FallbackIcon,
  Image = FallbackIcon,
  IdCard = FallbackIcon,
  Info = FallbackIcon,
  ListChecks = FallbackIcon,
  Loader2 = FallbackIcon,
  Lock = FallbackIcon,
  LockKeyhole = FallbackIcon,
  LogIn = FallbackIcon,
  LogOut = FallbackIcon,
  MapPin = FallbackIcon,
  MessageCircle = FallbackIcon,
  MessageSquare = FallbackIcon,
  Moon = FallbackIcon,
  MoreHorizontal = FallbackIcon,
  Navigation = FallbackIcon,
  House = FallbackIcon,
  Phone = FallbackIcon,
  PhoneCall = FallbackIcon,
  Plus = FallbackIcon,
  RefreshCcw = FallbackIcon,
  RefreshCw = FallbackIcon,
  Search = FallbackIcon,
  Send = FallbackIcon,
  Settings = FallbackIcon,
  ShieldCheck = FallbackIcon,
  SwitchCamera = FallbackIcon,
  Sparkles = FallbackIcon,
  Sun = FallbackIcon,
  Trash2 = FallbackIcon,
  Upload = FallbackIcon,
  User = FallbackIcon,
  UserCircle = FallbackIcon,
  UserCircle2 = FallbackIcon,
  Award = FallbackIcon,
  BadgeCheck = FallbackIcon,
  BarChart3 = FallbackIcon,
  BookOpen = FallbackIcon,
  CalendarCheck = FallbackIcon,
  CalendarClock = FallbackIcon,
  CalendarDays = FallbackIcon,
  CircleCheck = FallbackIcon,
  CircleX = FallbackIcon,
  CloudOff = FallbackIcon,
  CloudUpload = FallbackIcon,
  Download = FallbackIcon,
  Fingerprint = FallbackIcon,
  Flag = FallbackIcon,
  GraduationCap = FallbackIcon,
  HelpCircle = FallbackIcon,
  Hospital = FallbackIcon,
  KeyRound = FallbackIcon,
  Landmark = FallbackIcon,
  LocateFixed = FallbackIcon,
  Mail = FallbackIcon,
  MapPinned = FallbackIcon,
  Menu = FallbackIcon,
  Minus = FallbackIcon,
  Palette = FallbackIcon,
  Pencil = FallbackIcon,
  QrCode = FallbackIcon,
  Save = FallbackIcon,
  Smartphone = FallbackIcon,
  Star = FallbackIcon,
  Stethoscope = FallbackIcon,
  Timer = FallbackIcon,
  Truck = FallbackIcon,
  Umbrella = FallbackIcon,
  UserCheck = FallbackIcon,
  UserCog = FallbackIcon,
  UserPlus = FallbackIcon,
  WalletCards = FallbackIcon,
  Users = FallbackIcon,
  Wifi = FallbackIcon,
  WifiOff = FallbackIcon,
  X = FallbackIcon,
  XCircle = FallbackIcon,
} = LucideIcons;

const FIREBASE_CONFIG = {
  // GANTI dengan URL Realtime Database milik kamu.
  // Contoh Asia Tenggara: https://nama-project-default-rtdb.asia-southeast1.firebasedatabase.app
  // Contoh default lama: https://nama-project-default-rtdb.firebaseio.com
  databaseURL: "https://database-karsa-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Semua data aplikasi akan dibaca/ditulis di root ini:
// karsa_absensi/karyawan, karsa_absensi/absensi, karsa_absensi/cuti, dst.
const FIREBASE_DB_ROOT = "karsa_absensi";
const FIREBASE_TIMEOUT_MS = 12000;

const COMPANY_NAME = "PT. Karsa Sentana Lumbung Sentosa";
// Logo lokal dari folder public. Simpan file di: public/logo-pt-karsa.png
// Vite akan menyalin file public ke hasil build, jadi aman untuk Web dan Android/Capacitor.
// Jangan pakai URL luar untuk canvas, supaya foto bukti tidak gagal saat canvas.toDataURL().
const COMPANY_LOGO_URL = "/logo-pt-karsa.png";
const COMPANY_LOGO_CANDIDATES = [
  "/logo-pt-karsa.png",
  "./logo-pt-karsa.png",
  "/assets/logo-pt-karsa.png",
  "./assets/logo-pt-karsa.png",
];

const APP_VERSION = "1.1.0-GENZ";
const APP_PLATFORM = "android";

const LOCATION_MAX_ACCURACY_METERS = 150;
const CLOCK_DRIFT_LIMIT_MS = 5 * 60 * 1000;
const GPS_TIMEOUT_MS = 16000;
const CUTI_ANNUAL_REQUEST_LIMIT = 12;
const MATERNITY_LEAVE_MONTHS = 3;
const LEAVE_POLICY_VERSION = "CUTI_12X_PER_TAHUN_V1";
const MATERNITY_LEAVE_POLICY_VERSION = "CUTI_MELAHIRKAN_3_BULAN_V1";

const MONTH_NAMES = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const DAY_NAMES = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

const NATIONAL_HOLIDAYS_2026 = [
  { date: "2026-01-01", name: "Tahun Baru Masehi", type: "Libur Nasional" },
  { date: "2026-01-16", name: "Isra Mikraj Nabi Muhammad SAW", type: "Libur Nasional" },
  { date: "2026-02-17", name: "Tahun Baru Imlek", type: "Libur Nasional" },
  { date: "2026-03-19", name: "Hari Suci Nyepi", type: "Libur Nasional" },
  { date: "2026-03-21", name: "Idulfitri", type: "Libur Nasional" },
  { date: "2026-03-22", name: "Idulfitri", type: "Libur Nasional" },
  { date: "2026-04-03", name: "Wafat Isa Almasih", type: "Libur Nasional" },
  { date: "2026-04-05", name: "Paskah", type: "Libur Nasional" },
  { date: "2026-05-01", name: "Hari Buruh Internasional", type: "Libur Nasional" },
  { date: "2026-05-14", name: "Kenaikan Isa Almasih", type: "Libur Nasional" },
  { date: "2026-05-27", name: "Iduladha", type: "Libur Nasional" },
  { date: "2026-05-31", name: "Hari Raya Waisak", type: "Libur Nasional" },
  { date: "2026-06-01", name: "Hari Lahir Pancasila", type: "Libur Nasional" },
  { date: "2026-06-16", name: "Tahun Baru Islam", type: "Libur Nasional" },
  { date: "2026-08-17", name: "Hari Kemerdekaan Republik Indonesia", type: "Libur Nasional" },
  { date: "2026-08-25", name: "Maulid Nabi Muhammad SAW", type: "Libur Nasional" },
  { date: "2026-12-25", name: "Hari Raya Natal", type: "Libur Nasional" },
];

const ROLE_ACTIONS = {
  Umum: ["Absen Masuk", "Mulai Istirahat", "Selesai Istirahat", "Absen Pulang", "Absen Libur"],
  Kebersihan: ["Absen Masuk", "Absen Pulang", "Absen Libur"],
  Kesehatan: [
    "Masuk Shift Pagi",
    "Pulang Shift Pagi",
    "Masuk Shift Siang",
    "Pulang Shift Siang",
    "Masuk Shift Malam",
    "Pulang Shift Malam",
    "Absen Libur",
  ],
  Sekuriti: ["Masuk Shift Pagi", "Pulang Shift Pagi", "Masuk Shift Malam", "Pulang Shift Malam", "Patroli Area", "Absen Libur"],
  Operasional: ["Absen Masuk", "Mulai Bertugas", "Tiba di Lokasi", "Selesai Bertugas", "Absen Pulang", "Absen Libur"],
};

const ACTION_STYLE = {
  "Absen Masuk": { icon: LogIn, tone: "bg-emerald-50 text-emerald-700 border-emerald-100" },
  "Mulai Istirahat": { icon: Coffee, tone: "bg-amber-50 text-amber-700 border-amber-100" },
  "Selesai Istirahat": { icon: Briefcase, tone: "bg-blue-50 text-blue-700 border-blue-100" },
  "Absen Pulang": { icon: LogOut, tone: "bg-rose-50 text-rose-700 border-rose-100" },
  "Masuk Shift Pagi": { icon: Sun, tone: "bg-yellow-50 text-yellow-700 border-yellow-100" },
  "Pulang Shift Pagi": { icon: LogOut, tone: "bg-rose-50 text-rose-700 border-rose-100" },
  "Masuk Shift Siang": { icon: Sun, tone: "bg-orange-50 text-orange-700 border-orange-100" },
  "Pulang Shift Siang": { icon: LogOut, tone: "bg-rose-50 text-rose-700 border-rose-100" },
  "Masuk Shift Malam": { icon: Moon, tone: "bg-slate-100 text-slate-700 border-slate-200" },
  "Pulang Shift Malam": { icon: LogOut, tone: "bg-rose-50 text-rose-700 border-rose-100" },
  "Patroli Area": { icon: MapPin, tone: "bg-indigo-50 text-indigo-700 border-indigo-100" },
  "Mulai Bertugas": { icon: Briefcase, tone: "bg-cyan-50 text-cyan-700 border-cyan-100" },
  "Tiba di Lokasi": { icon: MapPin, tone: "bg-indigo-50 text-indigo-700 border-indigo-100" },
  "Selesai Bertugas": { icon: CheckCircle2, tone: "bg-emerald-50 text-emerald-700 border-emerald-100" },
  "Absen Libur": { icon: Coffee, tone: "bg-slate-100 text-slate-700 border-slate-200" },
};

const ROLE_THEME = {
  Umum: {
    badge: "bg-blue-50 text-blue-700 border-blue-100",
    gradient: "from-blue-500 via-indigo-600 to-slate-900",
    soft: "bg-blue-50 text-blue-700 ring-blue-100",
    accent: "text-blue-700",
    bar: "bg-blue-500",
    glow: "shadow-blue-200",
  },
  Kebersihan: {
    badge: "bg-emerald-50 text-emerald-700 border-emerald-100",
    gradient: "from-emerald-400 via-green-600 to-teal-800",
    soft: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    accent: "text-emerald-700",
    bar: "bg-emerald-500",
    glow: "shadow-emerald-200",
  },
  Kesehatan: {
    badge: "bg-sky-50 text-sky-700 border-sky-100",
    gradient: "from-sky-400 via-blue-600 to-cyan-800",
    soft: "bg-sky-50 text-sky-700 ring-sky-100",
    accent: "text-sky-700",
    bar: "bg-sky-500",
    glow: "shadow-sky-200",
  },
  Sekuriti: {
    badge: "bg-amber-50 text-amber-700 border-amber-100",
    gradient: "from-amber-400 via-orange-600 to-slate-900",
    soft: "bg-amber-50 text-amber-700 ring-amber-100",
    accent: "text-amber-700",
    bar: "bg-amber-500",
    glow: "shadow-amber-200",
  },
  Operasional: {
    badge: "bg-indigo-50 text-indigo-700 border-indigo-100",
    gradient: "from-indigo-400 via-violet-600 to-slate-900",
    soft: "bg-indigo-50 text-indigo-700 ring-indigo-100",
    accent: "text-indigo-700",
    bar: "bg-indigo-500",
    glow: "shadow-indigo-200",
  },
};

function getRoleTheme(role) {
  return ROLE_THEME[role] || ROLE_THEME.Umum;
}

const ROLE_ICON = {
  Umum: Activity,
  Kebersihan: Sparkles,
  Kesehatan: FileCheck2,
  Sekuriti: ShieldCheck,
  Operasional: Briefcase,
};

function getRoleIcon(role) {
  return ROLE_ICON[role] || Activity;
}

const LEAVE_OPTIONS = [
  "Izin (Keperluan Pribadi)",
  "Sakit (Wajib Surat Dokter)",
  "Cuti Tahunan",
  "Cuti Melahirkan / Lahiran",
  "Cuti Ayah / Pendamping Persalinan",
  "Izin Telat / Pulang Cepat",
  "Cuti Alasan Penting",
  "Cuti Bersama",
  "Cuti Duka (Kematian)",
  "Absen Libur",
  "Lainnya",
];

const LEAVE_QUICK_OPTIONS = [
  "Cuti Tahunan",
  "Izin (Keperluan Pribadi)",
  "Sakit (Wajib Surat Dokter)",
  "Cuti Melahirkan / Lahiran",
  "Cuti Duka (Kematian)",
  "Izin Telat / Pulang Cepat",
  "Lainnya",
];

const LEAVE_TYPE_INFO = {
  "Cuti Tahunan": {
    shortLabel: "Tahunan",
    helper: "Mengurangi kuota cuti",
    selectedText: "Cuti tahunan dipilih",
  },
  "Izin (Keperluan Pribadi)": {
    shortLabel: "Izin",
    helper: "Keperluan pribadi",
    selectedText: "Izin pribadi dipilih",
  },
  "Sakit (Wajib Surat Dokter)": {
    shortLabel: "Sakit",
    helper: "Lampirkan bukti bila ada",
    selectedText: "Pengajuan sakit dipilih",
  },
  "Cuti Melahirkan / Lahiran": {
    shortLabel: "Melahirkan",
    helper: "Khusus cuti lahiran",
    selectedText: "Cuti melahirkan dipilih",
  },
  "Cuti Duka (Kematian)": {
    shortLabel: "Duka",
    helper: "Keluarga/kerabat meninggal",
    selectedText: "Cuti duka dipilih",
  },
  "Izin Telat / Pulang Cepat": {
    shortLabel: "Telat / Cepat",
    helper: "Datang telat atau pulang cepat",
    selectedText: "Izin telat/pulang cepat dipilih",
  },
  "Lainnya": {
    shortLabel: "Lainnya",
    helper: "Keperluan khusus",
    selectedText: "Pengajuan lainnya dipilih",
  },
};

function getLeaveTypeInfo(type = "") {
  return LEAVE_TYPE_INFO[type] || { shortLabel: type || "Pengajuan", helper: "Pengajuan", selectedText: `${type || "Pengajuan"} dipilih` };
}

function getLeaveIcon(type = "") {
  const lower = normalizeText(type);
  if (lower.includes("sakit")) return Stethoscope;
  if (lower.includes("duka") || lower.includes("kematian") || lower.includes("meninggal")) return Heart;
  if (lower.includes("melahirkan") || lower.includes("lahiran") || lower.includes("persalinan")) return HeartPulse;
  if (lower.includes("cuti")) return CalendarDays;
  if (lower.includes("telat") || lower.includes("pulang cepat")) return Clock3;
  if (lower.includes("izin")) return FileText;
  return ClipboardList;
}

const LEAVE_VISUAL_THEME = {
  blue: {
    text: "text-blue-700",
    border: "border-blue-300",
    ring: "ring-blue-100",
    soft: "bg-blue-50 text-blue-800 ring-blue-100",
    panel: "bg-blue-50 ring-blue-100",
    panelText: "text-blue-800",
    button: "bg-blue-600 text-white ring-blue-600 shadow-blue-100",
    buttonSoft: "bg-white text-blue-700 ring-blue-100",
    submit: "bg-blue-600 shadow-blue-100 hover:bg-blue-700",
  },
  emerald: {
    text: "text-emerald-700",
    border: "border-emerald-300",
    ring: "ring-emerald-100",
    soft: "bg-emerald-50 text-emerald-800 ring-emerald-100",
    panel: "bg-emerald-50 ring-emerald-100",
    panelText: "text-emerald-800",
    button: "bg-emerald-600 text-white ring-emerald-600 shadow-emerald-100",
    buttonSoft: "bg-white text-emerald-700 ring-emerald-100",
    submit: "bg-emerald-600 shadow-emerald-100 hover:bg-emerald-700",
  },
  red: {
    text: "text-red-700",
    border: "border-red-300",
    ring: "ring-red-100",
    soft: "bg-red-50 text-red-800 ring-red-100",
    panel: "bg-red-50 ring-red-100",
    panelText: "text-red-800",
    button: "bg-red-600 text-white ring-red-600 shadow-red-100",
    buttonSoft: "bg-white text-red-700 ring-red-100",
    submit: "bg-red-600 shadow-red-100 hover:bg-red-700",
  },
  violet: {
    text: "text-violet-700",
    border: "border-violet-300",
    ring: "ring-violet-100",
    soft: "bg-violet-50 text-violet-800 ring-violet-100",
    panel: "bg-violet-50 ring-violet-100",
    panelText: "text-violet-800",
    button: "bg-violet-600 text-white ring-violet-600 shadow-violet-100",
    buttonSoft: "bg-white text-violet-700 ring-violet-100",
    submit: "bg-violet-600 shadow-violet-100 hover:bg-violet-700",
  },
  amber: {
    text: "text-amber-700",
    border: "border-amber-300",
    ring: "ring-amber-100",
    soft: "bg-amber-50 text-amber-800 ring-amber-100",
    panel: "bg-amber-50 ring-amber-100",
    panelText: "text-amber-800",
    button: "bg-amber-500 text-white ring-amber-500 shadow-amber-100",
    buttonSoft: "bg-white text-amber-700 ring-amber-100",
    submit: "bg-amber-500 shadow-amber-100 hover:bg-amber-600",
  },
  slate: {
    text: "text-slate-700",
    border: "border-slate-300",
    ring: "ring-slate-200",
    soft: "bg-slate-100 text-slate-800 ring-slate-200",
    panel: "bg-slate-100 ring-slate-200",
    panelText: "text-slate-800",
    button: "bg-slate-700 text-white ring-slate-700 shadow-slate-100",
    buttonSoft: "bg-white text-slate-700 ring-slate-200",
    submit: "bg-slate-800 shadow-slate-100 hover:bg-slate-900",
  },
};

function getLeaveVisualTheme(type = "") {
  const tone = getIconTone(type);
  return LEAVE_VISUAL_THEME[tone] || LEAVE_VISUAL_THEME.blue;
}

const REPORT_CATEGORY_BY_ROLE = {
  Umum: [
    "Laporan Harian",
    "Administrasi / Pelayanan Umum",
    "Kendala Lapangan",
    "Dokumentasi Pekerjaan",
    "Permintaan Bantuan Admin",
    "Lainnya",
  ],
  Kebersihan: [
    "Pembersihan Area",
    "Toilet / Kamar Mandi",
    "Pengangkutan Sampah",
    "Peralatan Kebersihan",
    "Kendala Kebersihan",
    "Dokumentasi Pekerjaan",
    "Lainnya",
  ],
  Kesehatan: [
    "Pelayanan Kesehatan",
    "Pendampingan Pasien",
    "Kejadian Medis",
    "Stok Obat / Alkes",
    "Kebersihan Ruang Medis",
    "Dokumentasi Pekerjaan",
    "Lainnya",
  ],
  Sekuriti: [
    "Patroli Area",
    "Temuan Keamanan",
    "Tamu / Kendaraan",
    "Kunci / Akses Gedung",
    "Kejadian Darurat",
    "Dokumentasi Keamanan",
    "Lainnya",
  ],
  Operasional: [
    "Perjalanan / Antar Jemput",
    "Pengiriman Barang / Dokumen",
    "Kondisi Kendaraan",
    "BBM / Kilometer",
    "Kendala Perjalanan",
    "Dokumentasi Operasional",
    "Lainnya",
  ],
};

function getReportCategoryOptions(currentUser) {
  const role = detectRole(currentUser);
  return REPORT_CATEGORY_BY_ROLE[role] || REPORT_CATEGORY_BY_ROLE.Umum;
}

const STORAGE_KEYS = {
  db: "karsa_absensi_db_cache_v2",
  user: "karsa_absensi_current_user_v2",
  lastSync: "karsa_absensi_last_sync_v2",
  readMessages: "karsa_absensi_read_messages_v2",
  readNotifications: "karsa_absensi_read_notifications_v2",
  dismissedUpdateVersion: "karsa_absensi_dismissed_update_version_v2",
  pendingQueue: "karsa_absensi_pending_queue_v2",
  syncLog: "karsa_absensi_sync_log_v2",
};

const API_GET_TIMEOUT_MS = 6500;
const API_POST_TIMEOUT_MS = 30000;
const BACKGROUND_SYNC_DELAY_MS = 350;
const BACKGROUND_SYNC_SECOND_PASS_MS = 2500;
const APP_AUTO_SYNC_MS = 10000;
const MAX_UPLOAD_IMAGE_SIZE = 1280;
const UPLOAD_IMAGE_QUALITY = 0.72;
const TOAST_SUCCESS_AUTO_CLOSE_MS = 3000;
const TOAST_ERROR_AUTO_CLOSE_MS = 6500;
const UPDATE_CHECK_INTERVAL_MS = 5 * 60 * 1000;
const UPDATE_CHECK_TIMEOUT_MS = 6500;
const WEATHER_REFRESH_MS = 10 * 60 * 1000;
const WEATHER_TIMEOUT_MS = 8000;
const OFFLINE_QUEUE_MAX = 120;
const OFFLINE_RETRY_LIMIT = 8;
const PROFILE_LOCAL_PROTECT_MS = 15 * 60 * 1000;

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function safeArray(value) {
  return Array.isArray(value) ? value.filter(Boolean) : [];
}

function getVal(obj, key) {
  if (!obj) return undefined;
  const found = Object.keys(obj).find((k) => String(k).toLowerCase() === String(key).toLowerCase());
  return found ? obj[found] : undefined;
}

function normalizeImageSource(value) {
  const raw = String(value || "").trim();
  if (!raw || raw === "-" || raw.toLowerCase() === "null" || raw.toLowerCase() === "undefined") return "";

  // Data foto profil dari Firebase sering tersimpan sebagai object ketika payload lama salah merge.
  // Kalau begitu, ambil field foto yang paling mungkin, bukan merender "[object Object]".
  if (value && typeof value === "object") {
    return normalizeImageSource(
      value.photoUrl ||
      value.fotoUrl ||
      value.fotoProfil ||
      value.profilePhoto ||
      value.profileImageUrl ||
      value.photo ||
      value.foto ||
      value.photoBase64 ||
      value.fotoBase64 ||
      value.imageBase64 ||
      ""
    );
  }

  if (raw.toLowerCase().startsWith("data:image/")) return raw;

  const compact = raw.split("").filter((ch) => ch.charCodeAt(0) > 32).join("");
  const base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  const looksBase64 = compact.length > 180 && !compact.toLowerCase().startsWith("http") && [...compact].every((ch) => base64Chars.includes(ch));
  if (looksBase64) return `data:image/jpeg;base64,${compact}`;

  let driveId = "";
  if (raw.includes("drive.google.com/file/d/")) driveId = raw.split("drive.google.com/file/d/")[1]?.split("/")[0] || "";
  if (!driveId && raw.includes("id=")) {
    try {
      driveId = new URL(raw).searchParams.get("id") || "";
    } catch {
      driveId = raw.split("id=")[1]?.split("&")[0] || "";
    }
  }
  if (driveId) return `https://drive.google.com/thumbnail?id=${driveId}&sz=w1000`;

  return raw;
}

function getProfilePhoto(user) {
  const raw =
    getVal(user, "photoUrl") ||
    getVal(user, "fotoUrl") ||
    getVal(user, "fotoProfil") ||
    getVal(user, "profilePhoto") ||
    getVal(user, "profileImageUrl") ||
    getVal(user, "photo") ||
    getVal(user, "foto") ||
    getVal(user, "photoBase64") ||
    getVal(user, "fotoBase64") ||
    getVal(user, "imageBase64") ||
    "";
  return normalizeImageSource(raw);
}

function getProfileUpdatedMs(user = {}) {
  const raw =
    getVal(user, "profileUpdatedAt") ||
    getVal(user, "photoUpdatedAt") ||
    getVal(user, "updatedAt") ||
    getVal(user, "lastUpdated") ||
    getVal(user, "modifiedAt") ||
    "";
  const ms = Date.parse(raw);
  return Number.isFinite(ms) ? ms : 0;
}

function mergeUserProfileData(localUser, freshUser) {
  if (!localUser) return freshUser;
  if (!freshUser) return localUser;

  const localMs = getProfileUpdatedMs(localUser);
  const freshMs = getProfileUpdatedMs(freshUser);
  const localEditIsRecent = localMs > 0 && Date.now() - localMs < PROFILE_LOCAL_PROTECT_MS;
  const localEditIsNewer = localMs > 0 && (!freshMs || localMs > freshMs);
  const protectLocalProfile = localEditIsRecent || localEditIsNewer;

  const merged = { ...localUser, ...freshUser };
  const profileKeys = [
    "photo",
    "photoUrl",
    "foto",
    "fotoUrl",
    "fotoProfil",
    "profilePhoto",
    "profileImageUrl",
    "photoBase64",
    "fotoBase64",
    "imageBase64",
    "email",
    "phone",
    "noHp",
    "whatsapp",
    "emergencyContact",
    "addressKtp",
    "alamatKtp",
    "alamat_ktp",
    "alamatSesuaiKtp",
    "addressDetail",
    "alamatDomisili",
    "domisili",
    "alamatRumah",
    "address",
    "profileUpdatedAt",
    "photoUpdatedAt",
    "updatedAt",
  ];

  profileKeys.forEach((key) => {
    const freshValue = getVal(freshUser, key);
    const localValue = getVal(localUser, key);
    const freshEmpty = freshValue === undefined || freshValue === null || String(freshValue).trim() === "";

    if (protectLocalProfile && localValue !== undefined && localValue !== null && String(localValue).trim() !== "") {
      merged[key] = localValue;
      return;
    }

    if (freshEmpty && localValue) merged[key] = localValue;
  });

  return merged;
}

function normalizeText(value) {
  return String(value ?? "").trim().toLowerCase();
}

function nowParts(date = new Date()) {
  const time = date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const dateOnly = `${date.getDate()} ${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
  const fullDate = `${DAY_NAMES[date.getDay()]}, ${dateOnly}`;
  return { time, dateOnly, fullDate, timestamp: date.getTime() };
}

function formatDateIndo(value) {
  if (!value) return "-";
  const text = String(value).replace(/^'/, "").trim();
  if (!text) return "-";
  if (/^\d{4}-\d{2}-\d{2}/.test(text)) {
    const [y, m, d] = text.slice(0, 10).split("-").map(Number);
    return `${d} ${MONTH_NAMES[m - 1]} ${y}`;
  }
  return text;
}

function parseDateToMillis(value) {
  if (!value) return 0;
  const text = String(value).replace(/^'/, "").trim();
  const iso = text.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (iso) return new Date(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3])).getTime();
  const indo = text.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
  if (indo) {
    const month = MONTH_NAMES.findIndex((m) => m.toLowerCase() === indo[2].toLowerCase());
    if (month >= 0) return new Date(Number(indo[3]), month, Number(indo[1])).getTime();
  }
  const parsed = new Date(text).getTime();
  return Number.isFinite(parsed) ? parsed : 0;
}

function detectRole(user) {
  const raw = `${getVal(user, "role") || ""} ${getVal(user, "pekerjaan") || ""}`.toLowerCase();
  if (raw.includes("sekur") || raw.includes("security") || raw.includes("keamanan")) return "Sekuriti";
  if (raw.includes("bersih") || raw.includes("cleaning")) return "Kebersihan";
  if (raw.includes("kesehatan") || raw.includes("medis") || raw.includes("perawat") || raw.includes("bidan")) return "Kesehatan";
  if (
    raw.includes("driver") ||
    raw.includes("driving") ||
    raw.includes("supir") ||
    raw.includes("sopir") ||
    raw.includes("pengemudi") ||
    raw.includes("operasional") ||
    raw.includes("transport") ||
    raw.includes("angkutan")
  ) return "Operasional";
  return "Umum";
}

function calculateLate(time, role, action) {
  const cleanTime = String(time || "").match(/(\d{1,2})[.:](\d{2})/);
  if (!cleanTime) return false;

  const actual = Number(cleanTime[1]) * 60 + Number(cleanTime[2]);
  const act = normalizeText(action);
  let target = "08:00";

  if (role === "Kebersihan") target = "06:00";
  if (role === "Sekuriti") target = act.includes("malam") ? "19:00" : "07:00";
  if (role === "Kesehatan") target = act.includes("malam") ? "21:00" : act.includes("siang") ? "14:00" : "07:00";
  if (role === "Operasional") target = "08:00";

  const [h, m] = target.split(":").map(Number);
  return actual > h * 60 + m;
}

function getServerDate(serverTimeOffsetMs = 0) {
  return new Date(Date.now() + Number(serverTimeOffsetMs || 0));
}

function getClockIntegrity(serverTimeOffsetMs = 0) {
  const drift = Math.abs(Number(serverTimeOffsetMs || 0));
  return {
    ok: drift <= CLOCK_DRIFT_LIMIT_MS,
    driftMs: Math.round(drift),
    driftMinutes: Math.round(drift / 60000),
    status: drift <= CLOCK_DRIFT_LIMIT_MS ? "VALID" : "SUSPECTED_TIME_MANIPULATION",
  };
}

function getLocationIntegrity(coords) {
  // Lokasi/geofence TIDAK BOLEH memblokir absensi.
  // Khusus Driving/Operasional bisa absen di luar titik lokasi; status lokasi hanya jadi catatan database/admin.
  if (!coords) {
    return {
      ok: true,
      status: "NO_GPS_RECORDED",
      message: "GPS belum tersedia, absensi tetap diizinkan",
      keteranganLokasi: "GPS belum tersedia / kemungkinan jauh dari titik lokasi",
      warning: true,
    };
  }
  const accuracy = Number(coords.accuracy || 999999);
  if (accuracy > LOCATION_MAX_ACCURACY_METERS) {
    return {
      ok: true,
      status: "LOW_ACCURACY_LOCATION_ALLOWED",
      message: `Akurasi GPS lemah ±${Math.round(accuracy)}m, absensi tetap diizinkan`,
      keteranganLokasi: `Jauh dari titik lokasi / Akurasi GPS lemah ±${Math.round(accuracy)}m`,
      warning: true,
    };
  }
  return {
    ok: true,
    status: "VALID",
    message: `GPS valid ±${Math.round(accuracy)}m`,
    keteranganLokasi: `GPS valid ±${Math.round(accuracy)}m`,
    warning: false,
  };
}

function parseInputDate(value) {
  if (!value) return null;
  const text = String(value).trim();
  if (text.length !== 10 || text.charAt(4) !== "-" || text.charAt(7) !== "-") return null;
  const year = Number(text.slice(0, 4));
  const month = Number(text.slice(5, 7));
  const day = Number(text.slice(8, 10));
  if (!year || !month || !day) return null;
  const date = new Date(year, month - 1, day);
  return Number.isFinite(date.getTime()) ? date : null;
}

function dateOnlyISO(date) {
  if (!date || !Number.isFinite(date.getTime())) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function diffDaysInclusive(startDate, endDate) {
  if (!startDate || !endDate) return 0;
  const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()).getTime();
  const end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()).getTime();
  return Math.max(1, Math.round((end - start) / 86400000) + 1);
}

function isAnnualLeaveType(type) {
  return normalizeText(type).includes("cuti tahunan");
}

function isSickLeaveType(type) {
  return normalizeText(type).includes("sakit");
}

function isBirthLeaveType(type) {
  const raw = normalizeText(type);
  return raw.includes("lahiran") || raw.includes("melahirkan") || raw.includes("persalinan");
}

function isMaternityLeaveType(type) {
  const raw = normalizeText(type);
  return (raw.includes("lahiran") || raw.includes("melahirkan")) && !raw.includes("ayah") && !raw.includes("pendamping");
}

function isGriefLeaveType(type) {
  const raw = normalizeText(type);
  return raw.includes("duka") || raw.includes("kematian") || raw.includes("meninggal");
}

function addMonthsClamped(date, months) {
  if (!date || !Number.isFinite(date.getTime())) return null;
  const targetYear = date.getFullYear();
  const targetMonth = date.getMonth() + Number(months || 0);
  const targetDay = date.getDate();
  const lastDay = new Date(targetYear, targetMonth + 1, 0).getDate();
  return new Date(targetYear, targetMonth, Math.min(targetDay, lastDay));
}

function getMaternityLeaveEndDate(startDate) {
  const end = addMonthsClamped(startDate, MATERNITY_LEAVE_MONTHS);
  if (!end) return null;
  end.setDate(end.getDate() - 1);
  return end;
}

function getMaternityLeaveEndISO(startValue) {
  const startDate = parseInputDate(startValue);
  const endDate = getMaternityLeaveEndDate(startDate);
  return endDate ? dateOnlyISO(endDate) : "";
}

function isShortPermissionType(type) {
  const raw = normalizeText(type);
  return raw.includes("telat") || raw.includes("pulang cepat");
}

function requiresLeaveAttachment(type) {
  const raw = normalizeText(type);
  // Lampiran wajib hanya untuk pengajuan sakit/medis.
  // Cuti Tahunan, Cuti Duka, Cuti Alasan Penting, Cuti Bersama, dan izin biasa tidak wajib foto/lampiran.
  return raw.includes("sakit") || raw.includes("surat dokter") || raw.includes("dokter") || raw.includes("medis") || raw.includes("rawat");
}

function isActiveLeaveStatus(status) {
  const raw = normalizeText(status || "Menunggu");
  return !["ditolak", "rejected", "batal", "cancel", "cancelled", "dibatalkan", "dicabut", "revoked", "cabut"].includes(raw);
}

function isApprovedLeaveStatus(status) {
  const raw = normalizeText(status || "");
  return ["disetujui", "approved", "approve", "acc", "diterima", "terima", "aktif", "cuti aktif"].includes(raw);
}

function isPendingLeaveStatus(status) {
  const raw = normalizeText(status || "Menunggu");
  return ["menunggu", "pending", "review", "menunggu approval", "menunggu persetujuan"].includes(raw);
}

function isBlockingLeaveStatus(status) {
  const raw = normalizeText(status || "Menunggu");
  return !["ditolak", "rejected", "batal", "cancel", "cancelled", "dibatalkan", "dicabut", "revoked", "cabut", "selesai", "done"].includes(raw);
}

function countWorkdays(startDate, endDate) {
  if (!startDate || !endDate) return 0;
  const cursor = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const finish = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
  let count = 0;
  while (cursor.getTime() <= finish.getTime()) {
    const day = cursor.getDay();
    if (day !== 0) count += 1;
    cursor.setDate(cursor.getDate() + 1);
  }
  return Math.max(1, count);
}

function getLeaveEffectiveDays(row) {
  const explicit = Number(getVal(row, "approvedWorkdays") || getVal(row, "workdays") || getVal(row, "requestedWorkdays") || getVal(row, "requestedDays") || 0);
  if (Number.isFinite(explicit) && explicit > 0) return explicit;
  const range = getLeaveDateRange(row);
  return range ? countWorkdays(range.start, range.end) : 1;
}

function getApprovedLeaveForDate(leaves, currentUser, date) {
  const userId = String(getVal(currentUser, "id") || "");
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return safeArray(leaves).find((row) => {
    if (String(getVal(row, "userId")) !== userId) return false;
    if (!isApprovedLeaveStatus(getVal(row, "status"))) return false;
    const range = getLeaveDateRange(row);
    if (!range) return false;
    return rangesOverlap(target, target, range.start, range.end);
  });
}

function getIncomingAdminMessages(messages, currentUser) {
  const userId = String(getVal(currentUser, "id") || "").toUpperCase();
  return safeArray(messages)
    .filter((row) => {
      const action = normalizeText(getVal(row, "action"));
      const type = normalizeText(getVal(row, "type"));
      const direction = normalizeText(getVal(row, "direction") || getVal(row, "arah"));
      const senderRole = normalizeText(getVal(row, "senderRole") || getVal(row, "fromRole") || getVal(row, "pengirimRole"));
      const target = String(getVal(row, "targetUserId") || getVal(row, "toUserId") || getVal(row, "target") || getVal(row, "kepada") || getVal(row, "userId") || "").toUpperCase();
      const isForUser = [userId, "ALL", "SEMUA", "BROADCAST", ""].includes(target);
      const fromAdmin = direction === "in" || direction === "masuk" || senderRole.includes("admin") || action.includes("admin_message") || action.includes("broadcast") || type.includes("broadcast") || type.includes("pesan admin");
      const fromEmployee = type.includes("pesan karyawan") || type.includes("lupa sandi");
      return isForUser && fromAdmin && !fromEmployee;
    })
    .map((row) => ({ ...row, readKey: getMessageReadKey(row, currentUser) }))
    .sort((a, b) => Number(getVal(b, "timestamp") || parseDateToMillis(getVal(b, "date"))) - Number(getVal(a, "timestamp") || parseDateToMillis(getVal(a, "date"))));
}

function getMessageReadKey(message, currentUser) {
  const userId = String(getVal(currentUser, "id") || getVal(message, "targetUserId") || getVal(message, "toUserId") || getVal(message, "userId") || "USER").toUpperCase();
  const rawId = getVal(message, "id") || getVal(message, "messageId") || getVal(message, "pesanId") || getVal(message, "suratId") || "";
  if (rawId) return `msg:${userId}:${String(rawId)}`;
  return `msg:${userId}:${String(getVal(message, "subject") || getVal(message, "judul") || getVal(message, "title") || getVal(message, "type") || "pesan")}:${String(getVal(message, "date") || "")}:${String(getVal(message, "time") || getVal(message, "waktu") || "")}:${String(getVal(message, "timestamp") || "")}`;
}

function getNotificationReadKey(item, currentUser) {
  const userId = String(getVal(currentUser, "id") || "USER").toUpperCase();
  const rawId = item?.id || getVal(item, "id") || getVal(item, "cutiId") || getVal(item, "leaveId") || getVal(item, "reportId") || "";
  if (rawId) return `notif:${userId}:${String(rawId)}`;
  return `notif:${userId}:${String(item?.title || getVal(item, "title") || "notif")}:${String(item?.date || getVal(item, "date") || "")}:${String(item?.timestamp || getVal(item, "timestamp") || "")}`;
}

function uniqueKeys(keys) {
  return Array.from(new Set(safeArray(keys).map((key) => String(key || "")).filter(Boolean))).slice(-500);
}

function getUserNotifications(db, currentUser) {
  const userId = String(getVal(currentUser, "id") || "");
  const isAdminDecisionRow = (row = {}) => {
    const syncStatus = normalizeText(getVal(row, "syncStatus"));
    const source = normalizeText(getVal(row, "source") || getVal(row, "updatedBy") || getVal(row, "approvedBy") || getVal(row, "rejectedBy") || getVal(row, "revokedBy") || getVal(row, "adminName"));
    const hasAdminStamp = Boolean(getVal(row, "approvedAt") || getVal(row, "rejectedAt") || getVal(row, "revokedAt") || getVal(row, "decisionAt"));
    if (["menunggu_sinkron", "gagal_sinkron"].includes(syncStatus)) return false;
    return hasAdminStamp || source.includes("admin") || source.includes("hr") || source.includes("hrd") || Boolean(getVal(row, "suratUrl") || getVal(row, "suratCutiUrl") || getVal(row, "attachmentUrl"));
  };

  const leaveItems = safeArray(db?.cuti)
    .filter((row) => String(getVal(row, "userId")) === userId)
    .filter((row) => {
      const status = normalizeText(getVal(row, "status"));
      return ["disetujui", "approved", "acc", "ditolak", "rejected", "dicabut", "revoked"].includes(status) && isAdminDecisionRow(row);
    })
    .map((row) => ({
      id: getVal(row, "id") || getVal(row, "cutiId") || getVal(row, "leaveId") || `cuti-${userId}-${getVal(row, "type") || "pengajuan"}-${getVal(row, "start") || getVal(row, "dateStart") || getVal(row, "date") || ""}-${getVal(row, "updatedAt") || getVal(row, "approvedAt") || getVal(row, "rejectedAt") || getVal(row, "timestamp") || ""}`,
      title: `Pengajuan ${getVal(row, "type") || "Cuti"}`,
      body: `Status: ${getVal(row, "status") || "-"}. Tanggal: ${getVal(row, "start") || getVal(row, "dateStart") || "-"}`,
      date: getVal(row, "updatedAt") || getVal(row, "approvedAt") || getVal(row, "rejectedAt") || getVal(row, "date"),
      timestamp: Number(getVal(row, "timestamp") || parseDateToMillis(getVal(row, "date")) || 0),
      icon: Coffee,
      tone: isApprovedLeaveStatus(getVal(row, "status")) ? "bg-emerald-50 text-emerald-700 ring-emerald-100" : "bg-amber-50 text-amber-700 ring-amber-100",
    }));

  const reportItems = safeArray(db?.laporan)
    .filter((row) => String(getVal(row, "userId")) === userId)
    .filter((row) => {
      const status = normalizeText(getVal(row, "reportStatus") || getVal(row, "status"));
      const syncStatus = normalizeText(getVal(row, "syncStatus"));
      const updatedBy = normalizeText(getVal(row, "updatedBy") || getVal(row, "reviewedBy") || getVal(row, "adminName") || getVal(row, "source"));
      const hasAdminStamp = Boolean(getVal(row, "reviewedAt") || getVal(row, "updatedAt") || getVal(row, "decisionAt"));
      const ignored = ["terkirim", "menunggu review admin", "menunggu", "pending", "baru", "new", "menunggu_sinkron", "gagal_sinkron"];
      return status && !ignored.includes(status) && !["menunggu_sinkron", "gagal_sinkron"].includes(syncStatus) && (hasAdminStamp || updatedBy.includes("admin") || updatedBy.includes("hr") || updatedBy.includes("hrd"));
    })
    .map((row) => ({
      id: getVal(row, "id") || getVal(row, "reportId") || `report-${userId}-${getVal(row, "judul") || getVal(row, "title") || "laporan"}-${getVal(row, "updatedAt") || getVal(row, "date") || getVal(row, "timestamp") || ""}`,
      title: getVal(row, "judul") || getVal(row, "title") || "Update Laporan",
      body: `Status laporan: ${getVal(row, "reportStatus") || getVal(row, "status") || "-"}`,
      date: getVal(row, "updatedAt") || getVal(row, "date"),
      timestamp: Number(getVal(row, "timestamp") || parseDateToMillis(getVal(row, "date")) || 0),
      icon: FileText,
      tone: "bg-blue-50 text-blue-700 ring-blue-100",
    }));

  return [...leaveItems, ...reportItems]
    .map((item) => ({ ...item, readKey: getNotificationReadKey(item, currentUser) }))
    .sort((a, b) => Number(b.timestamp || 0) - Number(a.timestamp || 0))
    .slice(0, 20);
}

function getLeaveDateRange(row) {
  const raw = String(getVal(row, "start") || getVal(row, "dateStart") || getVal(row, "tanggalMulai") || getVal(row, "date") || "");
  const parts = raw.split(" s/d ").map((item) => item.trim());
  const startMs = parseDateToMillis(parts[0]);
  const endMs = parseDateToMillis(parts[1] || getVal(row, "end") || getVal(row, "dateEnd") || getVal(row, "tanggalSelesai") || parts[0]);
  if (!startMs) return null;
  return { start: new Date(startMs), end: new Date(endMs || startMs) };
}

function rangesOverlap(aStart, aEnd, bStart, bEnd) {
  if (!aStart || !aEnd || !bStart || !bEnd) return false;
  return aStart.getTime() <= bEnd.getTime() && bStart.getTime() <= aEnd.getTime();
}

function getLeaveQuotaStats(leaves, currentUser, year) {
  const userId = String(getVal(currentUser, "id") || "");
  const userRows = safeArray(leaves).filter((row) => String(getVal(row, "userId")) === userId && isAnnualLeaveType(getVal(row, "type")));
  const annualRows = userRows.filter((row) => {
    const range = getLeaveDateRange(row);
    return range?.start?.getFullYear() === Number(year);
  });
  const approvedRows = annualRows.filter((row) => isApprovedLeaveStatus(getVal(row, "status")));
  const pendingRows = annualRows.filter((row) => isPendingLeaveStatus(getVal(row, "status")));
  const used = approvedRows.reduce((sum, row) => sum + getLeaveEffectiveDays(row), 0);
  const pending = pendingRows.reduce((sum, row) => sum + getLeaveEffectiveDays(row), 0);
  return {
    year: Number(year),
    used,
    pending,
    limit: CUTI_ANNUAL_REQUEST_LIMIT,
    remaining: Math.max(0, CUTI_ANNUAL_REQUEST_LIMIT - used),
    approvedRows,
    pendingRows,
    annualRows,
  };
}

function getHolidayRows(db) {
  const source = safeArray(db?.kalender_nasional).length
    ? safeArray(db?.kalender_nasional)
    : safeArray(db?.hari_libur).length
      ? safeArray(db?.hari_libur)
      : NATIONAL_HOLIDAYS_2026;

  return source
    .map((row) => {
      const date = getVal(row, "date") || getVal(row, "tanggal") || getVal(row, "tgl") || row.date || "";
      return {
        id: getVal(row, "id") || date,
        date,
        name: getVal(row, "name") || getVal(row, "nama") || getVal(row, "holiday") || getVal(row, "keterangan") || row.name || "Hari Libur",
        type: getVal(row, "type") || getVal(row, "jenis") || row.type || "Libur Nasional",
        note: getVal(row, "note") || getVal(row, "catatan") || "",
      };
    })
    .filter((row) => parseInputDate(String(row.date).slice(0, 10)))
    .sort((a, b) => parseInputDate(String(a.date).slice(0, 10)).getTime() - parseInputDate(String(b.date).slice(0, 10)).getTime());
}

function getUpcomingHoliday(holidays, date = new Date()) {
  const today = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  return safeArray(holidays).find((row) => {
    const d = parseInputDate(String(row.date).slice(0, 10));
    return d && d.getTime() >= today;
  });
}

function validateLeaveRequest({ type, start, end, leaves, currentUser, hasAttachment }) {
  const startDate = parseInputDate(start);
  const endDate = parseInputDate(end || start);
  if (!startDate) return { ok: false, message: "Tanggal mulai wajib diisi." };
  if (!endDate) return { ok: false, message: "Tanggal selesai tidak valid." };
  if (endDate.getTime() < startDate.getTime()) return { ok: false, message: "Tanggal selesai tidak boleh sebelum tanggal mulai." };
  if (isShortPermissionType(type) && diffDaysInclusive(startDate, endDate) > 1) return { ok: false, message: "Izin telat / pulang cepat hanya boleh untuk 1 hari." };

  const maternityLeave = isMaternityLeaveType(type);
  const maternityAutoEnd = maternityLeave ? getMaternityLeaveEndDate(startDate) : null;
  if (maternityLeave && maternityAutoEnd && dateOnlyISO(endDate) !== dateOnlyISO(maternityAutoEnd)) {
    return {
      ok: false,
      message: `Cuti Melahirkan otomatis ${MATERNITY_LEAVE_MONTHS} bulan. Tanggal selesai harus ${formatDateIndo(dateOnlyISO(maternityAutoEnd))}.`,
      maternityAutoEndDate: dateOnlyISO(maternityAutoEnd),
    };
  }
  if (requiresLeaveAttachment(type) && !hasAttachment) return { ok: false, message: "Izin sakit wajib melampirkan bukti surat keterangan sakit / surat dokter." };

  const userId = String(getVal(currentUser, "id") || "");
  const activeRows = safeArray(leaves).filter((row) => String(getVal(row, "userId")) === userId && isBlockingLeaveStatus(getVal(row, "status")));
  const overlap = activeRows.find((row) => {
    const range = getLeaveDateRange(row);
    return range && rangesOverlap(startDate, endDate, range.start, range.end);
  });
  if (overlap) {
    return { ok: false, message: `Tanggal bentrok dengan pengajuan aktif: ${getVal(overlap, "type") || "Pengajuan"}.`, overlapId: getVal(overlap, "id") || "" };
  }

  const quotaYear = startDate.getFullYear();
  const stats = getLeaveQuotaStats(leaves, currentUser, quotaYear);
  const calendarDays = diffDaysInclusive(startDate, endDate);
  const requestedWorkdays = countWorkdays(startDate, endDate);
  if (isAnnualLeaveType(type) && requestedWorkdays > stats.remaining) {
    return { ok: false, message: `Sisa Kuota Cuti Tahunan ${quotaYear} hanya ${stats.remaining} hari kerja. Pengajuan ini membutuhkan ${requestedWorkdays} hari kerja.`, quota: stats };
  }

  return {
    ok: true,
    message: "Valid",
    quota: stats,
    quotaYear,
    requestedDays: requestedWorkdays,
    requestedWorkdays,
    calendarDays,
    dateStart: dateOnlyISO(startDate),
    dateEnd: dateOnlyISO(endDate),
    category: isMaternityLeaveType(type) ? "CUTI_MELAHIRKAN" : isGriefLeaveType(type) ? "CUTI_DUKA" : isAnnualLeaveType(type) ? "CUTI_TAHUNAN" : isSickLeaveType(type) ? "SAKIT" : isBirthLeaveType(type) ? "KELAHIRAN" : isShortPermissionType(type) ? "IZIN_JAM" : normalizeText(type).includes("izin") ? "IZIN" : normalizeText(type).includes("cuti") ? "CUTI_KHUSUS" : "LAINNYA",
    isMaternityLeave: maternityLeave,
    maternityLeaveMonths: maternityLeave ? MATERNITY_LEAVE_MONTHS : "",
    maternityAutoEndDate: maternityAutoEnd ? dateOnlyISO(maternityAutoEnd) : "",
  };
}

const SHIFT_CONFIG = {
  Kesehatan: [
    {
      key: "pagi",
      label: "Shift Pagi",
      start: "Masuk Shift Pagi",
      breakStart: "Mulai Istirahat",
      breakEnd: "Selesai Istirahat",
      end: "Pulang Shift Pagi",
    },
    {
      key: "siang",
      label: "Shift Siang",
      start: "Masuk Shift Siang",
      breakStart: "Mulai Istirahat",
      breakEnd: "Selesai Istirahat",
      end: "Pulang Shift Siang",
    },
    {
      key: "malam",
      label: "Shift Malam",
      start: "Masuk Shift Malam",
      breakStart: "Mulai Istirahat",
      breakEnd: "Selesai Istirahat",
      end: "Pulang Shift Malam",
    },
  ],
  Sekuriti: [
    {
      key: "pagi",
      label: "Shift Pagi",
      start: "Masuk Shift Pagi",
      breakStart: "Mulai Istirahat",
      breakEnd: "Selesai Istirahat",
      patrol: "Patroli Area",
      end: "Pulang Shift Pagi",
    },
    {
      key: "malam",
      label: "Shift Malam",
      start: "Masuk Shift Malam",
      breakStart: "Mulai Istirahat",
      breakEnd: "Selesai Istirahat",
      patrol: "Patroli Area",
      end: "Pulang Shift Malam",
    },
  ],
};

function buildAttendanceMenu(role, todayRecords) {
  const rowFor = (action) => safeArray(todayRecords).find((r) => {
    const rowAction = getVal(r, "actionType") || getVal(r, "attendanceAction") || getVal(r, "aksi") || getVal(r, "jenisAbsensi") || getVal(r, "action");
    return normalizeText(rowAction) === normalizeText(action);
  });
  const done = (action) => Boolean(rowFor(action));
  const doneStatusText = (action) => {
    const row = rowFor(action);
    const syncStatus = String(getVal(row, "syncStatus") || "").toUpperCase();
    if (syncStatus === "MENUNGGU_SINKRON") return "Menunggu Sinkron";
    if (syncStatus === "GAGAL_SINKRON") return "Gagal Sinkron";
    if (syncStatus === "TERSINKRON" && getVal(row, "serverVerified") !== true) return "Menunggu Verifikasi";
    if (getVal(row, "serverVerified") === false) return "Menunggu Verifikasi";
    return "Sudah tercatat";
  };

  if (!SHIFT_CONFIG[role]) {
    return (ROLE_ACTIONS[role] || ROLE_ACTIONS.Umum).map((action) => ({
      action,
      disabled: done(action) && action !== "Patroli Area" && action !== "Tiba di Lokasi",
      statusText: done(action) && action !== "Patroli Area" && action !== "Tiba di Lokasi" ? doneStatusText(action) : "Foto + lokasi GPS",
    }));
  }

  const shifts = SHIFT_CONFIG[role];
  const activeShift = shifts.find((shift) => done(shift.start));

  if (!activeShift) {
    return [
      ...shifts.map((shift) => ({
        action: shift.start,
        disabled: false,
        statusText: "Pilih shift kerja",
      })),
      {
        action: "Absen Libur",
        disabled: done("Absen Libur"),
        statusText: done("Absen Libur") ? doneStatusText("Absen Libur") : "Khusus hari libur/off",
      },
    ];
  }

  const items = [];

  shifts.forEach((shift) => {
    if (shift.key !== activeShift.key) {
      items.push({
        action: shift.start,
        disabled: true,
        statusText: `Terkunci: sudah memilih ${activeShift.label}`,
      });
    }
  });

  const sequence = [
    activeShift.start,
    activeShift.breakStart,
    activeShift.breakEnd,
    activeShift.patrol,
    activeShift.end,
  ].filter(Boolean);

  sequence.forEach((action, index) => {
    const previousAction = sequence[index - 1];
    const already = done(action);
    const waitingPrevious = previousAction && !done(previousAction);
    const repeatable = action === "Patroli Area";

    items.push({
      action,
      disabled: waitingPrevious || (already && !repeatable),
      statusText: waitingPrevious
        ? `Menunggu ${previousAction}`
        : already && !repeatable
          ? doneStatusText(action)
          : repeatable && already
            ? "Bisa dicatat berkali-kali"
            : "Foto + lokasi GPS",
    });
  });

  items.push({
    action: "Absen Libur",
    disabled: true,
    statusText: `Terkunci: sudah memilih ${activeShift.label}`,
  });

  return items;
}

function readCache(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw || raw === "undefined" || raw === "null") return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writeCache(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore storage quota errors
  }
}

function isNetworkOnline() {
  return typeof navigator === "undefined" ? true : navigator.onLine !== false;
}

function getPayloadUniqueKey(payload = {}) {
  const action = String(getVal(payload, "action") || getVal(payload, "originalAction") || "payload").trim();
  const clientKey = getVal(payload, "clientRequestId") || getVal(payload, "idempotencyKey") || getVal(payload, "requestId") || getVal(payload, "id");
  if (clientKey) return `${action}:${String(clientKey).trim()}`;
  return `${action}:${getVal(payload, "userId") || getVal(payload, "idKaryawan") || "USER"}:${getVal(payload, "date") || getVal(payload, "tanggal") || "DATE"}:${getVal(payload, "time") || getVal(payload, "jam") || Date.now()}`;
}

function makeOfflinePayload(payload = {}, reason = "Koneksi offline / server belum merespons") {
  const nowIso = new Date().toISOString();
  return {
    ...payload,
    syncStatus: "MENUNGGU_SINKRON",
    offlineMode: true,
    offlineCapturedAt: payload.offlineCapturedAt || payload.serverTime || payload.deviceTime || nowIso,
    queuedAt: payload.queuedAt || nowIso,
    syncError: reason,
    verificationStatus: payload.verificationStatus || "MENUNGGU_VERIFIKASI_SERVER",
    sourceDevice: payload.sourceDevice || APP_PLATFORM,
    appVersion: payload.appVersion || APP_VERSION,
  };
}

function makeQueueItem(payload = {}, reason = "Menunggu sinkron") {
  const cleanPayload = makeOfflinePayload(payload, reason);
  const key = getPayloadUniqueKey(cleanPayload);
  return {
    id: key,
    key,
    action: getVal(cleanPayload, "action") || "payload",
    payload: cleanPayload,
    attempts: 0,
    createdAt: cleanPayload.queuedAt || new Date().toISOString(),
    lastAttemptAt: "",
    lastError: reason,
  };
}

async function fetchTextWithTimeout(url, options = {}, timeoutMs = API_GET_TIMEOUT_MS) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}

function parseApiJson(text, fallbackMessage = "Response server tidak valid") {
  if (!text) return { status: "success" };
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(text.slice(0, 220) || fallbackMessage);
  }
}

function assertApiSuccess(json, fallbackMessage = "Gagal memproses data") {
  const ok = json?.status === "success" || json?.success === true || json?.ok === true || (!json?.status && !json?.error && !json?.message);
  if (!ok) throw new Error(json?.message || json?.error || fallbackMessage);
  return json;
}

function getFirebaseDatabaseUrl() {
  const raw = String(FIREBASE_CONFIG.databaseURL || "").trim();
  const clean = raw.endsWith("/") ? raw.slice(0, -1) : raw;
  if (!clean || clean.includes("ISI_PROJECT_ID")) {
    throw new Error("Firebase belum dikonfigurasi. Isi FIREBASE_CONFIG.databaseURL dengan URL Realtime Database kamu.");
  }
  return clean;
}

function cleanFirebaseSegment(value = "") {
  return String(value || "")
    .trim()
    .split(".").join("-")
    .split("#").join("-")
    .split("$").join("-")
    .split("[").join("-")
    .split("]").join("-")
    .split("/").join("-")
    .split(" ").join("-") || "item";
}

function firebasePath(...parts) {
  return [FIREBASE_DB_ROOT, ...parts]
    .map((part) => String(part || "").trim())
    .filter(Boolean)
    .map((part) => part.split("/").map(cleanFirebaseSegment).join("/"))
    .join("/");
}

function firebaseEndpoint(path = "") {
  const base = getFirebaseDatabaseUrl();
  const cleanPath = String(path || "").replace(/^\/+|\/+$/g, "");
  return `${base}/${cleanPath}.json`;
}

async function firebaseRequest(path = "", options = {}) {
  const {
    method = "GET",
    body = undefined,
    timeoutMs = FIREBASE_TIMEOUT_MS,
  } = options;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(firebaseEndpoint(path), {
      method,
      cache: "no-store",
      signal: controller.signal,
      headers: body === undefined ? undefined : { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });

    const text = await res.text();
    let json = null;
    if (text) {
      try {
        json = JSON.parse(text);
      } catch {
        throw new Error(text.slice(0, 180) || "Response Firebase tidak valid");
      }
    }

    if (!res.ok) {
      throw new Error(json?.error || json?.message || `Firebase error ${res.status}`);
    }

    return json;
  } finally {
    clearTimeout(timer);
  }
}

function normalizeFirebaseList(value) {
  const rows = [];

  if (!value) return rows;

  if (Array.isArray(value)) {
    value.filter(Boolean).forEach((row, index) => {
      if (row && typeof row === "object") rows.push({ firebaseKey: String(index), ...row });
    });
  } else if (typeof value === "object") {
    Object.entries(value).forEach(([firebaseKey, row]) => {
      if (!row || typeof row !== "object") return;
      rows.push({
        firebaseKey,
        ...row,
        id: getVal(row, "id") || getVal(row, "userId") || getVal(row, "idKaryawan") || firebaseKey,
      });
    });
  }

  const seen = new Map();
  rows.forEach((row) => {
    const userId = getVal(row, "userId") || getVal(row, "idKaryawan") || getVal(row, "employeeId") || getVal(row, "id") || "";
    const date = getVal(row, "date") || getVal(row, "tanggal") || "";
    const action = getVal(row, "actionType") || getVal(row, "attendanceAction") || getVal(row, "aksi") || getVal(row, "type") || getVal(row, "originalAction") || "";
    const stableKey = row.firebaseKey || `${userId}-${date}-${action}`;
    seen.set(String(stableKey).toUpperCase(), row);
  });

  return Array.from(seen.values()).map((row) => {
    const isAttendanceRow =
      getVal(row, "firebaseKey")?.toString?.().toUpperCase?.().includes("ABSENSI") ||
      normalizeText(getVal(row, "action") || "").includes("submit_attendance") ||
      Boolean(getVal(row, "attendanceAction") || getVal(row, "actionType") || getVal(row, "jenisAbsensi"));

    if (!isAttendanceRow) return row;

    const displayAction = getActivityDisplayTitle(row);
    return {
      ...row,
      action: displayAction,
      actionLabel: displayAction,
      displayAction,
      time: getVal(row, "time") || getVal(row, "jam") || getVal(row, "createdAt") || getVal(row, "timestamp") || getVal(row, "updatedAt"),
    };
  });
}

function clearLocalAttendanceCache() {
  try {
    const keepKeys = [];
    const removeKeys = [];
    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i);
      if (!key) continue;
      const lower = key.toLowerCase();
      const isAttendanceCache =
        lower.includes("absen") ||
        lower.includes("attendance") ||
        lower.includes("riwayat") ||
        lower.includes("history") ||
        lower.includes("today") ||
        lower.includes("daily") ||
        lower.includes("lastaction") ||
        lower.includes("last_action");
      const isImportantSession =
        lower.includes("user") ||
        lower.includes("login") ||
        lower.includes("session") ||
        lower.includes("token") ||
        lower.includes("employee") ||
        lower.includes("karyawan") ||
        lower.includes("offline") ||
        lower.includes("queue");
      if (isAttendanceCache && !isImportantSession) removeKeys.push(key);
      else keepKeys.push(key);
    }
    removeKeys.forEach((key) => localStorage.removeItem(key));
    return removeKeys;
  } catch {
    return [];
  }
}

function normalizeFirebaseDbPayload(raw = {}) {
  const source = raw || {};
  const data = {
    serverTime: new Date().toISOString(),
    karyawan: normalizeFirebaseList(source.karyawan || source.employees || source.employee),
    absensi: normalizeFirebaseList(source.absensi || source.attendance || source.attendances || source.attendance_history),
    laporan: normalizeFirebaseList(source.laporan || source.reports || source.report),
    cuti: normalizeFirebaseList(source.cuti || source.leaves || source.leaveRequests || source.pengajuan),
    pesan: normalizeFirebaseList(source.pesan || source.messages || source.message),
    broadcast: normalizeFirebaseList(source.broadcast || source.broadcasts),
    kalender_nasional: normalizeFirebaseList(source.kalender_nasional || source.hari_libur || source.holidays),
    hari_libur: normalizeFirebaseList(source.hari_libur || source.kalender_nasional || source.holidays),
    jam_kerja: normalizeFirebaseList(source.jam_kerja || source.jamKerja || source.workSchedules || source.schedules),
  };

  // Firebase adalah sumber utama. Jika data dihapus dari Firebase,
  // aplikasi juga harus ikut kosong, bukan mempertahankan cache lama.
  if (!data.absensi.length) clearLocalAttendanceCache();

  const normalized = normalizeServerDbPayload({ data, serverTime: data.serverTime });
  normalized.absensi = data.absensi;
  normalized.attendance = data.absensi;
  normalized.attendances = data.absensi;
  normalized.attendance_history = data.absensi;
  normalized.laporan = data.laporan;
  normalized.reports = data.laporan;
  normalized.cuti = data.cuti;
  normalized.leaves = data.cuti;
  normalized.pesan = data.pesan;
  normalized.messages = data.pesan;
  normalized.broadcast = data.broadcast;
  normalized.kalender_nasional = data.kalender_nasional;
  normalized.hari_libur = data.hari_libur;
  normalized.jam_kerja = data.jam_kerja;
  normalized.data = {
    ...(normalized.data || {}),
    karyawan: data.karyawan,
    absensi: data.absensi,
    attendance: data.absensi,
    attendances: data.absensi,
    attendance_history: data.absensi,
    laporan: data.laporan,
    reports: data.laporan,
    cuti: data.cuti,
    leaves: data.cuti,
    pesan: data.pesan,
    messages: data.pesan,
    broadcast: data.broadcast,
    kalender_nasional: data.kalender_nasional,
    hari_libur: data.hari_libur,
    jam_kerja: data.jam_kerja,
  };
  return normalized;
}

function getFirebaseRealtimeUrl() {
  return `${firebaseEndpoint(firebasePath(""))}`;
}

async function readFirebaseDatabase() {
  const raw = await firebaseRequest(firebasePath(""), { method: "GET" });
  return normalizeFirebaseDbPayload(raw || {});
}

function getFirebaseRowId(payload = {}, prefix = "ROW") {
  const collection = getFirebaseCollectionForPayload(payload);
  const userId = getVal(payload, "userId") || getVal(payload, "idKaryawan") || getVal(payload, "employeeId") || getVal(payload, "id") || "USER";
  const date = getVal(payload, "date") || getVal(payload, "tanggal") || dateOnlyISO(new Date()) || "DATE";
  const action = getVal(payload, "actionType") || getVal(payload, "attendanceAction") || getVal(payload, "aksi") || getVal(payload, "type") || getVal(payload, "originalAction") || getVal(payload, "action") || prefix;

  // Anti double input absensi:
  // Satu karyawan + satu tanggal + satu jenis absensi = satu record Firebase.
  // Kalau request terkirim ulang, Firebase akan update record yang sama, bukan membuat data baru.
  if (collection === "absensi") {
    return cleanFirebaseSegment(`ABSENSI-${userId}-${date}-${action}`);
  }

  const explicit = getVal(payload, "id") || getVal(payload, "clientRequestId") || getVal(payload, "idempotencyKey") || getVal(payload, "requestId");
  if (explicit) return cleanFirebaseSegment(explicit);

  if (collection === "cuti") {
    return cleanFirebaseSegment(`CUTI-${userId}-${date}-${action}`);
  }

  if (collection === "laporan") {
    return cleanFirebaseSegment(`LAPORAN-${userId}-${date}-${action}`);
  }

  return cleanFirebaseSegment(`${prefix}-${userId}-${date}-${action}-${Date.now()}`);
}

function toDisplayTitle(value = "") {
  return String(value || "")
    .replaceAll("_", " ")
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function getActivityDisplayTitle(item = {}) {
  const raw = String(
    getVal(item, "actionLabel") ||
    getVal(item, "displayAction") ||
    getVal(item, "jenisAbsensi") ||
    getVal(item, "attendanceAction") ||
    getVal(item, "actionType") ||
    getVal(item, "aksi") ||
    getVal(item, "type") ||
    getVal(item, "action") ||
    ""
  ).trim();

  const text = normalizeText(raw).replaceAll("_", " ");
  const maps = [
    [/masuk|check in|clock in|submit attendance/, "Absen Masuk"],
    [/pulang|check out|clock out/, "Absen Pulang"],
    [/mulai istirahat|istirahat mulai|break start/, "Mulai Istirahat"],
    [/selesai istirahat|istirahat selesai|break end/, "Selesai Istirahat"],
    [/libur/, "Absen Libur"],
    [/cuti tahunan/, "Cuti Tahunan"],
    [/cuti melahirkan|lahiran/, "Cuti Melahirkan / Lahiran"],
    [/cuti duka|kematian|meninggal/, "Cuti Duka"],
    [/izin telat|pulang cepat/, "Izin Telat / Pulang Cepat"],
    [/izin/, "Izin"],
    [/sakit/, "Sakit"],
    [/laporan|report/, "Laporan"],
  ];

  for (const [pattern, label] of maps) {
    if (pattern.test(text)) return label;
  }

  return raw ? toDisplayTitle(raw) : "Aktivitas";
}

function getActivityDisplayTime(item = {}) {
  const raw = getVal(item, "time") || getVal(item, "jam") || getVal(item, "createdAt") || getVal(item, "timestamp") || getVal(item, "updatedAt");
  if (!raw) return "--:--";
  if (typeof raw === "string" && /^[0-9]{1,2}:[0-9]{2}/.test(raw.trim())) return raw.trim().slice(0, 5);
  const date = new Date(raw);
  if (!Number.isNaN(date.getTime())) {
    return date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }).replace(".", ":");
  }
  return String(raw).slice(0, 5);
}

function getActivityDisplayStatus(item = {}) {
  const raw = getVal(item, "status") || getVal(item, "keterangan") || getVal(item, "note") || getVal(item, "catatan") || "Tercatat";
  return toDisplayTitle(raw || "Tercatat");
}

function getFirebaseCollectionForPayload(payload = {}) {
  const actionName = normalizeText(getVal(payload, "action") || "");
  const actionLabel = normalizeText(
    getVal(payload, "originalAction") ||
    getVal(payload, "actionType") ||
    getVal(payload, "attendanceAction") ||
    getVal(payload, "aksi") ||
    getVal(payload, "jenisAbsensi") ||
    getVal(payload, "type") ||
    ""
  );
  const combined = `${actionName} ${actionLabel}`;

  if (actionName === "login") return "login";
  if (combined.includes("profile") || combined.includes("profil") || combined.includes("update_employee")) return "karyawan";
  if (combined.includes("leave") || combined.includes("cuti") || combined.includes("pengajuan") || combined.includes("izin_sakit")) return "cuti";
  if (combined.includes("report") || combined.includes("laporan")) return "laporan";
  if (combined.includes("message") || combined.includes("pesan") || combined.includes("lupa sandi") || combined.includes("forgot")) return "pesan";
  if (combined.includes("submit_attendance") || ACTION_STYLE[getVal(payload, "action")] || /absen|shift|patroli|istirahat|bertugas|tiba|pulang|libur/.test(combined)) return "absensi";
  return "misc";
}

function findFirebaseEmployeeForLogin(employees, id, pin) {
  const inputId = String(id || "").toUpperCase().trim();
  const inputKrs = inputId.replace(/^KS-/, "KRS-");
  const inputKs = inputId.replace(/^KRS-/, "KS-");
  const inputPin = String(pin || "").trim();

  return safeArray(employees).find((u) => {
    const ids = [
      getVal(u, "id"),
      getVal(u, "userId"),
      getVal(u, "idKaryawan"),
      getVal(u, "id_karyawan"),
      getVal(u, "oldId"),
      getVal(u, "idLama"),
    ].map((value) => String(value || "").toUpperCase().trim()).filter(Boolean);

    const matchId = ids.some((rowId) => rowId === inputId || rowId.replace(/^KS-/, "KRS-") === inputKrs || rowId.replace(/^KRS-/, "KS-") === inputKs);
    const password = String(getVal(u, "password") || getVal(u, "sandi") || getVal(u, "pin") || "").trim();
    const status = normalizeText(getVal(u, "status") || "Aktif");
    return matchId && password === inputPin && !["tidak aktif", "resign", "nonaktif"].includes(status);
  });
}

async function writeFirebasePayload(payload = {}) {
  const collection = getFirebaseCollectionForPayload(payload);
  if (collection === "login") throw new Error("Login tidak bisa disimpan sebagai data.");

  let prepared = { ...payload, updatedAt: getVal(payload, "updatedAt") || new Date().toISOString() };

  // Update foto/profil wajib jadi PATCH kecil ke data karyawan saja.
  // Jangan kirim seluruh currentUser karena bisa membawa field action/riwayat/objek besar
  // dan membuat Firebase tidak mengubah foto pada record karyawan yang benar.
  if (collection === "karyawan") {
    const employeeId = String(
      getVal(prepared, "id") ||
      getVal(prepared, "userId") ||
      getVal(prepared, "idKaryawan") ||
      getVal(prepared, "id_karyawan") ||
      ""
    ).trim();
    const photoValue =
      getVal(prepared, "photoUrl") ||
      getVal(prepared, "fotoUrl") ||
      getVal(prepared, "fotoProfil") ||
      getVal(prepared, "profilePhoto") ||
      getVal(prepared, "profileImageUrl") ||
      getVal(prepared, "photo") ||
      getVal(prepared, "photoBase64") ||
      getVal(prepared, "fotoBase64") ||
      getVal(prepared, "imageBase64") ||
      "";

    prepared = {
      id: employeeId,
      userId: getVal(prepared, "userId") || employeeId,
      idKaryawan: getVal(prepared, "idKaryawan") || employeeId,
      id_karyawan: getVal(prepared, "id_karyawan") || employeeId,
      name: getVal(prepared, "name") || getVal(prepared, "nama") || "",
      nama: getVal(prepared, "nama") || getVal(prepared, "name") || "",
      email: getVal(prepared, "email") || "",
      phone: getVal(prepared, "phone") || getVal(prepared, "noHp") || getVal(prepared, "whatsapp") || "",
      noHp: getVal(prepared, "noHp") || getVal(prepared, "phone") || getVal(prepared, "whatsapp") || "",
      whatsapp: getVal(prepared, "whatsapp") || getVal(prepared, "phone") || getVal(prepared, "noHp") || "",
      emergencyContact: getVal(prepared, "emergencyContact") || "",
      addressKtp: getVal(prepared, "addressKtp") || getVal(prepared, "alamatKtp") || "",
      alamatKtp: getVal(prepared, "alamatKtp") || getVal(prepared, "addressKtp") || "",
      addressDetail: getVal(prepared, "addressDetail") || getVal(prepared, "alamatDomisili") || "",
      alamatDomisili: getVal(prepared, "alamatDomisili") || getVal(prepared, "addressDetail") || "",
      photo: photoValue,
      photoUrl: photoValue,
      fotoUrl: photoValue,
      fotoProfil: photoValue,
      profilePhoto: photoValue,
      profileImageUrl: photoValue,
      photoBase64: photoValue,
      fotoBase64: photoValue,
      imageBase64: photoValue,
      photoUpdatedAt: getVal(prepared, "photoUpdatedAt") || new Date().toISOString(),
      profileUpdatedAt: getVal(prepared, "profileUpdatedAt") || new Date().toISOString(),
      updatedAt: getVal(prepared, "updatedAt") || new Date().toISOString(),
      syncStatus: getVal(prepared, "syncStatus") || "TERSINKRON",
    };
  }

  if (collection === "absensi") {
    const originalTechnicalAction = getVal(prepared, "action") || "submit_attendance";
    const displayAction = getActivityDisplayTitle(prepared);
    prepared = {
      ...prepared,
      originalAction: originalTechnicalAction,
      action: displayAction,
      actionLabel: displayAction,
      displayAction,
      time: getVal(prepared, "time") || getVal(prepared, "jam") || new Date().toISOString(),
    };
  }
  let rowId = getFirebaseRowId(prepared, collection.toUpperCase());
  let method = "PUT";

  if (collection === "karyawan") {
    rowId = cleanFirebaseSegment(getVal(prepared, "id") || getVal(prepared, "userId") || getVal(prepared, "idKaryawan") || rowId);
    method = "PATCH";
  }

  const path = firebasePath(collection, rowId);
  await firebaseRequest(path, { method, body: prepared, timeoutMs: API_POST_TIMEOUT_MS });
  return { success: true, ok: true, status: "success", firebasePath: path, id: rowId, message: "Data berhasil tersimpan di Firebase." };
}

function compareVersions(a, b) {
  const left = String(a || "0").split(".").map((n) => Number(n) || 0);
  const right = String(b || "0").split(".").map((n) => Number(n) || 0);
  const len = Math.max(left.length, right.length);
  for (let i = 0; i < len; i += 1) {
    if ((left[i] || 0) > (right[i] || 0)) return 1;
    if ((left[i] || 0) < (right[i] || 0)) return -1;
  }
  return 0;
}

function boolFromAny(value) {
  const raw = normalizeText(value);
  return value === true || raw === "true" || raw === "ya" || raw === "yes" || raw === "1" || raw === "wajib";
}

function normalizeUpdateConfig(json = {}) {
  const source = json.config || json.update || json.data || json;
  const latestVersion = String(source.latestVersion || source.latest_version || source.version || APP_VERSION).trim();
  const minRequiredVersion = String(source.minRequiredVersion || source.min_required_version || source.minimumVersion || source.minimum_version || latestVersion).trim();
  const forceUpdate = boolFromAny(source.forceUpdate || source.force_update || source.required || source.wajibUpdate);
  const apkUrl = String(source.apkUrl || source.apk_url || source.downloadUrl || source.download_url || source.url || "").trim();
  const updateTitle = source.updateTitle || source.update_title || "Update Aplikasi Tersedia";
  const updateMessage = source.updateMessage || source.update_message || "Versi terbaru aplikasi sudah tersedia. Silakan update agar fitur absensi tetap berjalan normal.";
  const releaseNotes = source.releaseNotes || source.release_notes || source.notes || "Perbaikan stabilitas, sinkronisasi, dan fitur absensi terbaru.";
  const hasUpdate = compareVersions(latestVersion, APP_VERSION) > 0 || compareVersions(minRequiredVersion, APP_VERSION) > 0;
  const required = forceUpdate || compareVersions(minRequiredVersion, APP_VERSION) > 0;
  return { latestVersion, minRequiredVersion, forceUpdate, required, apkUrl, updateTitle, updateMessage, releaseNotes, hasUpdate };
}

async function checkAppUpdate() {
  try {
    const config = await firebaseRequest(firebasePath("app_update"), { method: "GET", timeoutMs: UPDATE_CHECK_TIMEOUT_MS });
    return normalizeUpdateConfig({ data: config || {} });
  } catch (err) {
    // Jika node app_update belum dibuat di Firebase, aplikasi tetap berjalan normal.
    return normalizeUpdateConfig({ data: { latestVersion: APP_VERSION, minRequiredVersion: APP_VERSION } });
  }
}

function getCurrentPositionSafe(options = {}) {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) return reject(new Error("GPS tidak tersedia"));
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

function weatherCodeMeta(code) {
  const value = Number(code);
  if (value === 0) return { label: "Cerah", kind: "clear" };
  if (value === 1 || value === 2) return { label: "Cerah Berawan", kind: "partly" };
  if (value === 3 || value === 45 || value === 48) return { label: "Berawan", kind: "cloud" };
  if ((value >= 51 && value <= 67) || (value >= 80 && value <= 82)) return { label: "Hujan", kind: "rain" };
  if ((value >= 71 && value <= 77) || value === 85 || value === 86) return { label: "Hujan Es", kind: "rain" };
  if (value >= 95) return { label: "Badai", kind: "storm" };
  return { label: "Cuaca", kind: "partly" };
}

function getWeatherIcon(kind) {
  if (kind === "clear") return Sun;
  if (kind === "rain") return CloudRain;
  if (kind === "storm") return CloudLightning;
  if (kind === "cloud") return Cloud;
  return CloudSun;
}

function cleanLocationLabel(value, fallback = "Lokasi saat ini") {
  const text = String(value || "").trim();
  if (!text) return fallback;
  return text
    .replace("Kecamatan ", "")
    .replace("Kabupaten ", "Kab. ")
    .replace("Kota ", "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 2)
    .join(", ") || fallback;
}

async function fetchWeatherSnapshot(fallbackLocation = "Lokasi saat ini") {
  try {
    const pos = await getCurrentPositionSafe({ enableHighAccuracy: false, timeout: WEATHER_TIMEOUT_MS, maximumAge: 10 * 60 * 1000 });
    const latitude = pos.coords.latitude;
    const longitude = pos.coords.longitude;
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(latitude)}&longitude=${encodeURIComponent(longitude)}&current=temperature_2m,weather_code&timezone=auto`;
    const geoUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${encodeURIComponent(latitude)}&longitude=${encodeURIComponent(longitude)}&localityLanguage=id`;

    const weatherResponse = await fetch(weatherUrl, { cache: "no-store" });
    const weatherJson = await weatherResponse.json();
    let locationJson = {};
    try {
      const locationResponse = await fetch(geoUrl, { cache: "no-store" });
      locationJson = await locationResponse.json();
    } catch {
      locationJson = {};
    }

    const current = weatherJson?.current || {};
    const meta = weatherCodeMeta(current.weather_code);
    const place = locationJson.city || locationJson.locality || locationJson.principalSubdivision || fallbackLocation;

    return {
      ok: true,
      temperature: Number.isFinite(Number(current.temperature_2m)) ? Math.round(Number(current.temperature_2m)) : null,
      label: meta.label,
      kind: meta.kind,
      location: cleanLocationLabel(place, fallbackLocation),
      updatedAt: Date.now(),
    };
  } catch {
    return {
      ok: false,
      temperature: null,
      label: "Cuaca tidak tersedia",
      kind: "partly",
      location: fallbackLocation || "Lokasi saat ini",
      updatedAt: Date.now(),
    };
  }
}

function getAttendanceActionLabel(payload = {}) {
  const values = [
    payload.originalAction,
    payload.actionType,
    payload.attendanceAction,
    payload.aksi,
    payload.jenisAbsensi,
    payload.action,
  ].map((value) => String(value || "").trim()).filter(Boolean);

  const found = values.find((value) => {
    const key = normalizeText(value);
    return ACTION_STYLE[value] || /absen|shift|patroli|istirahat|bertugas|tiba|pulang|libur/.test(key);
  });

  // Jangan fallback ke "Absen Masuk" di sini.
  // Kalau fallback di sini, payload cuti/izin/sakit ikut dianggap sebagai absensi.
  return found || "";
}

function buildServerPayload(payload = {}) {
  const originalAction = String(payload.action || "").trim();
  const actionKey = normalizeText(originalAction);
  const attendanceCommand = ["submit_attendance", "submitattendance", "attendance_check", "attendancecheck", "check_attendance"].includes(actionKey);
  const attendanceLabel = getAttendanceActionLabel(payload);
  const isAttendanceAction = attendanceCommand || Boolean(ACTION_STYLE[originalAction]) || /absen|shift|patroli|istirahat|bertugas|tiba|pulang|libur/.test(actionKey) || Boolean(attendanceLabel && /absen|shift|patroli|istirahat|bertugas|tiba|pulang|libur/.test(normalizeText(attendanceLabel)));
  const isProfileAction = actionKey.includes("profile") || actionKey.includes("profil") || payload.photoUrl || payload.profilePhoto || payload.fotoProfil;
  const isLeaveAction = actionKey === "cuti" || actionKey.includes("leave") || actionKey.includes("pengajuan") || actionKey.includes("izin_sakit");
  const isMessageAction = actionKey.includes("message") || actionKey.includes("pesan") || actionKey.includes("lupa sandi") || actionKey.includes("forgot");
  const isReportAction = actionKey.includes("report") || actionKey.includes("laporan");

  if (isAttendanceAction) {
    const serverAction = actionKey === "attendance_check" || actionKey === "attendancecheck" || actionKey === "check_attendance" ? "attendance_check" : "submit_attendance";
    const userId = payload.userId || payload.idKaryawan || payload.employeeId || payload.id_karyawan || payload.id || "";
    const name = payload.name || payload.nama || payload.namaKaryawan || "";
    const date = payload.date || payload.tanggal || payload.tanggalAbsensi || dateOnlyISO(new Date()) || "";
    const time = payload.time || payload.jam || payload.waktu || nowParts().time || "";
    const location = payload.location || payload.lokasi || payload.alamatLokasi || "";
    const photo = payload.photo || payload.photoUrl || payload.fotoUrl || payload.fotoAbsensi || payload.stampedPhoto || "";
    const finalAttendanceLabel = attendanceLabel || payload.actionType || payload.attendanceAction || payload.aksi || payload.originalAction || originalAction || "Absen Masuk";
    const actionSlug = String(finalAttendanceLabel || "Absensi").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "") || "Absensi";
    const stableRequestId = payload.clientRequestId || payload.idempotencyKey || payload.requestId || `${userId || "USER"}-${date}-${actionSlug}`;

    return {
      ...payload,
      action: serverAction,
      originalAction: finalAttendanceLabel,
      actionType: finalAttendanceLabel,
      attendanceAction: finalAttendanceLabel,
      aksi: finalAttendanceLabel,
      jenisAbsensi: finalAttendanceLabel,
      statusAbsensi: payload.latenessStatus || payload.statusAbsensi || payload.status || "Tercatat",
      id: payload.id || stableRequestId,
      requestId: stableRequestId,
      clientRequestId: stableRequestId,
      idempotencyKey: stableRequestId,
      userId,
      idKaryawan: payload.idKaryawan || userId,
      employeeId: payload.employeeId || userId,
      id_karyawan: payload.id_karyawan || userId,
      nama: name,
      name,
      tanggal: date,
      date,
      jam: time,
      time,
      waktu: time,
      lokasi: location,
      location,
      latitude: payload.latitude || payload.lat || "",
      longitude: payload.longitude || payload.lng || "",
      accuracy: payload.accuracy || payload.akurasi || "",
      akurasi: payload.akurasi || payload.accuracy || "",
      fotoUrl: payload.fotoUrl || photo,
      photoUrl: payload.photoUrl || photo,
      fotoAbsensi: payload.fotoAbsensi || photo,
      stampedPhoto: payload.stampedPhoto || photo,
      photo,
      serverTime: payload.serverTime || new Date().toISOString(),
      deviceTime: payload.deviceTime || new Date().toISOString(),
      locationPolicy: payload.locationPolicy || "NO_LOCATION_BLOCK",
      outsideGeofenceAllowed: payload.outsideGeofenceAllowed !== false,
      geofenceImpact: payload.geofenceImpact || "TIDAK_MEMBLOKIR_ABSENSI",
      keteranganLokasi: payload.keteranganLokasi || payload.locationNote || payload.locationIntegrity || "Lokasi tercatat",
      locationNote: payload.locationNote || payload.keteranganLokasi || payload.locationIntegrity || "Lokasi tercatat",
    };
  }

  if (isProfileAction) {
    return {
      ...payload,
      action: "update_employee",
      originalAction: originalAction || "update_profile",
      userId: payload.userId || payload.id || payload.idKaryawan,
      idKaryawan: payload.idKaryawan || payload.id || payload.userId,
      id_karyawan: payload.id_karyawan || payload.id || payload.userId,
      nama: payload.name || payload.nama,
      noHp: payload.phone || payload.noHp || payload.whatsapp,
      alamatDomisili: payload.addressDetail || payload.alamatDomisili || payload.address || payload.domisili,
      alamatKtp: payload.addressKtp || payload.alamatKtp || payload.alamat,
      fotoUrl: payload.photoUrl || payload.fotoUrl || payload.photo || payload.profilePhoto || "",
      fotoProfil: payload.fotoProfil || payload.photoUrl || payload.photo || payload.profilePhoto || "",
      profilePhoto: payload.profilePhoto || payload.photoUrl || payload.photo || payload.fotoProfil || "",
      photoBase64: payload.photoBase64 || payload.photo || "",
    };
  }

  if (isLeaveAction) {
    const userId = payload.userId || payload.idKaryawan || payload.employeeId || payload.id_karyawan || payload.id || "";
    const name = payload.name || payload.nama || payload.namaKaryawan || "";
    const type = payload.type || payload.jenisCuti || payload.jenis || payload.requestCategory || "Pengajuan";
    const start = payload.dateStart || payload.start || payload.tanggalMulai || payload.tanggal || payload.date || "";
    const end = payload.dateEnd || payload.end || payload.tanggalSelesai || start;
    const actionSlug = String(type || "Pengajuan").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "") || "Pengajuan";
    const stableRequestId = payload.clientRequestId || payload.idempotencyKey || payload.requestId || payload.id || `CUTI-${userId || "USER"}-${start}-${actionSlug}`;

    return {
      ...payload,
      action: "submitLeaveRequest",
      originalAction: originalAction || "cuti",
      id: payload.id || stableRequestId,
      requestId: stableRequestId,
      clientRequestId: stableRequestId,
      idempotencyKey: stableRequestId,
      userId,
      idKaryawan: payload.idKaryawan || userId,
      employeeId: payload.employeeId || userId,
      id_karyawan: payload.id_karyawan || userId,
      name,
      nama: payload.nama || name,
      type,
      jenisCuti: type,
      jenis: type,
      alasan: payload.reason || payload.alasan || payload.keterangan || "",
      reason: payload.reason || payload.alasan || payload.keterangan || "",
      tanggalMulai: start,
      tanggalSelesai: end,
      dateStart: start,
      dateEnd: end,
      start,
      end,
      jumlahHari: payload.requestedWorkdays || payload.requestedDays || payload.calendarDays || payload.jumlahHari,
      requestedDays: payload.requestedDays || payload.requestedWorkdays || payload.calendarDays || payload.jumlahHari,
      requestedWorkdays: payload.requestedWorkdays || payload.requestedDays || payload.jumlahHari,
      date: payload.date || payload.tanggal || dateOnlyISO(new Date()),
      tanggal: payload.tanggal || payload.date || dateOnlyISO(new Date()),
      time: payload.time || payload.jam || nowParts().time,
      jam: payload.jam || payload.time || nowParts().time,
      status: payload.status || "Menunggu",
      lampiran: payload.photo || payload.lampiran || "",
      photo: payload.photo || payload.lampiran || "",
    };
  }

  if (isMessageAction) {
    return {
      ...payload,
      action: "admin_message",
      originalAction: originalAction || "send_message",
      userId: payload.userId || payload.idKaryawan || payload.id,
      targetUserId: payload.targetUserId || payload.toUserId || payload.userId || "ADMIN",
      name: payload.name || payload.nama,
      role: payload.role,
      penempatan: payload.penempatan,
      direction: payload.direction || "out",
      senderRole: payload.senderRole || "karyawan",
      type: payload.type || "Pesan Karyawan",
      subject: payload.subject || payload.judul || payload.title || payload.type || "Pesan Karyawan",
      pesan: payload.pesan || payload.message || payload.body || payload.text || "",
      message: payload.message || payload.pesan || payload.body || payload.text || "",
      status: payload.status || "Terkirim",
    };
  }

  if (isReportAction) {
    return {
      ...payload,
      action: "submitReport",
      originalAction: originalAction || "report",
      idKaryawan: payload.userId || payload.idKaryawan,
      id_karyawan: payload.userId || payload.idKaryawan,
      nama: payload.name || payload.nama,
      isiLaporan: payload.text || payload.isiLaporan || payload.laporan,
      laporan: payload.text || payload.laporan,
      lampiran: payload.photo || payload.lampiran || "",
    };
  }

  return payload;
}

function normalizeServerDbPayload(json = {}) {
  const source = json.data || json;
  const pickArray = (...keys) => {
    for (const key of keys) {
      if (Array.isArray(source?.[key])) return source[key];
      if (Array.isArray(json?.[key])) return json[key];
      if (Array.isArray(source?.data?.[key])) return source.data[key];
    }
    return [];
  };

  const pickServerTime = () => {
    const value = source.serverTime || source.server_time || source.time || source.now || source.timestamp || json.serverTime || json.server_time || json.time || json.now || json.timestamp;
    if (value && typeof value === "object") return value.iso || value.value || value.date || value.time || new Date().toISOString();
    return value || new Date().toISOString();
  };

  const normalizeEmployeeRow = (row = {}) => {
    const id = getVal(row, "id") || getVal(row, "userId") || getVal(row, "idKaryawan") || getVal(row, "id_karyawan") || getVal(row, "ID Karyawan") || getVal(row, "nik") || "";
    const name = getVal(row, "name") || getVal(row, "nama") || getVal(row, "Nama") || getVal(row, "namaLengkap") || "Karyawan";
    const penempatan = getVal(row, "namaPenempatanLengkap") || getVal(row, "penempatan") || getVal(row, "site") || getVal(row, "instansi") || "-";
    const role = getVal(row, "role") || getVal(row, "smartDivisi") || getVal(row, "divisi") || getVal(row, "devisi") || "Umum";
    const pekerjaan = getVal(row, "pekerjaan") || getVal(row, "bagianSmart") || getVal(row, "jabatan") || getVal(row, "bagian") || role;
    const password = getVal(row, "password") || getVal(row, "pin") || getVal(row, "PIN") || getVal(row, "sandi") || "";
    const photo = getVal(row, "photoUrl") || getVal(row, "fotoUrl") || getVal(row, "fotoProfil") || getVal(row, "profilePhoto") || getVal(row, "profileImageUrl") || getVal(row, "photo") || getVal(row, "foto") || getVal(row, "photoBase64") || getVal(row, "fotoBase64") || getVal(row, "imageBase64") || "";
    return {
      ...row,
      id,
      userId: getVal(row, "userId") || id,
      idKaryawan: getVal(row, "idKaryawan") || id,
      name,
      nama: getVal(row, "nama") || name,
      password,
      pin: getVal(row, "pin") || password,
      sandi: getVal(row, "sandi") || password,
      role,
      divisi: getVal(row, "divisi") || role,
      devisi: getVal(row, "devisi") || getVal(row, "divisi") || role,
      pekerjaan,
      bagianSmart: getVal(row, "bagianSmart") || pekerjaan,
      penempatan,
      namaPenempatanLengkap: getVal(row, "namaPenempatanLengkap") || penempatan,
      site: getVal(row, "site") || penempatan,
      status: getVal(row, "status") || "Aktif",
      phone: getVal(row, "phone") || getVal(row, "noHp") || getVal(row, "whatsapp") || "",
      noHp: getVal(row, "noHp") || getVal(row, "phone") || getVal(row, "whatsapp") || "",
      photoUrl: getVal(row, "photoUrl") || photo,
      fotoUrl: getVal(row, "fotoUrl") || photo,
      fotoProfil: getVal(row, "fotoProfil") || photo,
      profilePhoto: getVal(row, "profilePhoto") || photo,
    };
  };

  const normalizeAttendanceRow = (row = {}) => {
    const action = getVal(row, "actionType") || getVal(row, "attendanceAction") || getVal(row, "aksi") || getVal(row, "jenisAbsensi") || getVal(row, "originalAction") || getVal(row, "action") || "Absensi";
    const userId = getVal(row, "userId") || getVal(row, "idKaryawan") || getVal(row, "id_karyawan") || getVal(row, "id") || "";
    const date = getVal(row, "date") || getVal(row, "tanggal") || getVal(row, "tgl") || "";
    const time = getVal(row, "time") || getVal(row, "jam") || getVal(row, "waktu") || "";
    return {
      ...row,
      serverVerified: true,
      syncStatus: getVal(row, "syncStatus") || "TERSINKRON",
      id: getVal(row, "id") || getVal(row, "attendanceId") || `ABS-${userId}-${date}-${time}-${action}`,
      userId,
      idKaryawan: getVal(row, "idKaryawan") || userId,
      name: getVal(row, "name") || getVal(row, "nama") || "",
      nama: getVal(row, "nama") || getVal(row, "name") || "",
      action,
      actionType: getVal(row, "actionType") || action,
      attendanceAction: getVal(row, "attendanceAction") || action,
      aksi: getVal(row, "aksi") || action,
      date,
      tanggal: getVal(row, "tanggal") || date,
      time,
      jam: getVal(row, "jam") || time,
      location: getVal(row, "location") || getVal(row, "lokasi") || "",
      lokasi: getVal(row, "lokasi") || getVal(row, "location") || "",
      latenessStatus: getVal(row, "latenessStatus") || getVal(row, "statusAbsensi") || getVal(row, "status") || "Tercatat",
      photoUrl: getVal(row, "photoUrl") || getVal(row, "fotoUrl") || getVal(row, "fotoAbsensi") || getVal(row, "photo") || "",
    };
  };

  const normalizeLeaveRow = (row = {}) => {
    const userId = getVal(row, "userId") || getVal(row, "idKaryawan") || getVal(row, "id_karyawan") || "";
    const type = getVal(row, "type") || getVal(row, "jenis") || getVal(row, "jenisCuti") || getVal(row, "requestCategory") || "Pengajuan";
    const start = getVal(row, "start") || getVal(row, "dateStart") || getVal(row, "tanggalMulai") || getVal(row, "tanggal") || getVal(row, "date") || "";
    const end = getVal(row, "end") || getVal(row, "dateEnd") || getVal(row, "tanggalSelesai") || "";
    return {
      ...row,
      id: getVal(row, "id") || getVal(row, "cutiId") || getVal(row, "leaveId") || `CUTI-${userId}-${start}-${type}`,
      userId,
      idKaryawan: getVal(row, "idKaryawan") || userId,
      name: getVal(row, "name") || getVal(row, "nama") || "",
      nama: getVal(row, "nama") || getVal(row, "name") || "",
      type,
      jenis: getVal(row, "jenis") || type,
      start,
      dateStart: getVal(row, "dateStart") || start,
      tanggalMulai: getVal(row, "tanggalMulai") || start,
      end,
      dateEnd: getVal(row, "dateEnd") || end,
      tanggalSelesai: getVal(row, "tanggalSelesai") || end,
      reason: getVal(row, "reason") || getVal(row, "alasan") || getVal(row, "keterangan") || "",
      status: getVal(row, "status") || "Menunggu",
      date: getVal(row, "date") || getVal(row, "tanggal") || start,
      time: getVal(row, "time") || getVal(row, "jam") || getVal(row, "waktu") || "",
    };
  };

  const normalizeReportRow = (row = {}) => {
    const userId = getVal(row, "userId") || getVal(row, "idKaryawan") || getVal(row, "id_karyawan") || "";
    const text = getVal(row, "text") || getVal(row, "laporan") || getVal(row, "isiLaporan") || getVal(row, "keterangan") || "";
    return {
      ...row,
      id: getVal(row, "id") || getVal(row, "reportId") || `REP-${userId}-${getVal(row, "timestamp") || Date.now()}`,
      userId,
      idKaryawan: getVal(row, "idKaryawan") || userId,
      name: getVal(row, "name") || getVal(row, "nama") || "",
      nama: getVal(row, "nama") || getVal(row, "name") || "",
      text,
      laporan: getVal(row, "laporan") || text,
      title: getVal(row, "title") || getVal(row, "judul") || "Laporan Kerja",
      judul: getVal(row, "judul") || getVal(row, "title") || "Laporan Kerja",
      date: getVal(row, "date") || getVal(row, "tanggal") || "",
      time: getVal(row, "time") || getVal(row, "jam") || getVal(row, "waktu") || "",
      status: getVal(row, "status") || getVal(row, "reportStatus") || "Terkirim",
    };
  };

  const normalizeMessageRow = (row = {}) => {
    const userId = getVal(row, "userId") || getVal(row, "idKaryawan") || getVal(row, "id_karyawan") || "";
    const targetUserId = getVal(row, "targetUserId") || getVal(row, "toUserId") || getVal(row, "target") || getVal(row, "kepada") || userId || "";
    const message = getVal(row, "message") || getVal(row, "pesan") || getVal(row, "body") || getVal(row, "text") || "";
    return {
      ...row,
      id: getVal(row, "id") || getVal(row, "messageId") || getVal(row, "pesanId") || `MSG-${targetUserId}-${getVal(row, "timestamp") || Date.now()}`,
      userId,
      targetUserId,
      toUserId: getVal(row, "toUserId") || targetUserId,
      name: getVal(row, "name") || getVal(row, "nama") || "",
      nama: getVal(row, "nama") || getVal(row, "name") || "",
      message,
      pesan: getVal(row, "pesan") || message,
      subject: getVal(row, "subject") || getVal(row, "judul") || getVal(row, "title") || getVal(row, "type") || "Pesan Admin",
      date: getVal(row, "date") || getVal(row, "tanggal") || "",
      time: getVal(row, "time") || getVal(row, "jam") || getVal(row, "waktu") || "",
    };
  };

  return {
    ...source,
    serverTime: pickServerTime(),
    karyawan: pickArray("karyawan", "employees", "employee", "rows").map(normalizeEmployeeRow),
    absensi: pickArray("absensi", "attendance_history", "attendance", "attendances").map(normalizeAttendanceRow),
    laporan: pickArray("laporan", "list_laporan", "reports", "report").map(normalizeReportRow),
    cuti: pickArray("cuti", "list_cuti", "pengajuan", "leaveRequests", "leaves").map(normalizeLeaveRow),
    pesan: pickArray("pesan", "messages", "message").map(normalizeMessageRow),
    broadcast: pickArray("broadcast", "broadcasts").map(normalizeMessageRow),
    jam_kerja: pickArray("jam_kerja", "jamKerja", "jam_kerja_smart", "workSchedules", "schedules"),
    kalender_nasional: pickArray("kalender_nasional", "hari_libur", "holidays"),
    hari_libur: pickArray("hari_libur", "kalender_nasional", "holidays"),
  };
}

async function apiGet(params = {}) {
  const requestedAction = String(params.action || "").trim();

  if (["getServerTime", "ping"].includes(requestedAction)) {
    return {
      success: true,
      ok: true,
      status: "success",
      serverTime: new Date().toISOString(),
    };
  }

  const data = await readFirebaseDatabase();
  const requestedUserId = String(params.userId || params.id || params.idKaryawan || "").trim().toUpperCase();

  if (requestedAction === "getProfile" && requestedUserId) {
    const found = safeArray(data.karyawan).find((item) => String(getVal(item, "id") || getVal(item, "userId") || getVal(item, "idKaryawan")).toUpperCase() === requestedUserId);
    if (!found) throw new Error("Profil karyawan tidak ditemukan di Firebase.");
    return { ...data, success: true, ok: true, status: "success", user: found, employee: found, data: { ...data, user: found, employee: found } };
  }

  return { ...data, success: true, ok: true, status: "success" };
}

async function apiPost(payload) {
  const originalAction = normalizeText(getVal(payload, "action"));

  if (originalAction === "login") {
    const data = await readFirebaseDatabase();
    const user = findFirebaseEmployeeForLogin(data.karyawan, getVal(payload, "id") || getVal(payload, "userId") || getVal(payload, "idKaryawan"), getVal(payload, "password") || getVal(payload, "pin") || getVal(payload, "sandi"));
    if (!user) throw new Error("ID karyawan atau PIN tidak cocok.");
    return { success: true, ok: true, status: "success", user, employee: user, data: { user, employee: user } };
  }

  const serverPayload = buildServerPayload(payload);
  return writeFirebasePayload(serverPayload);
}

function normalizeSingleEmployee(row) {
  return normalizeServerDbPayload({ data: { employees: [row] } }).karyawan[0] || row;
}

function extractSinglePayloadRow(json = {}) {
  return json.user || json.employee || json.profile || json.row || json.data?.user || json.data?.employee || json.data?.profile || json.data?.row || json.data || json;
}

async function getServerTime() {
  const attempts = [
    () => apiGet({ action: "getServerTime" }),
    () => apiGet({ action: "ping" }),
  ];

  for (const run of attempts) {
    try {
      const result = await run();
      const raw = result.serverTime || result.server_time || result.time || result.now || result.timestamp;
      const ms = Date.parse(raw);
      if (Number.isFinite(ms)) return { iso: new Date(ms).toISOString(), date: new Date(ms), offsetMs: ms - Date.now() };
    } catch {
      // fallback ke percobaan berikutnya
    }
  }

  const local = new Date();
  return { iso: local.toISOString(), date: local, offsetMs: 0 };
}

async function loginEmployee(id, pin) {
  const cleanId = String(id || "").toUpperCase().trim();
  const cleanPin = String(pin || "").trim();
  if (!cleanId || !cleanPin) throw new Error("ID karyawan dan PIN wajib diisi.");

  const result = await apiPost({
    action: "login",
    id: cleanId,
    userId: cleanId,
    idKaryawan: cleanId,
    id_karyawan: cleanId,
    password: cleanPin,
    pin: cleanPin,
    sandi: cleanPin,
  });

  const row = extractSinglePayloadRow(result);
  if (!row || typeof row !== "object") throw new Error(result?.message || "Login gagal. Data user tidak ditemukan.");
  return normalizeSingleEmployee(row);
}

async function getEmployeeProfile(userOrId) {
  const userId = String(typeof userOrId === "object" ? (getVal(userOrId, "id") || getVal(userOrId, "userId") || getVal(userOrId, "idKaryawan")) : userOrId || "").trim();
  if (!userId) throw new Error("ID karyawan tidak tersedia untuk membaca profil.");

  const result = await apiGet({ action: "getProfile", role: "employee", userId, id: userId, idKaryawan: userId });
  const row = extractSinglePayloadRow(result);
  if (row && typeof row === "object" && !Array.isArray(row)) return normalizeSingleEmployee(row);

  const sync = await syncEmployee({ id: userId });
  const found = safeArray(sync.karyawan).find((item) => String(getVal(item, "id") || getVal(item, "userId") || getVal(item, "idKaryawan")).toUpperCase() === userId.toUpperCase());
  if (!found) throw new Error("Profil karyawan tidak ditemukan.");
  return found;
}

async function syncEmployee(userOrId) {
  const userId = String(typeof userOrId === "object" ? (getVal(userOrId, "id") || getVal(userOrId, "userId") || getVal(userOrId, "idKaryawan")) : userOrId || "").trim();
  if (!userId) return apiGet({ action: "employees" });
  return apiGet({ action: "sync", role: "employee", userId, id: userId, idKaryawan: userId });
}

function isAttendancePayload(payload = {}) {
  const raw = normalizeText(payload.action || payload.actionType || payload.attendanceAction || payload.aksi || "");
  return Boolean(ACTION_STYLE[payload.action]) || /absen|shift|patroli|istirahat|bertugas|tiba|pulang|libur/.test(raw);
}

function isLeavePayload(payload = {}) {
  const raw = normalizeText(payload.action || payload.type || payload.jenis || "");
  return raw === "cuti" || raw.includes("leave") || raw.includes("cuti") || raw.includes("izin") || raw.includes("sakit") || raw.includes("pengajuan");
}

function isReportPayload(payload = {}) {
  const raw = normalizeText(payload.action || payload.category || payload.title || payload.judul || "");
  return raw.includes("report") || raw.includes("laporan");
}

async function attendanceCheck(payload = {}) {
  if (!isAttendancePayload(payload)) return { success: true, allowed: true, message: "Bukan payload absensi." };
  const actionType = getAttendanceActionLabel(payload) || payload.actionType || payload.attendanceAction || payload.aksi || payload.originalAction || "Absen Masuk";
  const userId = payload.userId || payload.idKaryawan || payload.id || "";
  const params = {
    action: "attendance_check",
    role: "employee",
    userId,
    id: userId,
    idKaryawan: payload.idKaryawan || userId,
    id_karyawan: payload.id_karyawan || userId,
    nama: payload.nama || payload.name || "",
    actionType,
    attendanceAction: actionType,
    aksi: actionType,
    tanggal: payload.tanggal || payload.date || "",
    jam: payload.jam || payload.time || "",
    lokasi: payload.lokasi || payload.location || "",
    latitude: payload.latitude || payload.lat || "",
    longitude: payload.longitude || payload.lng || "",
    accuracy: payload.accuracy || payload.akurasi || "",
    locationPolicy: "NO_LOCATION_BLOCK",
    outsideGeofenceAllowed: "true",
  };
  return apiGet(params);
}

async function submitAttendance(payload = {}) {
  const actionType = getAttendanceActionLabel(payload) || payload.actionType || payload.attendanceAction || payload.aksi || payload.originalAction || "Absen Masuk";
  return apiPost({
    ...payload,
    action: "submit_attendance",
    originalAction: payload.originalAction || actionType,
    actionType,
    attendanceAction: actionType,
    aksi: actionType,
  });
}

async function submitLeaveRequest(payload = {}) {
  return apiPost({ ...payload, action: "submitLeaveRequest" });
}

async function submitReport(payload = {}) {
  return apiPost({ ...payload, action: "submitReport" });
}

async function savePayloadToServer(payload = {}) {
  if (isAttendancePayload(payload)) return submitAttendance(payload);
  if (isLeavePayload(payload)) return submitLeaveRequest(payload);
  if (isReportPayload(payload)) return submitReport(payload);
  return apiPost(payload);
}

function sleep(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    if (!file) return resolve("");

    const isImage = String(file.type || "").startsWith("image/");
    if (!isImage) {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const img = new window.Image();
      img.onload = () => {
        const scale = Math.min(1, MAX_UPLOAD_IMAGE_SIZE / Math.max(img.width, img.height));
        const width = Math.max(1, Math.round(img.width * scale));
        const height = Math.max(1, Math.round(img.height * scale));
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", UPLOAD_IMAGE_QUALITY));
      };
      img.onerror = () => resolve(String(reader.result || ""));
      img.src = String(reader.result || "");
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function Toast({ message, type = "success", onClose }) {
  if (!message) return null;
  const Icon = type === "error" ? AlertCircle : CheckCircle2;
  return (
    <div className="fixed left-1/2 top-4 z-[100] w-[calc(100%-2rem)] max-w-md -translate-x-1/2">
      <div className={cx("flex items-start gap-3 rounded-3xl border bg-white p-4 shadow-2xl", type === "error" ? "border-red-100" : "border-emerald-100")}>
        <Icon className={cx("mt-0.5 shrink-0", type === "error" ? "text-red-600" : "text-emerald-600")} size={22} />
        <p className="flex-1 text-sm font-semibold text-slate-700">{message}</p>
        <button onClick={onClose} className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

function LoadingOverlay({ label = "Memproses..." }) {
  return (
    <div className="absolute inset-0 z-50 grid place-items-center bg-white/75 px-4 backdrop-blur-md">
      <div className="rounded-[2rem] border border-slate-100 bg-white px-6 py-5 text-center shadow-2xl shadow-slate-200">
        <Loader2 className="mx-auto mb-3 animate-spin text-blue-600" size={30} />
        <p className="text-sm font-black text-slate-700">{label}</p>
      </div>
    </div>
  );
}

function LoginTransitionOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[140] grid place-items-center overflow-hidden bg-white">
      <style>{`
        @keyframes karsaLoginFloatLogo {
          0% { transform: translateY(16px) scale(0.78); opacity: 0; filter: blur(8px); }
          18% { transform: translateY(0) scale(1); opacity: 1; filter: blur(0); }
          46% { transform: translateY(-10px) scale(1.08); opacity: 1; filter: blur(0); }
          72% { transform: translateY(-18px) scale(4.2); opacity: 0.96; filter: blur(0); }
          100% { transform: translateY(-24px) scale(18); opacity: 0; filter: blur(2px); }
        }
        @keyframes karsaLoginSoftBg {
          0% { opacity: 0; transform: scale(1); }
          18% { opacity: 1; transform: scale(1.02); }
          72% { opacity: 0.92; transform: scale(1.08); }
          100% { opacity: 0; transform: scale(1.16); }
        }
        @keyframes karsaLoginLightSweep {
          0% { transform: translateX(-120%) rotate(18deg); opacity: 0; }
          30% { opacity: 0.45; }
          100% { transform: translateX(120%) rotate(18deg); opacity: 0; }
        }
      `}</style>
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ffffff_0%,#eff6ff_45%,#dbeafe_100%)]"
        style={{ animation: "karsaLoginSoftBg 720ms cubic-bezier(0.22,1,0.36,1) forwards" }}
      />
      <div
        className="absolute h-[160%] w-20 bg-white/70 blur-xl"
        style={{ animation: "karsaLoginLightSweep 720ms ease-out forwards" }}
      />
      <img
        src={COMPANY_LOGO_URL}
        alt="Logo Karsa"
        className="relative z-10 h-28 w-28 object-contain drop-shadow-2xl will-change-transform"
        style={{ animation: "karsaLoginFloatLogo 720ms cubic-bezier(0.16,1,0.3,1) forwards" }}
      />
    </div>
  );
}

function OfflineSyncBanner({ isOnline, pendingCount, syncing, onSync }) {
  if (isOnline && pendingCount <= 0) return null;
  return (
    <div className="bg-[#f8fbff] px-4 pb-2 sm:px-5">
      <div className={cx("mx-auto flex max-w-5xl items-center justify-between gap-3 rounded-2xl px-4 py-3 shadow-sm ring-1", isOnline ? "bg-amber-50 text-amber-800 ring-amber-100" : "bg-red-50 text-red-700 ring-red-100")}>
        <div className="flex min-w-0 items-center gap-3">
          <div className={cx("grid h-9 w-9 shrink-0 place-items-center rounded-xl", isOnline ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700")}>
            {syncing ? <Loader2 className="animate-spin" size={18} /> : <Cloud size={18} />}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-wide">{isOnline ? "Menunggu Sinkron" : "Mode Offline"}</p>
            <p className="truncate text-xs font-bold opacity-80">
              {pendingCount > 0 ? `${pendingCount} data tersimpan lokal dan akan dikirim ulang otomatis.` : "Koneksi terputus. Data baru akan disimpan lokal dulu."}
            </p>
          </div>
        </div>
        <button type="button" onClick={onSync} disabled={!isOnline || syncing || pendingCount <= 0} className="shrink-0 rounded-xl bg-white px-3 py-2 text-[10px] font-black uppercase text-slate-700 shadow-sm ring-1 ring-slate-100 disabled:opacity-50">
          {syncing ? "Sync..." : "Sinkron"}
        </button>
      </div>
    </div>
  );
}

function TapHint() {
  return <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-white/90 shadow-sm ring-4 ring-white/30" />;
}

function StatusBadge({ ok, label }) {
  return <span className={cx("rounded-full px-2.5 py-1 text-[10px] font-black uppercase", ok ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700")}>{label}</span>;
}

function AppIcon({ icon: Icon, size = "md", tone = "blue", active = false, className = "" }) {
  const sizes = {
    xs: "h-7 w-7 rounded-xl",
    sm: "h-8 w-8 rounded-2xl",
    md: "h-10 w-10 rounded-[1.15rem]",
    lg: "h-11 w-11 rounded-[1.3rem]",
    xl: "h-14 w-14 rounded-[1.55rem]",
  };

  const iconSizes = {
    xs: 13,
    sm: 15,
    md: 18,
    lg: 20,
    xl: 25,
  };

  const tones = {
    blue: "bg-gradient-to-br from-sky-100 via-white to-blue-200 text-blue-700 shadow-lg shadow-blue-100 ring-blue-100",
    emerald: "bg-gradient-to-br from-emerald-100 via-white to-lime-200 text-emerald-700 shadow-lg shadow-emerald-100 ring-emerald-100",
    amber: "bg-gradient-to-br from-yellow-100 via-white to-orange-200 text-orange-700 shadow-lg shadow-orange-100 ring-orange-100",
    red: "bg-gradient-to-br from-rose-100 via-white to-red-200 text-rose-700 shadow-lg shadow-rose-100 ring-rose-100",
    violet: "bg-gradient-to-br from-fuchsia-100 via-white to-violet-200 text-violet-700 shadow-lg shadow-violet-100 ring-violet-100",
    slate: "bg-gradient-to-br from-slate-100 via-white to-slate-200 text-slate-600 shadow-lg shadow-slate-100 ring-slate-100",
  };

  const activeTones = {
    blue: "bg-gradient-to-br from-cyan-400 via-blue-600 to-indigo-700 text-white shadow-xl shadow-blue-300/60 ring-blue-200",
    emerald: "bg-gradient-to-br from-lime-300 via-emerald-500 to-teal-700 text-white shadow-xl shadow-emerald-300/60 ring-emerald-200",
    amber: "bg-gradient-to-br from-yellow-300 via-orange-500 to-pink-600 text-white shadow-xl shadow-orange-300/60 ring-orange-200",
    red: "bg-gradient-to-br from-rose-400 via-red-500 to-orange-600 text-white shadow-xl shadow-rose-300/60 ring-rose-200",
    violet: "bg-gradient-to-br from-fuchsia-400 via-violet-600 to-indigo-800 text-white shadow-xl shadow-violet-300/60 ring-violet-200",
    slate: "bg-gradient-to-br from-slate-500 via-slate-700 to-slate-950 text-white shadow-xl shadow-slate-300/60 ring-slate-200",
  };

  const pickedTone = tones[tone] ? tone : "blue";

  return (
    <span
      className={[
        "relative grid shrink-0 place-items-center overflow-hidden ring-1 transition duration-300 group-hover:rotate-[-2deg] group-hover:scale-105",
        sizes[size] || sizes.md,
        active ? activeTones[pickedTone] : tones[pickedTone],
        className,
      ].filter(Boolean).join(" ")}
    >
      <span className="pointer-events-none absolute inset-[1px] rounded-[inherit] bg-gradient-to-br from-white/80 via-white/10 to-transparent" />
      <span className="pointer-events-none absolute -right-2 -top-2 h-5 w-5 rounded-full bg-white/45 blur-sm" />
      <Icon
        className="relative z-10 drop-shadow-[0_2px_4px_rgba(15,23,42,0.20)]"
        size={iconSizes[size] || iconSizes.md}
        strokeWidth={2.6}
      />
    </span>
  );
}

function GenZBackdrop() {
  return (
    <style>{`
      html, body, #root { min-height: 100%; background: #f8fbff; }
      * { -webkit-tap-highlight-color: transparent; }
      @keyframes karsaFloaty { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-8px) rotate(1deg); } }
      @keyframes karsaPopIn { 0% { opacity: 0; transform: translateY(10px) scale(.98); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
      @keyframes karsaShimmer { 0% { transform: translateX(-120%); } 100% { transform: translateX(120%); } }
      .karsa-genz-shell { background: radial-gradient(circle at 12% 0%, rgba(56,189,248,.28), transparent 32%), radial-gradient(circle at 92% 14%, rgba(217,70,239,.22), transparent 34%), linear-gradient(180deg,#f8fbff 0%,#f3f0ff 46%,#eff6ff 100%); }
      .karsa-genz-panel { position: relative; overflow: hidden; border: 1px solid rgba(255,255,255,.72); background: rgba(255,255,255,.78); box-shadow: 0 18px 45px -28px rgba(30,41,59,.55); backdrop-filter: blur(18px); animation: karsaPopIn .36s ease both; }
      .karsa-genz-panel::before { content:""; position:absolute; inset:-1px; pointer-events:none; background: linear-gradient(120deg, transparent 8%, rgba(255,255,255,.55) 18%, transparent 30%); transform: translateX(-120%); animation: karsaShimmer 4.8s ease-in-out infinite; }
      .karsa-glow-orb { position:absolute; width:150px; height:150px; border-radius:999px; filter:blur(30px); opacity:.28; pointer-events:none; animation:karsaFloaty 6s ease-in-out infinite; }
      button, a, input, textarea, select { transition: transform .18s ease, box-shadow .2s ease, border-color .2s ease, background .2s ease; }
      button:active { transform: scale(.97); }
      ::-webkit-scrollbar { width: 4px; height: 4px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: transparent; border-radius: 999px; }
      ::-webkit-scrollbar-thumb:hover { background: rgba(148,163,184,.12); }
      * { scrollbar-width: thin; scrollbar-color: transparent transparent; }
    `}</style>
  );
}

function getIconTone(value = "") {
  const raw = normalizeText(value);
  if (raw.includes("masuk") || raw.includes("selesai bertugas")) return "emerald";
  if (raw.includes("istirahat") || raw.includes("telat") || raw.includes("pulang cepat") || raw.includes("shift siang")) return "amber";
  if (raw.includes("sakit")) return "red";
  if (raw.includes("duka") || raw.includes("kematian") || raw.includes("meninggal")) return "slate";
  if (raw.includes("melahirkan") || raw.includes("lahiran") || raw.includes("persalinan")) return "violet";
  if (raw.includes("cuti tahunan")) return "blue";
  if (raw.includes("izin")) return "emerald";
  if (raw.includes("pulang")) return "red";
  if (raw.includes("libur")) return "slate";
  if (raw.includes("lainnya")) return "slate";
  if (raw.includes("patroli") || raw.includes("lokasi")) return "violet";
  return "blue";
}

function getToneFromClassName(value = "", fallback = "blue") {
  const raw = String(value || "").toLowerCase();
  if (raw.includes("emerald") || raw.includes("green")) return "emerald";
  if (raw.includes("amber") || raw.includes("yellow") || raw.includes("orange")) return "amber";
  if (raw.includes("red") || raw.includes("rose")) return "red";
  if (raw.includes("violet") || raw.includes("purple") || raw.includes("indigo")) return "violet";
  if (raw.includes("slate") || raw.includes("gray") || raw.includes("grey")) return "slate";
  if (raw.includes("blue") || raw.includes("sky") || raw.includes("cyan")) return "blue";
  return fallback;
}

function LoginScreen({ onLogin, onForgotPin, syncing, lastSync }) {
  const [id, setId] = useState("");
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [forgotText, setForgotText] = useState("");

  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-[#0f172a] px-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-[calc(env(safe-area-inset-top)+1.5rem)] text-slate-900 sm:px-5">
      <GenZBackdrop />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(34,211,238,.45),transparent_30%),radial-gradient(circle_at_88%_18%,rgba(217,70,239,.42),transparent_32%),radial-gradient(circle_at_48%_92%,rgba(249,115,22,.36),transparent_34%),linear-gradient(135deg,#0f172a_0%,#312e81_48%,#020617_100%)]" />
      <div className="karsa-glow-orb left-6 top-24 bg-cyan-300" />
      <div className="karsa-glow-orb bottom-24 right-3 bg-fuchsia-400" style={{ animationDelay: "-2s" }} />
      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-3rem)] w-full max-w-[430px] flex-col justify-center">
        <div className="mb-6 text-center text-white">
          <div className="relative mx-auto mb-4 h-28 w-28">
            <div className="absolute inset-0 rounded-[2.4rem] bg-white/18 blur-xl" />
            <div className="relative grid h-full w-full place-items-center rounded-[2.2rem] border border-white/25 bg-white/90 p-3 shadow-2xl shadow-fuchsia-500/20 backdrop-blur">
              <img src={COMPANY_LOGO_URL} alt="Logo" className="h-full w-full object-contain" />
            </div>
          </div>
          <div className="mx-auto mb-3 flex w-fit items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] ring-1 ring-white/25 backdrop-blur">
            <Sparkles size={14} /> Absensi Online
          </div>
          <h1 className="text-3xl font-black leading-tight drop-shadow-sm">Karsa Crew App</h1>
          <p className="mt-2 text-sm font-bold leading-relaxed text-white/70">Login cepat, pantau aktivitas, kirim laporan, semua dalam satu aplikasi.</p>
        </div>

        <div className="karsa-genz-panel rounded-[2.2rem] p-5">
          {!forgotMode ? (
            <form
              className="relative z-10 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                onLogin(id, pin);
              }}
            >
              <div className="flex items-center justify-between rounded-[1.5rem] bg-gradient-to-r from-cyan-50 via-violet-50 to-orange-50 p-3 ring-1 ring-white">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-violet-600">Welcome Back</p>
                  <p className="text-sm font-black text-slate-900">Masuk pakai ID karyawan</p>
                </div>
                <AppIcon icon={Fingerprint} size="lg" tone="violet" active />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-500">ID Karyawan</label>
                <div className="relative">
                  <IdCard className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-violet-500" size={20} />
                  <input
                    value={id}
                    onChange={(e) => setId(e.target.value.toUpperCase().replaceAll(" ", ""))}
                    placeholder="Contoh: KRS-001"
                    className="min-h-[58px] w-full rounded-[1.35rem] border border-violet-100 bg-white/80 py-4 pl-12 pr-4 text-base font-black uppercase outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-500">PIN / Password</label>
                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500" size={20} />
                  <input
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="Password"
                    type={showPin ? "text" : "password"}
                    inputMode="numeric"
                    className="min-h-[58px] w-full rounded-[1.35rem] border border-cyan-100 bg-white/80 py-4 pl-12 pr-12 text-base font-black outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                  />
                  <button type="button" onClick={() => setShowPin(!showPin)} className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-2xl bg-slate-100 text-slate-500">
                    {showPin ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>
              <button
                disabled={syncing}
                className="relative flex min-h-[58px] w-full items-center justify-center gap-2 overflow-hidden rounded-[1.35rem] bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 px-5 py-4 text-sm font-black uppercase tracking-wide text-white shadow-xl shadow-blue-300/40 transition hover:shadow-fuchsia-300/40 disabled:opacity-60"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 opacity-60" />
                {syncing ? <Loader2 className="relative z-10 animate-spin" size={18} /> : <LogIn className="relative z-10" size={18} />}
                <span className="relative z-10">Masuk Aplikasi</span>
              </button>
              <button type="button" onClick={() => setForgotMode(true)} className="w-full rounded-2xl py-3 text-sm font-black text-violet-600 hover:bg-violet-50">
                Lupa PIN? Kirim permintaan ke HRD
              </button>
            </form>
          ) : (
            <form
              className="relative z-10 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                onForgotPin(id, forgotText);
                setForgotMode(false);
                setForgotText("");
              }}
            >
              <button type="button" onClick={() => setForgotMode(false)} className="text-sm font-black text-slate-500 hover:text-slate-800">
                ← Kembali ke login
              </button>
              <FormInput label="ID Karyawan" value={id} onChange={(value) => setId(value.toUpperCase().replaceAll(" ", ""))} placeholder="ID Karyawan" />
              <textarea
                value={forgotText}
                onChange={(e) => setForgotText(e.target.value)}
                placeholder="Contoh: Saya lupa PIN login, mohon bantuan admin."
                className="min-h-28 w-full resize-none rounded-[1.35rem] border border-violet-100 bg-white/80 px-4 py-4 text-sm font-semibold outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
              />
              <button className="flex w-full items-center justify-center gap-2 rounded-[1.35rem] bg-gradient-to-r from-slate-900 via-violet-900 to-fuchsia-700 px-5 py-4 text-sm font-black uppercase tracking-wide text-white shadow-xl shadow-violet-200 transition active:scale-[0.98]">
                <Send size={18} /> Kirim Permintaan
              </button>
            </form>
          )}
        </div>

        <div className="mt-5 rounded-[1.5rem] bg-white/12 p-4 text-center text-xs font-bold text-white/70 ring-1 ring-white/20 backdrop-blur">
          PT. Karsa Sentana Lumbung Sentosa. 2026
        </div>
      </div>
    </div>
  );
}

function Avatar({ src, name, size = "md" }) {
  const dim = size === "lg" ? "h-20 w-20" : size === "sm" ? "h-10 w-10" : "h-12 w-12";
  const text = String(name || "Karyawan").trim().charAt(0).toUpperCase() || "K";
  return (
    <div className={cx("grid shrink-0 place-items-center overflow-hidden rounded-full bg-blue-100 text-blue-700 ring-1 ring-blue-100", dim)}>
      {src ? <img src={src} alt="Profil" className="h-full w-full object-cover" /> : <span className="text-lg font-black">{text}</span>}
    </div>
  );
}

function AppHeader({ currentUser, onRefresh, syncing, onLogout, serverTimeOffsetMs, unreadMessageCount = 0, unreadNotificationCount = 0, onOpenMessages, onOpenNotifications }) {
  const [now, setNow] = useState(new Date());
  const [isOnline, setIsOnline] = useState(() => navigator.onLine !== false);
  const [weather, setWeather] = useState({ ok: false, temperature: null, label: "Memuat cuaca", kind: "partly", location: getVal(currentUser, "penempatan") || "Lokasi saat ini" });

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const updateOnline = () => setIsOnline(navigator.onLine !== false);
    window.addEventListener("online", updateOnline);
    window.addEventListener("offline", updateOnline);
    return () => {
      window.removeEventListener("online", updateOnline);
      window.removeEventListener("offline", updateOnline);
    };
  }, []);

  useEffect(() => {
    let active = true;
    const fallback = getVal(currentUser, "penempatan") || "Lokasi saat ini";
    const loadWeather = async () => {
      const result = await fetchWeatherSnapshot(fallback);
      if (active) setWeather(result);
    };
    loadWeather();
    const weatherTimer = setInterval(loadWeather, WEATHER_REFRESH_MS);
    return () => {
      active = false;
      clearInterval(weatherTimer);
    };
  }, [currentUser]);

  const role = detectRole(currentUser);
  const theme = getRoleTheme(role);
  const RoleIcon = getRoleIcon(role);
  const serverDate = getServerDate(serverTimeOffsetMs);
  const parts = nowParts(serverDate);
  const hour = serverDate.getHours();
  const greeting = hour < 11 ? "Selamat Pagi" : hour < 15 ? "Selamat Siang" : hour < 18 ? "Selamat Sore" : "Selamat Malam";
  const clock = getClockIntegrity(serverTimeOffsetMs);
  const fullName = String(getVal(currentUser, "name") || getVal(currentUser, "nama") || "Karyawan").trim();
  const headerProfilePhoto = getProfilePhoto(currentUser);
  const placement = getVal(currentUser, "penempatan") || getVal(currentUser, "site") || "-";
  const job = getVal(currentUser, "pekerjaan") || getVal(currentUser, "divisi") || role;
  const WeatherIcon = getWeatherIcon(weather.kind);
  const connectionOk = isOnline && !syncing && clock.ok;
  const gpsLocationLabel = cleanLocationLabel(weather.location || placement || getVal(currentUser, "penempatan") || "Lokasi saat ini", "Lokasi saat ini");

  return (
    <div className="shrink-0 bg-[#f8fbff] px-3 pb-3 pt-[calc(env(safe-area-inset-top)+0.75rem)] sm:px-5">
      <div className="mx-auto max-w-5xl">
        {/* MODE PORTRAIT / MOBILE DIKUNCI KHUSUS */}
        <div className={cx("relative min-h-[168px] overflow-hidden rounded-[1.65rem] bg-gradient-to-br px-3 pb-2.5 pt-2.5 text-white shadow-xl md:hidden", theme.gradient, theme.glow)}>
          <div className="pointer-events-none absolute -right-12 -top-14 h-40 w-40 rounded-full bg-white/20 blur-xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute left-16 top-[68px] h-14 w-64 rounded-[100%] bg-white/10" />

          <div className="absolute right-3 top-3 z-20 flex items-center justify-end gap-1.5">
            <span className={cx("h-1.5 w-1.5 rounded-full", connectionOk ? "animate-pulse bg-emerald-300 shadow-[0_0_9px_rgba(110,231,183,0.95)]" : "animate-pulse bg-red-400 shadow-[0_0_9px_rgba(248,113,113,0.95)]")} title={connectionOk ? "Terkoneksi" : "Diskonek / sinkron tertunda"} />
            <button onClick={onOpenNotifications} className="relative grid h-7 w-7 place-items-center rounded-full bg-white/13 text-white ring-1 ring-white/18 backdrop-blur active:scale-95" title="Notifikasi">
              <Bell size={13} />
              {unreadNotificationCount > 0 && <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-amber-400 px-1 text-[8px] font-black text-slate-950 ring-2 ring-white/35">{unreadNotificationCount > 9 ? "9+" : unreadNotificationCount}</span>}
            </button>
            <button onClick={onOpenMessages} className="relative grid h-7 w-7 place-items-center rounded-full bg-white/13 text-white ring-1 ring-white/18 backdrop-blur active:scale-95" title="Pesan Masuk Admin">
              <MessageSquare size={13} />
              {unreadMessageCount > 0 && <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-red-500 px-1 text-[8px] font-black text-white ring-2 ring-white/35">{unreadMessageCount > 9 ? "9+" : unreadMessageCount}</span>}
            </button>
            <button onClick={onLogout} className="grid h-7 w-7 place-items-center rounded-full bg-white/13 text-white ring-1 ring-white/18 backdrop-blur active:scale-95" title="Keluar akun">
              <LogOut size={13} />
            </button>
          </div>

          <div className="relative z-10 space-y-2">
            <div className="h-[36px]" />

            <div className="px-2 py-1.5">
              <div className="grid grid-cols-[1fr_auto] gap-3">
                <div className="min-w-0 text-left">
                  <div className="flex min-h-[52px] flex-col justify-between">
                    <h2 className="whitespace-nowrap text-[24px] font-black leading-[1.02] text-white drop-shadow-sm">
                      {greeting}
                    </h2>
                    <p className="truncate text-[16px] font-extrabold leading-tight text-white/95">
                      {fullName}
                    </p>
                  </div>
                  <p className="mt-1.5 truncate text-[12.5px] font-bold leading-tight text-white/90">{parts.fullDate}</p>
                </div>

                <div className="flex min-h-[52px] shrink-0 flex-col justify-between text-right">
                  <div className="font-mono text-[34px] font-black leading-[1.02] tracking-[0.02em] text-white drop-shadow [font-variant-numeric:tabular-nums]">
                    {parts.time.slice(0, 5)}
                  </div>
                  <div className="h-[16px]" />
                </div>
              </div>

              <div className="mt-3 grid grid-cols-[1fr_auto] items-end gap-2">
                <div className="flex min-w-0 flex-nowrap items-center gap-1.5 overflow-hidden">
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white/18 px-2 py-1 text-[10px] font-black text-white ring-1 ring-white/20 backdrop-blur"><RoleIcon size={12} /> {role}</span>
                  <span className="inline-flex min-w-0 max-w-[68px] items-center gap-1 rounded-full bg-white/18 px-2 py-1 text-[10px] font-black text-white ring-1 ring-white/20 backdrop-blur"><Briefcase size={11} /> <span className="truncate">{job}</span></span>
                  <span className="inline-flex min-w-0 max-w-[76px] items-center gap-1 rounded-full bg-white/18 px-2 py-1 text-[10px] font-black text-white ring-1 ring-white/20 backdrop-blur"><MapPin size={11} /> <span className="truncate">{placement}</span></span>
                </div>

                <div className="flex shrink-0 items-center justify-end gap-2 text-right text-white">
                  <div className="min-w-0">
                    <p className="text-[16px] font-black leading-none tracking-wide text-white">{weather.temperature !== null ? `${weather.temperature}°C` : "--°C"}</p>
                    <p className="mt-0.5 max-w-[112px] truncate text-[10.5px] font-bold leading-tight text-white/75">{weather.label}</p>
                  </div>
                  <WeatherIcon size={23} className="shrink-0 text-white drop-shadow-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MODE LANDSCAPE / TABLET / DESKTOP */}
        <div className={cx("relative mt-0 hidden h-[176px] min-h-[176px] max-h-[176px] overflow-hidden rounded-[1.9rem] bg-gradient-to-br px-6 py-5 text-white shadow-xl md:block", theme.gradient, theme.glow)}>
          <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/20 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute left-40 top-[76px] h-16 w-[420px] rounded-[100%] bg-white/10" />

          <div className="absolute right-5 top-5 z-20 flex items-center justify-end gap-2">
            <span className={cx("h-2 w-2 rounded-full", connectionOk ? "animate-pulse bg-emerald-300 shadow-[0_0_9px_rgba(110,231,183,0.95)]" : "animate-pulse bg-red-400 shadow-[0_0_9px_rgba(248,113,113,0.95)]")} title={connectionOk ? "Terkoneksi" : "Diskonek / sinkron tertunda"} />
            <button onClick={onOpenNotifications} className="relative grid h-9 w-9 place-items-center rounded-full bg-white/13 text-white ring-1 ring-white/18 backdrop-blur active:scale-95" title="Notifikasi">
              <Bell size={16} />
              {unreadNotificationCount > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-amber-400 px-1 text-[9px] font-black text-slate-950 ring-2 ring-white/35">{unreadNotificationCount > 9 ? "9+" : unreadNotificationCount}</span>}
            </button>
            <button onClick={onOpenMessages} className="relative grid h-9 w-9 place-items-center rounded-full bg-white/13 text-white ring-1 ring-white/18 backdrop-blur active:scale-95" title="Pesan Masuk Admin">
              <MessageSquare size={16} />
              {unreadMessageCount > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-red-500 px-1 text-[9px] font-black text-white ring-2 ring-white/35">{unreadMessageCount > 9 ? "9+" : unreadMessageCount}</span>}
            </button>
            <button onClick={onLogout} className="grid h-9 w-9 place-items-center rounded-full bg-white/13 text-white ring-1 ring-white/18 backdrop-blur active:scale-95" title="Keluar akun">
              <LogOut size={16} />
            </button>
          </div>

          <div className="relative z-10 h-[136px] min-h-[136px] max-h-[136px] pr-[190px]">
            <div className="absolute left-0 top-[2px] h-[120px] w-[120px] overflow-visible">
              <div className="absolute inset-0 grid place-items-center">
                {headerProfilePhoto ? (
                  <img src={headerProfilePhoto} alt="Foto Profil" className="h-[88px] w-[88px] rounded-full object-cover shadow-lg ring-4 ring-white/35" />
                ) : (
                  <div className="relative h-[88px] w-[88px] overflow-hidden rounded-full bg-gradient-to-br from-rose-400 via-red-500 to-slate-950 shadow-lg ring-4 ring-white/35">
                    <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-rose-300 to-red-500" />
                    <div className="absolute left-0 top-[38px] h-[58px] w-[72px] rotate-[-18deg] rounded-[45%] bg-slate-950" />
                    <div className="absolute right-[-12px] top-[46px] h-[58px] w-[78px] rotate-[22deg] rounded-[45%] bg-slate-900" />
                    <div className="absolute bottom-0 left-0 right-0 h-[34px] bg-slate-950" />
                    <div className="absolute left-[28px] top-[40px] h-1 w-1 rounded-full bg-slate-950/40" />
                    <div className="absolute left-[38px] top-[39px] h-1 w-1 rounded-full bg-slate-950/40" />
                    <div className="absolute left-[48px] top-[40px] h-1 w-1 rounded-full bg-slate-950/40" />
                  </div>
                )}
              </div>
            </div>

            <div className="min-w-0 pl-[144px]">
              <h2 className="whitespace-nowrap text-[34px] font-black leading-[1.02] text-white drop-shadow-sm">
                {greeting}
              </h2>
              <p className="mt-1 truncate text-[20px] font-extrabold leading-tight text-white/95">
                {fullName}
              </p>
              <p className="mt-2 truncate text-[14px] font-bold leading-tight text-white/90">{parts.fullDate}</p>

              <div className="mt-4 flex min-w-0 flex-nowrap items-center gap-2 overflow-hidden">
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/18 px-3 py-1.5 text-[11px] font-black text-white ring-1 ring-white/20 backdrop-blur"><RoleIcon size={13} /> {role}</span>
                <span className="inline-flex min-w-0 max-w-[140px] items-center gap-1.5 rounded-full bg-white/18 px-3 py-1.5 text-[11px] font-black text-white ring-1 ring-white/20 backdrop-blur"><Briefcase size={12} /> <span className="truncate">{job}</span></span>
                <span className="inline-flex min-w-0 max-w-[160px] items-center gap-1.5 rounded-full bg-white/18 px-3 py-1.5 text-[11px] font-black text-white ring-1 ring-white/20 backdrop-blur"><MapPin size={12} /> <span className="truncate">{placement}</span></span>
              </div>
            </div>

            <div className="absolute right-6 top-[54px] flex w-[178px] shrink-0 flex-col items-end text-right">
              <div className="font-mono text-[44px] font-black leading-[1.02] tracking-[0.02em] text-white drop-shadow [font-variant-numeric:tabular-nums]">
                {parts.time.slice(0, 5)}
              </div>
              <div className="mt-3 flex w-full items-center justify-end gap-2.5 text-right text-white">
                <div className="min-w-0 text-right">
                  <p className="text-[23px] font-black leading-none tracking-wide text-white">{weather.temperature !== null ? `${weather.temperature}°C` : "--°C"}</p>
                  <p className="mt-1 max-w-[130px] truncate text-[13px] font-bold leading-tight text-white/80">{weather.label}</p>
                </div>
                <WeatherIcon size={31} className="shrink-0 text-white drop-shadow-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LeftTool({ screen, setScreen, currentUser, onRefresh, syncing, onLogout }) {
  const role = detectRole(currentUser);
  const RoleIcon = getRoleIcon(role);
  const navItems = [
    { id: "home", label: "Beranda", icon: Home },
    { id: "history", label: "Riwayat", icon: Clock3 },
    { id: "calendar", label: "Kalender", icon: Coffee },
    { id: "report", label: "Laporan", icon: FileText },
    { id: "profile", label: "Akun", icon: UserCircle2 },
  ];

  return (
    <aside className="hidden">
      <img src={COMPANY_LOGO_URL} alt="Logo" className="h-14 w-14 object-contain" />

      <div className="mt-5 flex w-full flex-1 flex-col items-center gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = screen === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setScreen(item.id)}
              title={item.label}
              className={cx(
                "group flex w-full flex-col items-center justify-center gap-1 rounded-2xl px-2 py-3 text-[10px] font-black transition active:scale-95",
                active ? "bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100" : "text-slate-400 hover:bg-slate-50 hover:text-slate-700"
              )}
            >
              <Icon size={21} strokeWidth={active ? 2.8 : 2.2} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="w-full space-y-2">
        <div className="flex flex-col items-center rounded-2xl bg-slate-50 px-2 py-3 text-center ring-1 ring-slate-100">
          <Avatar src={getProfilePhoto(currentUser)} name={getVal(currentUser, "name")} size="sm" />
          <RoleIcon className="mt-2 text-blue-600" size={16} />
          <p className="mt-1 w-full truncate text-[10px] font-black text-slate-600">{role}</p>
        </div>
        <button onClick={onRefresh} className="grid h-11 w-full place-items-center rounded-2xl bg-slate-50 text-slate-600 ring-1 ring-slate-100 active:scale-95" title="Sinkronkan data">
          <RefreshCcw size={18} className={syncing ? "animate-spin" : ""} />
        </button>
        <button onClick={onLogout} className="grid h-11 w-full place-items-center rounded-2xl bg-red-50 text-red-500 ring-1 ring-red-100 active:scale-95" title="Keluar akun">
          <LogOut size={18} />
        </button>
      </div>
    </aside>
  );
}

function BottomNav({ screen, setScreen, onQuickAttendance, quickAction, currentUser }) {
  const tabs = [
    { id: "home", label: "Beranda", icon: Home, tone: "blue" },
    { id: "history", label: "Riwayat", icon: Clock3, tone: "violet" },
    { id: "quick", label: "Absen", icon: Camera, tone: "amber", special: true },
    { id: "report", label: "Laporan", icon: FileText, tone: "emerald" },
    { id: "profile", label: "Akun", icon: UserCircle2, tone: "red" },
  ];

  return (
    <div className="shrink-0 bg-white/70 px-3 pb-[calc(env(safe-area-inset-bottom)+0.65rem)] pt-2 shadow-[0_-18px_38px_-28px_rgba(99,102,241,0.55)] backdrop-blur-2xl">
      <div className="mx-auto grid max-w-md grid-cols-5 gap-1 rounded-[1.9rem] border border-white/70 bg-white/75 p-1.5 shadow-2xl shadow-blue-100/60 ring-1 ring-slate-100 md:max-w-5xl">
        {tabs.map((tab) => {
          const active = screen === tab.id;
          if (tab.special) {
            return (
              <button
                key={tab.id}
                type="button"
                onClick={onQuickAttendance}
                disabled={!quickAction}
                title={quickAction ? quickAction.action : "Absensi cepat belum tersedia"}
                className="relative -mt-8 flex min-h-[82px] flex-col items-center justify-start gap-1 text-[10px] font-black text-orange-700 transition disabled:opacity-50"
              >
                <span className="absolute top-0 h-16 w-16 rounded-[1.7rem] bg-gradient-to-br from-yellow-300 via-orange-500 to-pink-600 blur-xl opacity-45" />
                <AppIcon icon={Camera} size="xl" tone="amber" active className="relative ring-4 ring-white" />
                <span className="mt-1">Absen</span>
              </button>
            );
          }
          return (
            <button key={tab.id} onClick={() => setScreen(tab.id)} className={cx("group relative flex min-h-[58px] flex-col items-center justify-center gap-1 rounded-[1.4rem] text-[10px] font-black transition", active ? "bg-gradient-to-br from-white to-blue-50 text-blue-700 shadow-lg shadow-blue-100 ring-1 ring-blue-100" : "text-slate-400 hover:bg-white/80 hover:text-slate-700")}>
              {active && <span className="absolute top-1 h-1 w-5 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500" />}
              <AppIcon icon={tab.icon} size="sm" tone={tab.tone} active={active} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function HomeStat({ label, value, icon: Icon, subtitle }) {
  return (
    <div className="flex min-h-[92px] flex-col items-center justify-center rounded-[1.35rem] bg-white p-3 text-center shadow-sm ring-1 ring-slate-100 sm:min-h-[104px]">
      <AppIcon icon={Icon} size="sm" tone="blue" className="mx-auto mb-2" />
      <p className="text-base font-black leading-tight text-slate-950">{value}</p>
      <p className="mt-0.5 text-[10px] font-black leading-tight text-slate-400">{label}</p>
      {subtitle && <p className="mt-0.5 text-[9px] font-bold leading-tight text-slate-300">{subtitle}</p>}
    </div>
  );
}

function HomeSection({ title, action, onAction, children }) {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-lg font-black text-slate-950">{title}</h3>
        {action && <button onClick={onAction} className="text-xs font-black text-blue-600">{action}</button>}
      </div>
      {children}
    </section>
  );
}

function AppTile({ icon: Icon, title, subtitle, tone = "blue", disabled, onClick, selected = false, badge = "", helper = "" }) {
  const iconTone = ["blue", "emerald", "amber", "red", "violet", "slate"].includes(tone) ? tone : getIconTone(title);
  const theme = {
    blue: {
      card: "from-sky-50 via-white to-blue-50 border-blue-100 hover:border-blue-300 hover:shadow-blue-200/70",
      selected: "from-cyan-100 via-white to-blue-100 border-blue-400 ring-blue-200 shadow-blue-200/80",
      glow: "bg-blue-400",
      strip: "from-cyan-400 via-blue-500 to-indigo-600",
      badge: "bg-blue-600 text-white",
      helper: "text-blue-700",
    },
    emerald: {
      card: "from-emerald-50 via-white to-lime-50 border-emerald-100 hover:border-emerald-300 hover:shadow-emerald-200/70",
      selected: "from-lime-100 via-white to-emerald-100 border-emerald-400 ring-emerald-200 shadow-emerald-200/80",
      glow: "bg-emerald-400",
      strip: "from-lime-300 via-emerald-500 to-teal-600",
      badge: "bg-emerald-600 text-white",
      helper: "text-emerald-700",
    },
    amber: {
      card: "from-yellow-50 via-white to-orange-50 border-orange-100 hover:border-orange-300 hover:shadow-orange-200/70",
      selected: "from-yellow-100 via-white to-orange-100 border-orange-400 ring-orange-200 shadow-orange-200/80",
      glow: "bg-orange-400",
      strip: "from-yellow-300 via-orange-500 to-pink-500",
      badge: "bg-orange-500 text-white",
      helper: "text-orange-700",
    },
    red: {
      card: "from-rose-50 via-white to-red-50 border-rose-100 hover:border-rose-300 hover:shadow-rose-200/70",
      selected: "from-rose-100 via-white to-red-100 border-rose-400 ring-rose-200 shadow-rose-200/80",
      glow: "bg-rose-400",
      strip: "from-pink-400 via-rose-500 to-red-600",
      badge: "bg-rose-600 text-white",
      helper: "text-rose-700",
    },
    violet: {
      card: "from-fuchsia-50 via-white to-violet-50 border-violet-100 hover:border-violet-300 hover:shadow-violet-200/70",
      selected: "from-fuchsia-100 via-white to-violet-100 border-violet-400 ring-violet-200 shadow-violet-200/80",
      glow: "bg-violet-400",
      strip: "from-fuchsia-400 via-violet-600 to-indigo-700",
      badge: "bg-violet-600 text-white",
      helper: "text-violet-700",
    },
    slate: {
      card: "from-slate-50 via-white to-slate-100 border-slate-100 hover:border-slate-300 hover:shadow-slate-200/80",
      selected: "from-slate-100 via-white to-slate-200 border-slate-400 ring-slate-200 shadow-slate-200/80",
      glow: "bg-slate-400",
      strip: "from-slate-400 via-slate-600 to-slate-900",
      badge: "bg-slate-700 text-white",
      helper: "text-slate-600",
    },
  }[iconTone] || {};

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cx(
        "group relative flex min-h-[122px] flex-col justify-between overflow-hidden rounded-[1.85rem] border bg-gradient-to-br p-4 text-left shadow-sm ring-1 ring-white/80 transition duration-300 sm:min-h-[136px]",
        selected ? `${theme.selected} shadow-2xl ring-4` : `${theme.card} hover:-translate-y-1 hover:scale-[1.015] hover:shadow-2xl`,
        disabled && "opacity-45 grayscale-[0.25] hover:translate-y-0 hover:scale-100"
      )}
    >
      <span className={cx("pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-20 blur-2xl", theme.glow)} />
      <span className={cx("pointer-events-none absolute inset-x-5 top-3 h-1 rounded-full bg-gradient-to-r opacity-70", theme.strip)} />
      <span className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/70 to-transparent" />
      <span className="pointer-events-none absolute bottom-3 right-3 text-[42px] font-black leading-none text-slate-900/[0.03]">#</span>

      <div className="relative z-10 flex items-start justify-between gap-2 pt-3">
        <AppIcon icon={Icon} size={selected ? "lg" : "md"} tone={iconTone} active={selected} />
        {selected ? (
          <span className={cx("rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-wide shadow-sm", theme.badge)}>Dipilih</span>
        ) : badge ? (
          <span className="rounded-full bg-white/85 px-2.5 py-1 text-[9px] font-black uppercase tracking-wide text-slate-500 shadow-sm ring-1 ring-slate-100">{badge}</span>
        ) : null}
      </div>

      <div className="relative z-10 mt-4 min-w-0">
        <p className="line-clamp-2 text-[14px] font-black leading-tight text-slate-950 sm:text-[15px]">{title}</p>
        {subtitle && <p className={cx("mt-1.5 line-clamp-2 text-[10.5px] font-bold sm:text-[11px]", selected ? "text-slate-700" : "text-slate-500")}>{subtitle}</p>}
        {helper && <p className={cx("mt-2 line-clamp-2 text-[9px] font-black uppercase tracking-wide", selected ? theme.helper : "text-slate-300")}>{helper}</p>}
      </div>
    </button>
  );
}

function ActivityOverview({ todayRecords, todayLeave, latestReports, leaveStats, theme }) {
  return (
    <div className="karsa-genz-panel rounded-[2.1rem] p-3">
      <div className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-cyan-300/30 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-14 -left-10 h-36 w-36 rounded-full bg-fuchsia-300/25 blur-2xl" />
      <div className="relative z-10 mb-3 flex items-center justify-between gap-3 px-1">
        <div>
          <p className="bg-gradient-to-r from-cyan-600 via-blue-600 to-fuchsia-600 bg-clip-text text-[10px] font-black uppercase tracking-[0.18em] text-transparent">Ringkasan Hari Ini</p>
          <h3 className="text-xl font-black text-slate-950">Aktivitas</h3>
        </div>
        <span className="rounded-full bg-gradient-to-r from-lime-100 to-cyan-100 px-3 py-1 text-[10px] font-black text-emerald-700 ring-1 ring-emerald-100">Live</span>
      </div>
      <div className="relative z-10 grid grid-cols-4 gap-2">
        <MiniSummary label="Absen" value={todayRecords.length} icon={Clock3} tone="blue" />
        <MiniSummary label="Kuota Cuti" value={`${leaveStats.remaining}/${leaveStats.limit}`} icon={Coffee} tone="violet" />
        <MiniSummary label="Izin" value={todayLeave ? "Ada" : "-"} icon={FileCheck2} tone="amber" />
        <MiniSummary label="Laporan" value={latestReports.length} icon={FileText} tone="emerald" />
      </div>
    </div>
  );
}

function HomeScreen({ currentUser, attendance, leaves, reports, onStartAction, setScreen, onSaveLeave, serverTimeOffsetMs }) {
  const [selectedLeaveType, setSelectedLeaveType] = useState(null);
  const role = detectRole(currentUser);
  const theme = getRoleTheme(role);
  const serverDate = getServerDate(serverTimeOffsetMs);
  const todayParts = nowParts(serverDate);
  const todayIso = dateOnlyISO(serverDate);
  const userId = String(getVal(currentUser, "id") || getVal(currentUser, "userId") || getVal(currentUser, "idKaryawan") || "").toUpperCase();

  const normalizeHomeDate = (value) => {
    const raw = String(value || "").replace(/^'/, "").trim();
    if (!raw) return "";
    if (/^[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(raw)) return raw.slice(0, 10);
    const ms = parseDateToMillis(raw);
    return ms ? dateOnlyISO(new Date(ms)) : raw;
  };

  const todayRecords = safeArray(attendance).filter((row) => {
    const rowUser = String(getVal(row, "userId") || getVal(row, "idKaryawan") || getVal(row, "employeeId") || "").toUpperCase();
    const rowDate = normalizeHomeDate(getVal(row, "date") || getVal(row, "tanggal"));
    return rowUser === userId && (rowDate === todayIso || formatDateIndo(rowDate) === todayParts.dateOnly);
  });

  const todayLeave = getApprovedLeaveForDate(leaves, currentUser, serverDate);
  const leaveStats = getLeaveQuotaStats(leaves, currentUser, serverDate.getFullYear());
  const latestReports = safeArray(reports)
    .filter((row) => String(getVal(row, "userId") || getVal(row, "idKaryawan") || getVal(row, "employeeId") || "").toUpperCase() === userId)
    .sort((a, b) => Number(getVal(b, "timestamp") || parseDateToMillis(getVal(b, "date") || getVal(b, "tanggal")) || 0) - Number(getVal(a, "timestamp") || parseDateToMillis(getVal(a, "date") || getVal(a, "tanggal")) || 0))
    .slice(0, 2);

  const activeShift = (() => {
    const shiftRows = SHIFT_CONFIG[role] || [];
    return shiftRows.find((shift) => todayRecords.some((row) => normalizeText(getAttendanceActionKey(row)) === normalizeText(shift.start)));
  })();

  const menuItems = buildAttendanceMenu(role, todayRecords).map((item) => {
    if (todayLeave) return { ...item, disabled: true, statusText: "Terkunci: cuti disetujui" };
    return item;
  });

  return (
    <div className="karsa-genz-shell px-4 py-4 pb-28 sm:p-5 sm:pb-28">
      <div className="mx-auto max-w-5xl space-y-5">
        <ActivityOverview todayRecords={todayRecords} todayLeave={todayLeave} latestReports={latestReports} leaveStats={leaveStats} theme={theme} />
        {(activeShift || todayLeave) && (
          <div className="grid gap-2">
            {activeShift && !todayLeave && <MiniNotice icon={Clock3} title={activeShift.label} value="Aktif" />}
            {todayLeave && <MiniNotice icon={Coffee} title={`Cuti Aktif: ${getVal(todayLeave, "type") || "Cuti"}`} value="Absensi terkunci" />}
          </div>
        )}

        <HomeSection title="Menu Utama">
          <div className="karsa-genz-panel rounded-[2.2rem] p-3">
            <div className="relative z-10 grid grid-cols-2 gap-2.5 md:grid-cols-3 xl:grid-cols-4">
              {menuItems.map((item) => {
                const style = ACTION_STYLE[item.action] || ACTION_STYLE["Absen Masuk"];
                const statusText = normalizeText(item.statusText);
                const isDone = statusText.includes("sudah") || statusText.includes("tercatat");
                const isLocked = item.disabled && !isDone;
                const Icon = isDone ? CheckCircle2 : isLocked ? X : style.icon;
                return (
                  <AppTile
                    key={item.action}
                    disabled={item.disabled}
                    onClick={() => onStartAction(item.action)}
                    icon={Icon}
                    title={item.action}
                    subtitle={item.statusText}
                    tone={getIconTone(item.action)}
                  />
                );
              })}
              {LEAVE_QUICK_OPTIONS.map((item) => {
                const info = getLeaveTypeInfo(item);
                const Icon = getLeaveIcon(item);
                const isAnnual = isAnnualLeaveType(item);
                const disabled = isAnnual && leaveStats.remaining <= 0;
                const isSelected = selectedLeaveType === item;
                const title = item.replace(" (Keperluan Pribadi)", "").replace(" (Wajib Surat Dokter)", "");
                return (
                  <AppTile
                    key={`leave-${item}`}
                    disabled={disabled}
                    selected={isSelected}
                    badge={info.shortLabel}
                    helper={isSelected ? info.selectedText : info.helper}
                    onClick={() => setSelectedLeaveType(item)}
                    icon={Icon}
                    title={title}
                    subtitle={disabled ? "Kuota cuti habis" : isAnnual ? `Sisa kuota ${leaveStats.remaining} dari ${leaveStats.limit}` : info.helper}
                    tone={getIconTone(item)}
                  />
                );
              })}
            </div>
          </div>
        </HomeSection>

        <DashboardLeaveCard currentUser={currentUser} leaves={leaves} onSaveLeave={onSaveLeave} serverTimeOffsetMs={serverTimeOffsetMs} selectedType={selectedLeaveType} onClose={() => setSelectedLeaveType(null)} />

        <div className="grid gap-4 md:grid-cols-2">
          <QuickPanel title="Riwayat" action="Lihat" onAction={() => setScreen("history")}>
            {todayRecords.length === 0 ? (
              <EmptySmall text="Belum ada absensi hari ini." />
            ) : (
              todayRecords.slice(-3).reverse().map((r, index) => (
                <MiniRow key={getVal(r, "id") || getVal(r, "requestId") || index} title={getActivityDisplayTitle(r)} subtitle={`${getActivityDisplayTime(r)} • ${getVal(r, "latenessStatus") || getVal(r, "status") || "Tercatat"}`} />
              ))
            )}
          </QuickPanel>
          <QuickPanel title="Laporan" action="Buat" onAction={() => setScreen("report")}>
            {latestReports.length === 0 ? (
              <EmptySmall text="Belum ada laporan." />
            ) : (
              latestReports.map((r, index) => (
                <MiniRow key={getVal(r, "id") || index} title={getVal(r, "judul") || getVal(r, "title") || getVal(r, "text") || "Laporan"} subtitle={`${formatDateIndo(getVal(r, "date") || getVal(r, "tanggal"))} • ${getVal(r, "status") || "Terkirim"}`} />
              ))
            )}
          </QuickPanel>
        </div>
      </div>
    </div>
  );
}

function MiniNotice({ icon: Icon, title, value }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-100">
      <div className="flex min-w-0 items-center gap-3">
        <AppIcon icon={Icon} size="sm" tone="blue" />
        <p className="truncate text-sm font-black text-slate-800">{title}</p>
      </div>
      <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black text-slate-600">{value}</span>
    </div>
  );
}

function DashboardLeaveCard({ currentUser, leaves, onSaveLeave, serverTimeOffsetMs, selectedType, onClose }) {
  const sectionRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [type, setType] = useState(selectedType || LEAVE_OPTIONS[0]);
  const [shortPermissionKind, setShortPermissionKind] = useState("Izin Telat");
  const [shortPermissionMinutes, setShortPermissionMinutes] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [reason, setReason] = useState("");
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const serverDate = getServerDate(serverTimeOffsetMs);
  const quotaStats = getLeaveQuotaStats(leaves, currentUser, serverDate.getFullYear());
  const previewStart = parseInputDate(start);
  const previewEnd = parseInputDate(end || start);
  const previewCoffee = previewStart && previewEnd ? diffDaysInclusive(previewStart, previewEnd) : 0;
  const previewWorkdays = previewStart && previewEnd ? countWorkdays(previewStart, previewEnd) : 0;
  const attachmentRequired = requiresLeaveAttachment(type);
  const shortPermissionActive = isShortPermissionType(type);
  const maternityLeaveActive = isMaternityLeaveType(type);
  const activeTheme = getLeaveVisualTheme(type);
  const activeTone = getIconTone(type);

  useEffect(() => {
    if (selectedType) {
      setType(selectedType);
      setExpanded(true);
      setError("");
      setFile(null);
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    }
  }, [selectedType]);

  useEffect(() => {
    if (!attachmentRequired && file) setFile(null);
  }, [attachmentRequired, file]);

  useEffect(() => {
    if (!shortPermissionActive) {
      setShortPermissionKind("Izin Telat");
      setShortPermissionMinutes("");
    }
  }, [shortPermissionActive]);

  useEffect(() => {
    if (!maternityLeaveActive) return;
    if (!start) {
      if (end) setEnd("");
      return;
    }
    const autoEnd = getMaternityLeaveEndISO(start);
    if (autoEnd && end !== autoEnd) setEnd(autoEnd);
  }, [maternityLeaveActive, start, end]);

  const handleStartChange = (value) => {
    setStart(value);
    if (isMaternityLeaveType(type)) setEnd(getMaternityLeaveEndISO(value));
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (shortPermissionActive && !shortPermissionKind) {
      setError("Pilih dulu jenisnya: Izin Telat atau Pulang Cepat.");
      return;
    }

    if (shortPermissionActive && (!shortPermissionMinutes || Number(shortPermissionMinutes) <= 0)) {
      setError("Estimasi menit wajib diisi, contoh: 15 atau 30 menit.");
      return;
    }

    const finalType = shortPermissionActive ? shortPermissionKind : type;
    const validation = validateLeaveRequest({ type: finalType, start, end, leaves, currentUser, hasAttachment: Boolean(file) });

    if (!validation.ok) {
      setError(validation.message);
      return;
    }

    setSaving(true);
    const parts = nowParts(getServerDate(serverTimeOffsetMs));
    const employeeId = String(getVal(currentUser, "id") || getVal(currentUser, "userId") || getVal(currentUser, "idKaryawan") || "").toUpperCase();
    const dateIso = dateOnlyISO(getServerDate(serverTimeOffsetMs)) || "";
    const timeText = String(parts.time || "").split(".").join(":");
    const photo = attachmentRequired ? await fileToBase64(file) : "";
    const range = validation.dateEnd && validation.dateEnd !== validation.dateStart ? `${validation.dateStart} s/d ${validation.dateEnd}` : validation.dateStart;

    try {
      await onSaveLeave({
        action: "cuti",
        id: `CUTI-${employeeId}-${Date.now()}`,
        userId: employeeId,
        idKaryawan: employeeId,
        employeeId,
        name: getVal(currentUser, "name") || getVal(currentUser, "nama"),
        nama: getVal(currentUser, "name") || getVal(currentUser, "nama"),
        role: detectRole(currentUser),
        penempatan: getVal(currentUser, "penempatan"),
        type: finalType,
        parentType: type,
        requestCategory: shortPermissionActive ? (shortPermissionKind === "Izin Telat" ? "IZIN_TELAT" : "PULANG_CEPAT") : validation.category,
        leaveGroup: validation.category,
        maternityLeave: validation.isMaternityLeave || false,
        maternityLeaveMonths: validation.maternityLeaveMonths || "",
        maternityAutoStart: validation.isMaternityLeave ? validation.dateStart : "",
        maternityAutoEnd: validation.isMaternityLeave ? validation.dateEnd : "",
        maternityPolicyVersion: validation.isMaternityLeave ? MATERNITY_LEAVE_POLICY_VERSION : "",
        izinJamType: shortPermissionActive ? shortPermissionKind : "",
        estimasiMenit: shortPermissionActive ? Number(shortPermissionMinutes) : "",
        keteranganIzinJam: shortPermissionActive ? `${shortPermissionKind} estimasi ${shortPermissionMinutes} menit` : "",
        start: range,
        end: validation.dateEnd,
        dateStart: validation.dateStart,
        dateEnd: validation.dateEnd,
        requestedDays: validation.requestedDays,
        reason,
        status: "Menunggu",
        date: dateIso,
        tanggal: dateIso,
        displayDate: parts.dateOnly,
        time: timeText,
        jam: timeText,
        quotaYear: validation.quotaYear,
        quotaLimit: validation.quota.limit,
        annualLeaveUsedBefore: validation.quota.used,
        annualLeaveRemainingBefore: validation.quota.remaining,
        annualLeaveRemainingAfter: isAnnualLeaveType(type) ? Math.max(0, validation.quota.remaining - validation.requestedWorkdays) : validation.quota.remaining,
        requestedWorkdays: validation.requestedWorkdays,
        calendarDays: validation.calendarDays,
        approvalRequired: true,
        approvedWorkdays: "",
        approvedBy: "",
        approvedAt: "",
        revokedBy: "",
        revokedAt: "",
        leavePolicyVersion: LEAVE_POLICY_VERSION,
        validationStatus: "PASSED",
        syncTarget: "ADMIN_DATABASE",
        photo,
        timestamp: parts.timestamp,
      });
      setStart("");
      setEnd("");
      setReason("");
      setShortPermissionKind("Izin Telat");
      setShortPermissionMinutes("");
      setFile(null);
      setExpanded(false);
      onClose?.();
    } finally {
      setSaving(false);
    }
  };

  if (!expanded) return null;

  return (
    <div id="pengajuan-section" ref={sectionRef}>
      <HomeSection title="Form Pengajuan">
        <div className={cx("relative rounded-[2rem] bg-white p-4 shadow-sm ring-2", activeTheme.ring)}>
          {saving && <LoadingOverlay label="Mengirim pengajuan..." />}
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <AppIcon icon={getLeaveIcon(type)} size="lg" tone={getIconTone(type)} active />
              <div>
                <p className="text-sm font-black text-slate-950">{type}</p>
                <p className={cx("text-xs font-bold", activeTheme.text)}>Kuota Cuti Tahunan: sisa {quotaStats.remaining} dari {quotaStats.limit}</p>
              </div>
            </div>
            <button type="button" onClick={() => { setExpanded(false); onClose?.(); }} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-black text-slate-600">Tutup</button>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <FormSelect label="Jenis Pengajuan" value={type} onChange={setType} options={LEAVE_OPTIONS} />
            {maternityLeaveActive && (
              <div className={cx("rounded-[1.5rem] p-3 text-xs font-bold leading-relaxed ring-1", activeTheme.soft)}>
                Cuti Melahirkan otomatis dihitung {MATERNITY_LEAVE_MONTHS} bulan dari tanggal mulai. Tanggal selesai akan terisi otomatis dan data kebijakan masuk ke Firebase untuk panel admin.
              </div>
            )}
            {shortPermissionActive && (
              <div className={cx("rounded-[1.5rem] p-3 ring-1", activeTheme.panel)}>
                <label className={cx("mb-2 block text-xs font-black uppercase tracking-wide", activeTheme.text)}>Detail Izin Jam</label>
                <div className="grid grid-cols-2 gap-2">
                  {["Izin Telat", "Pulang Cepat"].map((item) => {
                    const active = shortPermissionKind === item;
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setShortPermissionKind(item)}
                        className={cx(
                          "rounded-2xl px-3 py-3 text-xs font-black ring-1 transition active:scale-[0.98]",
                          active ? cx(activeTheme.button, "shadow-lg") : activeTheme.buttonSoft
                        )}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-3">
                  <FormInput
                    label={shortPermissionKind === "Izin Telat" ? "Estimasi telat berapa menit" : "Estimasi pulang cepat berapa menit"}
                    value={shortPermissionMinutes}
                    onChange={(value) => setShortPermissionMinutes(value.replace(/[^0-9]/g, ""))}
                    type="tel"
                    required
                    placeholder="Contoh: 30"
                  />
                </div>
                <p className={cx("mt-2 text-xs font-bold leading-relaxed", activeTheme.panelText)}>
                  Keterangan yang masuk database: {shortPermissionKind || "-"}{shortPermissionMinutes ? ` estimasi ${shortPermissionMinutes} menit` : ""}.
                </p>
              </div>
            )}
            <div className="grid gap-4 md:grid-cols-2">
              <FormInput label="Mulai" value={start} onChange={handleStartChange} type="date" required />
              <FormInput label="Selesai" value={end} onChange={setEnd} type="date" disabled={maternityLeaveActive} />
            </div>
            {previewWorkdays > 0 && (
              <div className={cx("rounded-2xl p-3 text-xs font-bold leading-relaxed ring-1", activeTheme.soft)}>
                Sistem membaca {previewCoffee} hari kalender dan {previewWorkdays} hari kerja. Kuota Cuti Tahunan baru berkurang setelah disetujui admin.
              </div>
            )}
            <div>
              <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-500">Alasan</label>
              <textarea required value={reason} onChange={(e) => setReason(e.target.value)} className="min-h-28 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-semibold outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100" />
            </div>
            {attachmentRequired && (
              <FileInput label="Lampiran Surat Keterangan Sakit" file={file} setFile={setFile} accept="image/*,application/pdf" placeholder="Upload foto/PDF surat keterangan sakit" />
            )}
            {error && <p className="rounded-2xl bg-red-50 p-3 text-xs font-bold leading-relaxed text-red-700">{error}</p>}
            <button disabled={saving} className={cx("flex min-h-[54px] w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 text-sm font-black uppercase tracking-wide text-white shadow-xl active:scale-[0.98] disabled:bg-slate-300 disabled:shadow-none", activeTheme.submit)}>
              {saving ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />} Kirim
            </button>
          </form>
        </div>
      </HomeSection>
    </div>
  );
}

function BottomSummaryStrip({ todayRecords, todayLeave, latestReports, leaveStats }) {
  return (
    <div className="rounded-[1.75rem] border border-slate-100 bg-white p-4 shadow-sm">
      <p className="mb-3 text-xs font-black uppercase tracking-wide text-slate-400">Ringkasan</p>
      <div className="grid grid-cols-4 gap-2">
        <MiniSummary label="Absen" value={todayRecords.length} icon={Clock3} />
        <MiniSummary label="Pengajuan" value={todayLeave ? "Ada" : "-"} icon={FileCheck2} />
        <MiniSummary label="Laporan" value={latestReports.length} icon={FileText} />
        <MiniSummary label="Sisa Cuti" value={leaveStats.remaining} icon={Coffee} />
      </div>
    </div>
  );
}

function MiniSummary({ label, value, icon: Icon, theme, tone = "blue" }) {
  return (
    <div className="group relative overflow-hidden rounded-[1.35rem] bg-white/80 p-3 text-center shadow-sm ring-1 ring-white/80 backdrop-blur transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-100/70">
      <div className="pointer-events-none absolute -right-5 -top-5 h-14 w-14 rounded-full bg-current opacity-[0.05]" />
      <AppIcon icon={Icon} size="xs" tone={tone} active className="mx-auto mb-2" />
      <p className="text-sm font-black text-slate-900">{value}</p>
      <p className="mt-0.5 text-[9px] font-black uppercase text-slate-400">{label}</p>
    </div>
  );
}

function MetricCard({ label, value, icon: Icon }) {
  return (
    <div className="rounded-[1.35rem] border border-slate-100 bg-white p-3.5 shadow-sm sm:rounded-[1.5rem] sm:p-4">
      <AppIcon icon={Icon} size="sm" tone="blue" className="mb-2.5" />
      <p className="text-lg font-black text-slate-900 sm:text-xl">{value}</p>
      <p className="mt-1 text-[9px] font-black uppercase tracking-wide text-slate-400 sm:text-[11px]">{label}</p>
    </div>
  );
}

function QuickPanel({ title, action, onAction, children }) {
  return (
    <div className="rounded-[1.75rem] border border-slate-100 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="font-black text-slate-900">{title}</h3>
        <button onClick={onAction} className="flex items-center gap-1 text-xs font-black text-blue-600">
          {action} <ChevronRight size={14} />
        </button>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function MiniRow({ title, subtitle }) {
  return (
    <div className="rounded-2xl bg-slate-50 px-3 py-3">
      <p className="line-clamp-1 text-sm font-black text-slate-800">{title}</p>
      <p className="mt-0.5 text-xs font-semibold text-slate-500">{subtitle}</p>
    </div>
  );
}

function EmptySmall({ text }) {
  return <p className="rounded-2xl bg-slate-50 px-3 py-5 text-center text-sm font-bold text-slate-400">{text}</p>;
}

function loadImageSafe(src) {
  return new Promise((resolve) => {
    if (!src) return resolve(null);
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

async function loadFirstAvailableImage(sources = []) {
  for (const src of sources) {
    const image = await loadImageSafe(src);
    if (image) return image;
  }
  return null;
}

async function loadCompanyLogoSafe() {
  return loadFirstAvailableImage(COMPANY_LOGO_CANDIDATES);
}

function roundRectPath(ctx, x, y, w, h, r) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function drawTextShadow(ctx, text, x, y, options = {}) {
  const font = options.font || "700 28px Arial, sans-serif";
  const fillStyle = options.fillStyle || "#ffffff";
  const align = options.align || "left";
  const shadow = options.shadow || "rgba(0,0,0,0.70)";
  const blur = options.blur || 8;
  ctx.save();
  ctx.font = font;
  ctx.textAlign = align;
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = fillStyle;
  ctx.shadowColor = shadow;
  ctx.shadowBlur = blur;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 2;
  ctx.fillText(String(text || ""), x, y);
  ctx.restore();
}

function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 3, options = {}) {
  const words = String(text || "-").split(" ").filter(Boolean);
  let line = "";
  const lines = [];
  words.forEach((word) => {
    const testLine = line ? `${line} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = testLine;
    }
  });
  if (line) lines.push(line);
  lines.slice(0, maxLines).forEach((row, index) => {
    drawTextShadow(ctx, row, x, y + index * lineHeight, options);
  });
  return y + Math.min(lines.length, maxLines) * lineHeight;
}

function drawPurePngLogo(ctx, x, y, size, logoImage = null) {
  // Logo perusahaan harus pure PNG: tanpa box putih, tanpa background tambahan.
  // Simpan file logo ke public/logo-pt-karsa.png agar ikut ter-bundle ke Web dan Android.
  if (!logoImage) return;

  ctx.save();
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  const imgRatio = logoImage.width / Math.max(1, logoImage.height);
  let drawW = size;
  let drawH = size;

  if (imgRatio > 1) {
    drawH = size / imgRatio;
  } else {
    drawW = size * imgRatio;
  }

  const drawX = x + (size - drawW) / 2;
  const drawY = y + (size - drawH) / 2;
  ctx.drawImage(logoImage, drawX, drawY, drawW, drawH);
  ctx.restore();
}

function drawTopRightCanvasBadge(ctx, x, y, size, label = "") {
  ctx.save();
  ctx.fillStyle = label ? "rgba(255,255,255,0.94)" : "#dc2626";
  roundRectPath(ctx, x, y, size, size, size * 0.15);
  ctx.fill();
  ctx.strokeStyle = label ? "#1d4ed8" : "rgba(255,255,255,0.92)";
  ctx.lineWidth = Math.max(3, size * 0.055);
  if (label) {
    ctx.fillStyle = "#1d4ed8";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `900 ${Math.max(11, size * 0.18)}px Arial, sans-serif`;
    ctx.fillText(label, x + size / 2, y + size / 2);
  } else {
    ctx.beginPath();
    ctx.arc(x + size * 0.5, y + size * 0.5, size * 0.26, 0.15 * Math.PI, 1.85 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x + size * 0.5, y + size * 0.5, size * 0.15, 0.2 * Math.PI, 1.8 * Math.PI);
    ctx.stroke();
  }
  ctx.restore();
}

function drawGoogleLikeMapCard(ctx, x, y, w, h) {
  ctx.save();
  roundRectPath(ctx, x, y, w, h, 18);
  ctx.clip();
  ctx.fillStyle = "#f8fafc";
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = "#cbd5e1";
  ctx.lineWidth = Math.max(2, w * 0.014);
  const roads = [
    [[0.02, 0.72], [0.28, 0.55], [0.58, 0.58], [0.96, 0.34]],
    [[0.14, 0.10], [0.32, 0.38], [0.48, 0.92]],
    [[0.70, 0.02], [0.66, 0.36], [0.88, 0.84]],
    [[0.04, 0.30], [0.34, 0.28], [0.62, 0.18], [0.98, 0.12]],
  ];
  roads.forEach((road) => {
    ctx.beginPath();
    road.forEach(([px, py], index) => {
      const rx = x + px * w;
      const ry = y + py * h;
      if (index === 0) ctx.moveTo(rx, ry);
      else ctx.lineTo(rx, ry);
    });
    ctx.stroke();
  });
  const pinX = x + w * 0.55;
  const pinY = y + h * 0.42;
  ctx.fillStyle = "#dc2626";
  ctx.shadowColor = "rgba(220,38,38,0.35)";
  ctx.shadowBlur = 8;
  ctx.beginPath();
  ctx.arc(pinX, pinY, w * 0.08, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(pinX, pinY + w * 0.13);
  ctx.lineTo(pinX - w * 0.05, pinY + w * 0.03);
  ctx.lineTo(pinX + w * 0.05, pinY + w * 0.03);
  ctx.closePath();
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.fillStyle = "#64748b";
  ctx.font = `800 ${Math.max(10, w * 0.08)}px Arial, sans-serif`;
  ctx.fillText("Google", x + w * 0.38, y + h * 0.82);
  ctx.font = `700 ${Math.max(8, w * 0.045)}px Arial, sans-serif`;
  ctx.fillText("Map data ©2026", x + w * 0.08, y + h * 0.94);
  ctx.restore();
}

function getAttendancePhotoCode(currentUser, action, timestamp) {
  const rawId = getVal(currentUser, "id") || getVal(currentUser, "userId") || getVal(currentUser, "idKaryawan") || "KRS";
  const userId = String(rawId).split("").filter((ch) => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".includes(ch)).join("").toUpperCase();
  const actionCode = String(action || "ABS").split("").filter((ch) => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".includes(ch)).join("").toUpperCase().slice(0, 4) || "ABS";
  const base = `${userId}${actionCode}${Number(timestamp || Date.now()).toString(36).toUpperCase()}`;
  return base.slice(-14).padStart(14, "0");
}

async function drawAttendanceStamp(ctx, width, height, { currentUser, action, parts, location, coords, clock, locationIntegrity, photoCode }) {
  const isPortrait = height >= width;
  const minSide = Math.min(width, height);
  const pad = Math.round(minSide * (isPortrait ? 0.040 : 0.032));
  // Logo lokal aman untuk canvas. File dari public akan ikut masuk ke build Android.
  // Jangan pakai URL website agar canvas.toDataURL tidak gagal karena CORS.
  const companyLogoImage = await loadCompanyLogoSafe();

  // WAJIB BERSIH: jangan gambar logo apa pun di kanan atas.
  // Logo kanan atas merah/KRS DIHAPUS TOTAL dari hasil canvas.

  ctx.save();
  ctx.globalAlpha = 1;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.shadowBlur = 0;
  ctx.shadowColor = "transparent";
  ctx.restore();

  // Gradient bawah compact supaya teks kebaca tapi tidak menutup foto.
  const darkGradient = ctx.createLinearGradient(0, height * 0.48, 0, height);
  darkGradient.addColorStop(0, "rgba(0,0,0,0)");
  darkGradient.addColorStop(0.46, "rgba(0,0,0,0.36)");
  darkGradient.addColorStop(1, "rgba(0,0,0,0.86)");
  ctx.fillStyle = darkGradient;
  ctx.fillRect(0, height * 0.48, width, height * 0.52);

  const safeTime = String(parts?.time || "--:--").split(".").join(":").slice(0, 5);
  const dayLabel = String(parts?.fullDate || "-").split(",")[0] || "-";
  const dateLabel = parts?.dateOnly || "-";
  const lat = Number(coords?.latitude || 0);
  const lng = Number(coords?.longitude || 0);
  const acc = Math.round(Number(coords?.accuracy || 0));
  const employeeName = getVal(currentUser, "name") || getVal(currentUser, "nama") || "Karyawan";
  const locationText = String(location || "Lokasi tercatat").split(" • Akurasi")[0] || "Lokasi tercatat";

  // Pojok kiri atas: hanya logo perusahaan PNG asli + nama perusahaan, tanpa box/background.
  const logoSize = Math.round(minSide * (isPortrait ? 0.125 : 0.092));
  drawPurePngLogo(ctx, pad, pad, logoSize, companyLogoImage);

  const topTextX = pad + logoSize + Math.round(minSide * 0.016);
  const companyFont = Math.round(minSide * (isPortrait ? 0.027 : 0.021));
  const verifiedFont = Math.round(minSide * (isPortrait ? 0.017 : 0.013));
  drawTextShadow(ctx, "PT. Karsa Sentana", topTextX, pad + logoSize * 0.38, {
    font: `800 ${companyFont}px Arial, sans-serif`,
    fillStyle: "rgba(255,255,255,0.94)",
    blur: 3,
  });
  drawTextShadow(ctx, "Lumbung Sentosa", topTextX, pad + logoSize * 0.66, {
    font: `800 ${companyFont}px Arial, sans-serif`,
    fillStyle: "rgba(255,255,255,0.90)",
    blur: 3,
  });
  drawTextShadow(ctx, "Verified Attendance", topTextX, pad + logoSize * 0.91, {
    font: `700 ${verifiedFont}px Arial, sans-serif`,
    fillStyle: "rgba(255,255,255,0.72)",
    blur: 2,
  });

  // Map kanan bawah tetap ada, dibuat aman agar tidak tabrakan dengan teks kiri.
  const mapW = Math.round(isPortrait ? Math.min(width * 0.36, minSide * 0.34) : Math.min(width * 0.23, minSide * 0.30));
  const mapH = Math.round(mapW * 0.70);
  const mapX = width - pad - mapW;
  const codeBarH = Math.round(minSide * (isPortrait ? 0.052 : 0.040));
  const codeY = height - pad - codeBarH;
  const mapY = Math.max(height * 0.63, codeY - mapH - Math.round(minSide * 0.025));
  drawGoogleLikeMapCard(ctx, mapX, mapY, mapW, mapH);

  // Blok jam dibuat jauh lebih kecil dari versi lama.
  const timeFont = Math.round(minSide * (isPortrait ? 0.082 : 0.065));
  const infoFont = Math.round(minSide * (isPortrait ? 0.023 : 0.018));
  const smallFont = Math.round(minSide * (isPortrait ? 0.018 : 0.014));
  const tinyFont = Math.round(minSide * (isPortrait ? 0.015 : 0.012));
  const actionH = Math.round(minSide * (isPortrait ? 0.042 : 0.034));

  let timeY = Math.round(height - pad - codeBarH - minSide * (isPortrait ? 0.31 : 0.255));
  if (!isPortrait) timeY = Math.max(Math.round(height * 0.57), timeY);

  drawTextShadow(ctx, safeTime, pad, timeY, {
    font: `900 ${timeFont}px Arial, sans-serif`,
    fillStyle: "rgba(255,255,255,0.96)",
    blur: 4,
  });

  ctx.save();
  ctx.font = `900 ${timeFont}px Arial, sans-serif`;
  const timeWidth = ctx.measureText(safeTime).width;
  ctx.restore();

  const dateX = pad + timeWidth + Math.round(minSide * 0.020);
  const dateY = timeY - Math.round(timeFont * 0.42);
  drawTextShadow(ctx, dateLabel, dateX, dateY, {
    font: `800 ${infoFont}px Arial, sans-serif`,
    fillStyle: "rgba(255,255,255,0.88)",
    blur: 3,
  });
  drawTextShadow(ctx, dayLabel, dateX, dateY + Math.round(infoFont * 1.35), {
    font: `800 ${infoFont}px Arial, sans-serif`,
    fillStyle: "rgba(255,255,255,0.82)",
    blur: 3,
  });

  const actionText = String(action || "Absensi");
  ctx.save();
  ctx.font = `900 ${infoFont}px Arial, sans-serif`;
  const actionW = Math.min(mapX - pad * 2, ctx.measureText(actionText).width + Math.round(minSide * 0.045));
  const actionY = timeY + Math.round(minSide * 0.016);
  ctx.fillStyle = "rgba(37,99,235,0.86)";
  roundRectPath(ctx, pad, actionY, actionW, actionH, Math.round(actionH * 0.22));
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.96)";
  ctx.textBaseline = "middle";
  ctx.fillText(actionText, pad + Math.round(minSide * 0.020), actionY + actionH / 2 + 1);
  ctx.restore();

  const textX = pad + Math.round(minSide * 0.036);
  const textMaxW = Math.max(160, mapX - textX - Math.round(minSide * 0.030));
  let y = actionY + actionH + Math.round(minSide * 0.040);

  drawTextShadow(ctx, "⌖", pad, y, {
    font: `900 ${infoFont}px Arial, sans-serif`,
    fillStyle: "rgba(255,255,255,0.80)",
    blur: 2,
  });
  y = drawWrappedText(ctx, locationText, textX, y, textMaxW, Math.round(infoFont * 1.22), isPortrait ? 3 : 2, {
    font: `800 ${infoFont}px Arial, sans-serif`,
    fillStyle: "rgba(255,255,255,0.88)",
    blur: 3,
  });

  y += Math.round(minSide * 0.014);
  drawTextShadow(ctx, `Perusahaan: ${COMPANY_NAME}`, textX, y, {
    font: `700 ${smallFont}px Arial, sans-serif`,
    fillStyle: "rgba(255,255,255,0.72)",
    blur: 2,
  });
  y += Math.round(smallFont * 1.35);
  drawTextShadow(ctx, `Nama: ${employeeName}`, textX, y, {
    font: `700 ${smallFont}px Arial, sans-serif`,
    fillStyle: "rgba(255,255,255,0.72)",
    blur: 2,
  });
  y += Math.round(smallFont * 1.35);
  drawTextShadow(ctx, `ID User: ${getVal(currentUser, "id") || getVal(currentUser, "userId") || getVal(currentUser, "idKaryawan") || "-"}`, textX, y, {
    font: `800 ${smallFont}px Arial, sans-serif`,
    fillStyle: "rgba(255,255,255,0.78)",
    blur: 2,
  });
  y += Math.round(smallFont * 1.35);
  drawTextShadow(ctx, `Koordinat: ${lat ? lat.toFixed(6) : "-"}, ${lng ? lng.toFixed(6) : "-"}`, textX, y, {
    font: `800 ${smallFont}px Arial, sans-serif`,
    fillStyle: "rgba(255,255,255,0.76)",
    blur: 2,
  });
  y += Math.round(smallFont * 1.35);
  drawTextShadow(ctx, locationIntegrity?.message || `Akurasi GPS ±${acc}m`, textX, y, {
    font: `800 ${smallFont}px Arial, sans-serif`,
    fillStyle: locationIntegrity?.warning ? "rgba(110,231,183,0.88)" : "rgba(187,247,208,0.86)",
    blur: 2,
  });

  // Kode foto bar bawah compact.
  ctx.save();
  ctx.fillStyle = "rgba(15,23,42,0.50)";
  ctx.strokeStyle = "rgba(255,255,255,0.10)";
  ctx.lineWidth = 1;
  roundRectPath(ctx, pad, codeY, width - pad * 2, codeBarH, Math.round(codeBarH * 0.30));
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "rgba(255,255,255,0.76)";
  ctx.font = `800 ${tinyFont}px Arial, sans-serif`;
  ctx.textBaseline = "middle";
  ctx.fillText(`Kode Foto: ${photoCode || "-"}`, pad + Math.round(minSide * 0.020), codeY + codeBarH / 2 + 1);
  ctx.restore();
}

function CaptureModal({ action, currentUser, onClose, onSave, serverTimeOffsetMs }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const submitInProgressRef = useRef(false);
  const [location, setLocation] = useState("Mencari lokasi GPS...");
  const [coords, setCoords] = useState(null);
  const [photo, setPhoto] = useState("");
  const [captureMeta, setCaptureMeta] = useState(null);
  const [cameraError, setCameraError] = useState("");
  const [saving, setSaving] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(true);
  const [facingMode, setFacingMode] = useState("environment");
  const [cameraLoading, setCameraLoading] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const [captureError, setCaptureError] = useState("");

  const role = detectRole(currentUser);
  const theme = getRoleTheme(role);
  const clock = getClockIntegrity(serverTimeOffsetMs);
  const locationIntegrity = getLocationIntegrity(coords);
  const canSave = Boolean(photo) && clock.ok;
  const mapUrl = coords ? `https://maps.google.com/maps?q=${coords.latitude},${coords.longitude}&z=16&output=embed` : "";

  const requestLocation = () => {
    setGpsLoading(true);
    setLocation("Mencari lokasi GPS...");
    setCoords(null);
    if (!navigator.geolocation) {
      setGpsLoading(false);
      setLocation("Perangkat tidak mendukung GPS.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const c = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          altitude: pos.coords.altitude,
          speed: pos.coords.speed,
          heading: pos.coords.heading,
          gpsTimestamp: pos.timestamp,
        };
        setCoords(c);
        setLocation(`${c.latitude.toFixed(6)}, ${c.longitude.toFixed(6)} • Akurasi ±${Math.round(c.accuracy)}m`);
        setGpsLoading(false);
      },
      () => {
        setGpsLoading(false);
        setLocation("Lokasi tidak tersedia. Pastikan izin GPS aktif.");
      },
      { enableHighAccuracy: true, timeout: GPS_TIMEOUT_MS, maximumAge: 0 }
    );
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const startCamera = async (mode = facingMode) => {
    setCameraLoading(true);
    setCameraError("");
    stopCamera();
    try {
      const constraints = {
        video: {
          facingMode: { ideal: mode },
          width: { ideal: 1280 },
          height: { ideal: 1920 },
        },
        audio: false,
      };

      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
      } catch {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      }

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.muted = true;
        videoRef.current.playsInline = true;
        try {
          await videoRef.current.play();
        } catch {
          // Browser kadang butuh user gesture. Tombol Ambil Foto akan memanggil play ulang.
        }
      }
    } catch (err) {
      console.error("Camera open failed:", err);
      setCameraError("Kamera tidak bisa dibuka. Pastikan izin kamera diberikan, lalu refresh aplikasi.");
    } finally {
      setCameraLoading(false);
    }
  };

  const switchCamera = async () => {
    const nextMode = facingMode === "environment" ? "user" : "environment";
    setFacingMode(nextMode);
    setPhoto("");
    setCaptureMeta(null);
    await startCamera(nextMode);
  };

  useEffect(() => {
    startCamera("environment");
    requestLocation();
    return () => stopCamera();
  }, []);

  const waitForVideoReady = async (video) => {
    if (!video) throw new Error("Elemen kamera belum siap.");

    video.muted = true;
    video.playsInline = true;

    try {
      const playPromise = video.play && video.play();
      if (playPromise && typeof playPromise.then === "function") await playPromise;
    } catch {
      // Browser kadang butuh user gesture. Lanjut tunggu stream kamera.
    }

    if (video.readyState >= 2 && Number(video.videoWidth) > 0 && Number(video.videoHeight) > 0) return true;

    return new Promise((resolve, reject) => {
      let done = false;
      let timer = null;

      const cleanup = () => {
        if (timer) window.clearTimeout(timer);
        video.removeEventListener("loadedmetadata", onReady);
        video.removeEventListener("loadeddata", onReady);
        video.removeEventListener("canplay", onReady);
        video.removeEventListener("playing", onReady);
      };

      const finish = () => {
        if (done) return;
        done = true;
        cleanup();
        resolve(true);
      };

      function onReady() {
        if (done) return;
        if (Number(video.videoWidth) > 0 && Number(video.videoHeight) > 0) finish();
      }

      timer = window.setTimeout(() => {
        if (done) return;
        done = true;
        cleanup();
        reject(new Error("Kamera belum siap. Tunggu sampai gambar kamera tampil jelas, lalu tekan Ambil Foto lagi."));
      }, 7000);

      video.addEventListener("loadedmetadata", onReady);
      video.addEventListener("loadeddata", onReady);
      video.addEventListener("canplay", onReady);
      video.addEventListener("playing", onReady);

      try {
        const playPromise = video.play && video.play();
        if (playPromise && typeof playPromise.catch === "function") playPromise.catch(() => { });
      } catch {
        // Abaikan, event onReady tetap menangani.
      }

      onReady();
    });
  };

  const capture = async () => {
    if (capturing) return;
    setCapturing(true);
    setCaptureError("");

    try {
      const video = videoRef.current;
      const canvas = canvasRef.current || document.createElement("canvas");
      if (!video) throw new Error("Kamera belum terbuka.");

      if (!video.srcObject && streamRef.current) video.srcObject = streamRef.current;
      await waitForVideoReady(video);

      const rawWidth = video.videoWidth || video.clientWidth || 960;
      const rawHeight = video.videoHeight || video.clientHeight || 1280;
      if (!rawWidth || !rawHeight) throw new Error("Ukuran kamera belum terbaca. Tekan Ambil Foto sekali lagi.");

      const scale = Math.min(1, MAX_UPLOAD_IMAGE_SIZE / Math.max(rawWidth, rawHeight));
      const width = Math.max(1, Math.round(rawWidth * scale));
      const height = Math.max(1, Math.round(rawHeight * scale));
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) throw new Error("Canvas tidak tersedia di browser ini.");

      ctx.save();
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(video, 0, 0, width, height);
      ctx.restore();

      const serverDate = getServerDate(serverTimeOffsetMs);
      const parts = nowParts(serverDate);
      const photoCode = getAttendancePhotoCode(currentUser, action, serverDate.getTime());

      await drawAttendanceStamp(ctx, width, height, {
        currentUser,
        action,
        parts,
        location,
        coords,
        clock,
        locationIntegrity,
        photoCode,
      });

      let finalDataUrl = "";
      try {
        finalDataUrl = canvas.toDataURL("image/jpeg", 0.92);
      } catch (err) {
        throw new Error("Foto final gagal dibuat karena canvas terblokir. Pastikan logo memakai file lokal public/logo-pt-karsa.png, bukan URL luar.");
      }
      if (!finalDataUrl || finalDataUrl.length < 1000) throw new Error("Foto final gagal dibuat. Ulangi setelah kamera benar-benar tampil.");

      const nextMeta = {
        action,
        parts,
        photoCode,
        timestamp: serverDate.getTime(),
        serverTime: serverDate.toISOString(),
        deviceTime: new Date().toISOString(),
        location,
        coords: coords ? { ...coords } : null,
        clock: { ...clock },
        locationIntegrity: { ...locationIntegrity },
      };

      setCaptureMeta(nextMeta);
      setPhoto(finalDataUrl);
      return { photo: finalDataUrl, meta: nextMeta };
    } catch (err) {
      const msg = err?.message || "Gagal mengambil foto. Coba ulangi.";
      setCaptureError(msg);
      console.error("Capture photo failed:", err);
      return null;
    } finally {
      setCapturing(false);
    }
  };

  const submit = async (photoOverride = "", metaOverride = null) => {
    if (saving || submitInProgressRef.current) return;

    let finalPhoto = photoOverride || photo;
    let finalMeta = metaOverride || captureMeta;

    if (!finalPhoto) {
      const captured = await capture();
      finalPhoto = captured?.photo || "";
      finalMeta = captured?.meta || null;
    }

    if (!finalPhoto) {
      setCaptureError("Foto belum berhasil dibuat. Tekan Ambil Foto lagi setelah kamera benar-benar tampil.");
      return;
    }

    if (!clock.ok) return;

    submitInProgressRef.current = true;
    setSaving(true);
    const fallbackServerDate = getServerDate(serverTimeOffsetMs);
    const meta = finalMeta || {
      parts: nowParts(fallbackServerDate),
      timestamp: fallbackServerDate.getTime(),
      serverTime: fallbackServerDate.toISOString(),
      deviceTime: new Date().toISOString(),
      location,
      coords,
      clock,
      locationIntegrity,
    };
    const parts = meta.parts;
    const savedCoords = meta.coords || coords || {};
    const savedClock = meta.clock || clock;
    const savedLocationIntegrity = meta.locationIntegrity || locationIntegrity;
    const safeDate = new Date(meta.timestamp || Date.now());
    const dateIso = dateOnlyISO(safeDate) || dateOnlyISO(new Date()) || "";
    const timeText = String(parts.time || "").split(".").join(":");
    const actionSlug = String(action || "Absensi").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "") || "Absensi";
    const employeeId = String(getVal(currentUser, "id") || getVal(currentUser, "userId") || getVal(currentUser, "idKaryawan") || "USER").toUpperCase();
    const stableRequestId = `${employeeId}-${dateIso}-${actionSlug}`;
    const isLate = calculateLate(timeText, role, action);
    const photoCode = meta.photoCode || getAttendancePhotoCode(currentUser, action, meta.timestamp);
    const createdAt = meta.serverTime || new Date().toISOString();
    const gpsStatus = savedLocationIntegrity.status || "GPS_RECORDED";

    const payload = {
      action,
      actionType: action,
      attendanceAction: action,
      aksi: action,
      jenisAbsensi: action,
      id: stableRequestId,
      userId: employeeId,
      idKaryawan: employeeId,
      employeeId,
      name: getVal(currentUser, "name") || getVal(currentUser, "nama"),
      nama: getVal(currentUser, "name") || getVal(currentUser, "nama"),
      role,
      site: getVal(currentUser, "penempatan"),
      penempatan: getVal(currentUser, "penempatan"),
      date: dateIso,
      tanggal: dateIso,
      displayDate: parts.dateOnly,
      time: timeText,
      jam: timeText,
      location: meta.location || location,
      lokasi: meta.location || location,
      latitude: savedCoords?.latitude || "",
      longitude: savedCoords?.longitude || "",
      accuracy: savedCoords?.accuracy || "",
      akurasi: savedCoords?.accuracy || "",
      altitude: savedCoords?.altitude || "",
      gpsTimestamp: savedCoords?.gpsTimestamp ? new Date(savedCoords.gpsTimestamp).toISOString() : "",
      gpsStatus,
      serverTime: meta.serverTime,
      deviceTime: meta.deviceTime,
      clockDriftMs: savedClock.driftMs,
      clockStatus: savedClock.status,
      locationIntegrity: savedLocationIntegrity.status,
      antiManipulationStatus: savedClock.ok ? "PASSED" : "BLOCKED_TIME_ONLY",
      locationPolicy: "NO_LOCATION_BLOCK",
      outsideGeofenceAllowed: true,
      gpsWarningStatus: savedLocationIntegrity.status,
      locationNote: savedLocationIntegrity.keteranganLokasi || savedLocationIntegrity.message || "Lokasi tercatat",
      keteranganLokasi: savedLocationIntegrity.keteranganLokasi || savedLocationIntegrity.message || "Lokasi tercatat",
      geofenceImpact: "TIDAK_MEMBLOKIR_ABSENSI",
      latenessStatus: action.includes("Libur") || action.includes("Pulang") || action.includes("Istirahat") || action.includes("Patroli") || action.includes("Tiba") || action.includes("Selesai") ? "Tercatat" : isLate ? "Terlambat" : "Tepat Waktu",
      isLate,
      photoCode,
      stampedPhotoUrl: finalPhoto,
      proofPhotoUrl: finalPhoto,
      attendancePhotoUrl: finalPhoto,
      finalPhotoUrl: finalPhoto,
      photoUrl: finalPhoto,
      fotoBuktiUrl: finalPhoto,
      photo: finalPhoto,
      fotoUrl: finalPhoto,
      fotoAbsensi: finalPhoto,
      stampedPhoto: finalPhoto,
      timestamp: meta.timestamp,
      createdAt,
      updatedAt: new Date().toISOString(),
      requestId: stableRequestId,
      clientRequestId: stableRequestId,
      idempotencyKey: stableRequestId,
    };

    try {
      await onSave(payload);
      onClose();
    } finally {
      submitInProgressRef.current = false;
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 h-[100dvh] bg-black text-white">
      <canvas ref={canvasRef} className="hidden" />
      {saving && <LoadingOverlay label="Menyimpan absensi..." />}
      <div className="flex h-full flex-col">
        <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-4 pt-[calc(env(safe-area-inset-top)+0.75rem)]">
          <button onClick={onClose} className="grid h-11 w-11 place-items-center rounded-full bg-black/45 text-white backdrop-blur active:scale-95">
            <X size={22} />
          </button>
          <div className="rounded-full bg-black/35 px-4 py-2 text-center backdrop-blur">
            <p className="text-[10px] font-black uppercase tracking-widest text-white/55">Mode Kamera</p>
            <h2 className="text-sm font-black">{action}</h2>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={switchCamera} disabled={cameraLoading} className="grid h-11 w-11 place-items-center rounded-full bg-black/45 text-white backdrop-blur active:scale-95 disabled:opacity-60" title={facingMode === "environment" ? "Ganti ke kamera depan" : "Ganti ke kamera belakang"}>
              <SwitchCamera size={18} className={cameraLoading ? "animate-pulse" : ""} />
            </button>
            <button onClick={requestLocation} className="grid h-11 w-11 place-items-center rounded-full bg-black/45 text-white backdrop-blur active:scale-95" title="Perbarui GPS">
              <RefreshCcw size={18} className={gpsLoading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        <div className="relative flex-1 overflow-hidden bg-slate-950">
          {photo ? (
            <img src={photo} alt="Preview" className="h-full w-full object-cover" />
          ) : (
            <video ref={videoRef} autoPlay playsInline muted className="h-full w-full object-cover" />
          )}
          {cameraLoading && !photo && <div className="absolute left-1/2 top-24 z-20 -translate-x-1/2 rounded-full bg-black/55 px-4 py-2 text-xs font-black text-white backdrop-blur">Membuka kamera...</div>}
          {cameraError && <div className="absolute inset-x-4 top-20 z-20 rounded-3xl bg-red-500/90 p-4 text-sm font-bold">{cameraError}</div>}
          {captureError && <div className="absolute inset-x-4 top-36 z-20 rounded-3xl bg-amber-500/95 p-4 text-sm font-bold text-slate-950">{captureError}</div>}
          {capturing && <div className="absolute left-1/2 top-40 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/65 px-4 py-2 text-xs font-black text-white backdrop-blur"><Loader2 className="animate-spin" size={16} /> Memproses foto...</div>}

          <div className="absolute inset-x-3 bottom-3 z-20 rounded-[1.7rem] bg-black/62 p-3 backdrop-blur-xl sm:inset-x-4 sm:bottom-4 sm:p-4">
            <div className="grid gap-3 md:grid-cols-[180px_1fr]">
              <div className="h-28 overflow-hidden rounded-2xl bg-slate-900 ring-1 ring-white/10 md:h-full">
                {coords ? (
                  <iframe title="Preview Lokasi" src={mapUrl} className="h-full w-full border-0" loading="lazy" />
                ) : (
                  <div className="grid h-full place-items-center px-3 text-center text-xs font-black text-white/45">
                    Mencari GPS
                  </div>
                )}
              </div>

              <div className="min-w-0 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white p-1.5 shadow-lg">
                      <img src={COMPANY_LOGO_URL} alt="Logo" className="h-full w-full object-contain" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-black text-white">Karsa Sentana</p>
                      <p className="text-xs font-bold text-white/55">Verified Attendance</p>
                    </div>
                  </div>
                  <span className={cx("shrink-0 rounded-full px-2.5 py-1 text-[10px] font-black", theme.badge)}>{role}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  <StatusBadge ok={clock.ok} label={clock.ok ? "Jam Valid" : `Jam beda ${clock.driftMinutes}m`} />
                  <StatusBadge ok={locationIntegrity.ok} label={locationIntegrity.message} />
                </div>

                <div className="flex items-start gap-2 rounded-2xl bg-white/10 p-3">
                  <MapPin className="mt-0.5 shrink-0 text-blue-300" size={18} />
                  <p className="text-xs font-black leading-relaxed text-white">{location}</p>
                </div>

                {photo && !canSave && <p className="rounded-2xl bg-red-500/20 p-3 text-xs font-bold text-red-100">Absensi diblokir hanya jika jam perangkat/server tidak valid. Lokasi/GPS tidak memblokir absensi.</p>}
                {photo && locationIntegrity.warning && <p className="rounded-2xl bg-amber-500/20 p-3 text-xs font-bold text-amber-50">Catatan lokasi: {locationIntegrity.keteranganLokasi || locationIntegrity.message}. Absensi tetap bisa disimpan.</p>}
              </div>
            </div>
          </div>
        </div>

        <div className="shrink-0 bg-black px-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-3">
          <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
            <button type="button" onClick={() => { setPhoto(""); setCaptureMeta(null); setCaptureError(""); }} className="rounded-2xl bg-white/10 px-4 py-4 text-sm font-black text-white active:scale-95">
              Ulangi
            </button>
            {!photo ? (
              <button
                type="button"
                onClick={async (event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  const captured = await capture();
                  if (captured?.photo) await submit(captured.photo, captured.meta);
                }}
                disabled={capturing || saving || Boolean(cameraError)}
                className="relative z-50 flex min-h-[56px] items-center justify-center gap-2 rounded-2xl bg-white px-4 py-4 text-sm font-black text-slate-950 active:scale-95 disabled:opacity-60"
              >
                {capturing || saving ? <Loader2 className="animate-spin" size={18} /> : <Camera size={18} />} {saving ? "Menyimpan..." : capturing ? "Memproses..." : cameraLoading ? "Kamera siap..." : "Ambil Foto & Absen"}
              </button>
            ) : (
              <button type="button" disabled={!canSave || saving} onClick={submit} className="flex min-h-[56px] items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-4 text-sm font-black text-white active:scale-95 disabled:bg-slate-600 disabled:text-slate-300">
                <CheckCircle2 size={18} /> Simpan
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function HistoryScreen({ currentUser, attendance = [], leaves = [], reports = [], messages = [], onRefresh }) {
  const [tab, setTab] = useState("absen");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("semua");
  const [expandedId, setExpandedId] = useState("");

  const userId = String(
    getVal(currentUser, "id") ||
    getVal(currentUser, "userId") ||
    getVal(currentUser, "idKaryawan") ||
    ""
  ).toUpperCase();

  const normalizeHistoryDate = (value) => {
    const raw = String(value || "").replace(/^'/, "").trim();
    if (!raw) return "";
    if (raw.length >= 10 && raw.charAt(4) === "-" && raw.charAt(7) === "-") return raw.slice(0, 10);
    const ms = parseDateToMillis(raw);
    return ms ? dateOnlyISO(new Date(ms)) : raw;
  };

  const meta = {
    absen: { label: "Absensi", title: "Riwayat Absensi", icon: Clock3, tone: "blue", empty: "Belum ada riwayat absensi." },
    laporan: { label: "Laporan", title: "Riwayat Laporan", icon: FileText, tone: "violet", empty: "Belum ada laporan." },
    pesan: { label: "Pesan", title: "Pesan Admin", icon: MessageSquare, tone: "emerald", empty: "Belum ada pesan dari admin." },
    cuti: { label: "Pengajuan", title: "Riwayat Pengajuan", icon: Coffee, tone: "amber", empty: "Belum ada pengajuan cuti, izin, atau sakit." },
  };

  const incomingMessages = useMemo(() => getIncomingAdminMessages(messages, currentUser), [messages, currentUser]);

  const baseRows = useMemo(() => {
    const sameUser = (row) => String(getVal(row, "userId") || getVal(row, "idKaryawan") || getVal(row, "employeeId") || "").toUpperCase() === userId;
    if (tab === "absen") return safeArray(attendance).filter(sameUser);
    if (tab === "laporan") return safeArray(reports).filter(sameUser);
    if (tab === "cuti") return safeArray(leaves).filter(sameUser);
    return safeArray(incomingMessages);
  }, [tab, attendance, reports, leaves, incomingMessages, userId]);

  const makeItem = (row, index) => {
    const rawTitle = tab === "absen"
      ? getActivityDisplayTitle(row)
      : tab === "laporan"
        ? (getVal(row, "judul") || getVal(row, "title") || "Laporan Kerja")
        : tab === "cuti"
          ? (getVal(row, "type") || getVal(row, "jenis") || getVal(row, "jenisCuti") || "Pengajuan")
          : (getVal(row, "subject") || getVal(row, "judul") || getVal(row, "title") || "Pesan Admin");

    const title = String(rawTitle || "Aktivitas");
    const status = tab === "absen"
      ? (getVal(row, "latenessStatus") || getVal(row, "statusAbsensi") || getVal(row, "status") || "Tercatat")
      : tab === "laporan"
        ? (getVal(row, "reportStatus") || getVal(row, "status") || "Terkirim")
        : tab === "cuti"
          ? (getVal(row, "status") || "Menunggu")
          : (getVal(row, "status") || "Masuk");

    const date = getVal(row, "date") || getVal(row, "tanggal") || String(getVal(row, "start") || "").split(" s/d ")[0] || "";
    const time = tab === "absen" ? getActivityDisplayTime(row) : (getVal(row, "time") || getVal(row, "jam") || getVal(row, "waktu") || "-");
    const description = tab === "absen"
      ? (getVal(row, "keteranganLokasi") || getVal(row, "location") || getVal(row, "lokasi") || "Lokasi tercatat")
      : tab === "laporan"
        ? (getVal(row, "isiLaporan") || getVal(row, "text") || getVal(row, "laporan") || "Laporan terkirim")
        : tab === "cuti"
          ? (getVal(row, "reason") || getVal(row, "alasan") || "Pengajuan menunggu proses admin")
          : (getVal(row, "pesan") || getVal(row, "message") || getVal(row, "body") || "Pesan dari admin");

    const tone = tab === "absen" ? getIconTone(title) : meta[tab]?.tone || "blue";
    const Icon = tab === "absen" ? (ACTION_STYLE[title]?.icon || Clock3) : tab === "cuti" ? getLeaveIcon(title) : meta[tab]?.icon || Activity;
    const key = String(getVal(row, "id") || getVal(row, "requestId") || getVal(row, "clientRequestId") || `${tab}-${index}`);
    const timestamp = Number(getVal(row, "timestamp") || parseDateToMillis(date) || 0);
    const searchText = `${title} ${status} ${date} ${time} ${description}`.toLowerCase();

    return { row, key, title, status, date, time, description, tone, Icon, timestamp, searchText };
  };

  const rows = baseRows
    .map(makeItem)
    .sort((a, b) => Number(b.timestamp || 0) - Number(a.timestamp || 0))
    .filter((item) => {
      const q = query.trim().toLowerCase();
      const statusText = normalizeText(item.status);
      const rowDate = normalizeHistoryDate(item.date);
      const today = dateOnlyISO(new Date());
      const inWeek = item.timestamp ? Date.now() - item.timestamp <= 7 * 24 * 60 * 60 * 1000 : false;

      if (q && !item.searchText.includes(q)) return false;
      if (filter === "hari_ini" && rowDate !== today) return false;
      if (filter === "minggu_ini" && !inWeek) return false;
      if (filter === "terlambat" && !statusText.includes("terlambat")) return false;
      if (filter === "disetujui" && !(statusText.includes("setuju") || statusText.includes("approved") || statusText.includes("acc"))) return false;
      return true;
    });

  const countUserRows = (source) => safeArray(source).filter((row) => String(getVal(row, "userId") || getVal(row, "idKaryawan") || getVal(row, "employeeId") || "").toUpperCase() === userId).length;
  const metrics = [
    { id: "absen", label: "Absensi", value: countUserRows(attendance), icon: Clock3, tone: "blue" },
    { id: "laporan", label: "Laporan", value: countUserRows(reports), icon: FileText, tone: "violet" },
    { id: "pesan", label: "Pesan", value: incomingMessages.length, icon: MessageSquare, tone: "emerald" },
    { id: "cuti", label: "Pengajuan", value: countUserRows(leaves), icon: Coffee, tone: "amber" },
  ];

  const activeMeta = meta[tab] || meta.absen;
  const filterChips = [
    { id: "semua", label: "Semua" },
    { id: "hari_ini", label: "Hari ini" },
    { id: "minggu_ini", label: "Minggu ini" },
    { id: "terlambat", label: "Terlambat" },
    { id: "disetujui", label: "Disetujui" },
  ];

  return (
    <div className="flex-1 overflow-y-auto karsa-genz-shell px-4 py-4 pb-28 sm:p-5 sm:pb-28">
      <div className="mx-auto max-w-5xl space-y-4">
        <div className="relative overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-blue-600 via-violet-600 to-slate-950 p-5 text-white shadow-xl shadow-blue-100">
          <div className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full bg-white/20 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-cyan-300/20 blur-2xl" />
          <div className="relative z-10 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] ring-1 ring-white/20">
                <Sparkles size={13} /> Aktivitas Live
              </div>
              <h2 className="text-2xl font-black leading-tight sm:text-3xl">Riwayat Aktivitas</h2>
              <p className="mt-2 max-w-xl text-sm font-bold leading-relaxed text-white/75">Pantau absensi, laporan, pesan admin, dan pengajuan terbaru dalam satu halaman.</p>
            </div>
            <button type="button" onClick={onRefresh} className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/15 text-white ring-1 ring-white/20 backdrop-blur active:scale-95" title="Refresh data">
              <RefreshCcw size={19} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {metrics.map((item) => (
            <HistoryMetricCard key={item.id} item={item} active={tab === item.id} onClick={() => { setTab(item.id); setExpandedId(""); }} />
          ))}
        </div>

        <div className="rounded-[2rem] bg-white p-3 shadow-sm ring-1 ring-slate-100">
          <Segmented value={tab} onChange={(next) => { setTab(next); setExpandedId(""); }} options={metrics.map((item) => ({ id: item.id, label: item.label }))} />
        </div>

        <div className="rounded-[2rem] bg-white p-4 shadow-sm ring-1 ring-slate-100">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <AppIcon icon={activeMeta.icon} size="lg" tone={activeMeta.tone} active />
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-600">Sub Menu Riwayat</p>
                <h3 className="text-lg font-black text-slate-950">{activeMeta.title}</h3>
              </div>
            </div>
            <span className="w-fit rounded-full bg-slate-50 px-3 py-1.5 text-[10px] font-black uppercase text-slate-500 ring-1 ring-slate-100">{rows.length} data tampil</span>
          </div>

          <div className="mb-3 grid gap-2 md:grid-cols-[1fr_auto]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Cari riwayat, status, tanggal, lokasi..."
                className="min-h-[50px] w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm font-bold outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>
            <button type="button" onClick={() => setFilter("semua")} className="flex min-h-[50px] items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 text-xs font-black uppercase text-white shadow-lg shadow-slate-100 active:scale-95">
              <Filter size={16} /> Reset
            </button>
          </div>

          <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
            {filterChips.map((chip) => (
              <button
                key={chip.id}
                type="button"
                onClick={() => setFilter(chip.id)}
                className={cx(
                  "shrink-0 rounded-full px-3 py-2 text-[10px] font-black uppercase tracking-wide ring-1 transition active:scale-95",
                  filter === chip.id ? "bg-blue-600 text-white ring-blue-600 shadow-lg shadow-blue-100" : "bg-slate-50 text-slate-500 ring-slate-100"
                )}
              >
                {chip.label}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {rows.length === 0 ? (
              <EmptyState title="Belum ada data" text={activeMeta.empty} />
            ) : (
              rows.map((item) => (
                <HistoryActivityCard
                  key={item.key}
                  item={item}
                  expanded={expandedId === item.key}
                  onToggle={() => setExpandedId(expandedId === item.key ? "" : item.key)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function getStatusToneClass(status = "") {
  const raw = normalizeText(status);
  if (raw.includes("gagal") || raw.includes("ditolak") || raw.includes("rejected")) return "bg-red-50 text-red-700 ring-red-100";
  if (raw.includes("terlambat") || raw.includes("menunggu")) return "bg-amber-50 text-amber-700 ring-amber-100";
  if (raw.includes("setuju") || raw.includes("approved") || raw.includes("acc")) return "bg-violet-50 text-violet-700 ring-violet-100";
  if (raw.includes("terkirim") || raw.includes("tercatat") || raw.includes("tepat")) return "bg-emerald-50 text-emerald-700 ring-emerald-100";
  return "bg-blue-50 text-blue-700 ring-blue-100";
}

function HistoryMetricCard({ item, active, onClick }) {
  const toneMap = {
    blue: active ? "border-blue-300 bg-blue-50 ring-blue-100" : "border-blue-100 bg-white ring-slate-100",
    violet: active ? "border-violet-300 bg-violet-50 ring-violet-100" : "border-violet-100 bg-white ring-slate-100",
    emerald: active ? "border-emerald-300 bg-emerald-50 ring-emerald-100" : "border-emerald-100 bg-white ring-slate-100",
    amber: active ? "border-amber-300 bg-amber-50 ring-amber-100" : "border-amber-100 bg-white ring-slate-100",
  };

  return (
    <button type="button" onClick={onClick} className={cx("group relative overflow-hidden rounded-[1.75rem] border p-4 text-left shadow-sm ring-1 transition active:scale-[0.97]", toneMap[item.tone] || toneMap.blue, active ? "shadow-lg" : "hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-200/70")}>
      <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-current opacity-[0.06]" />
      <AppIcon icon={item.icon} size="md" tone={item.tone} active={active} />
      <p className="mt-4 text-2xl font-black leading-none text-slate-950">{item.value}</p>
      <p className="mt-1 text-[10px] font-black uppercase tracking-wide text-slate-400">{item.label}</p>
      {active && <span className="absolute right-3 top-3 rounded-full bg-white px-2.5 py-1 text-[9px] font-black uppercase text-slate-500 shadow-sm ring-1 ring-slate-100">Aktif</span>}
    </button>
  );
}

function HistoryActivityCard({ item, expanded, onToggle }) {
  const latitude = getVal(item.row, "latitude") || getVal(item.row, "lat") || "";
  const longitude = getVal(item.row, "longitude") || getVal(item.row, "lng") || "";
  const accuracy = getVal(item.row, "accuracy") || getVal(item.row, "akurasi") || "";
  const locationText = latitude || longitude ? `${latitude || "-"}, ${longitude || "-"}${accuracy ? ` • Akurasi ±${accuracy}m` : ""}` : "Lokasi tidak tersedia.";

  return (
    <div className="overflow-hidden rounded-[1.85rem] border border-slate-100 bg-white shadow-sm ring-1 ring-slate-100 transition hover:shadow-xl hover:shadow-slate-200/70">
      <div className="flex items-start gap-3 p-4">
        <AppIcon icon={item.Icon} size="lg" tone={item.tone} active />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="line-clamp-1 text-sm font-black text-slate-950">{item.title}</p>
              <p className="mt-1 text-xs font-bold text-slate-400">{formatDateIndo(item.date)} • {item.time || "-"}</p>
            </div>
            <span className={cx("shrink-0 rounded-full px-3 py-1 text-[10px] font-black uppercase ring-1", getStatusToneClass(item.status))}>{item.status}</span>
          </div>
          {!expanded && item.description && <p className="mt-3 line-clamp-2 rounded-2xl bg-slate-50 p-3 text-xs font-semibold leading-relaxed text-slate-500 ring-1 ring-slate-100">{item.description}</p>}
        </div>
      </div>

      {expanded && (
        <div className="border-t border-slate-100 bg-slate-50 p-4">
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="rounded-2xl bg-white p-3 ring-1 ring-slate-100">
              <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">Detail</p>
              <p className="mt-1 whitespace-pre-wrap text-xs font-bold leading-relaxed text-slate-600">{item.description || "Tidak ada catatan tambahan."}</p>
            </div>
            <div className="rounded-2xl bg-white p-3 ring-1 ring-slate-100">
              <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">Lokasi / Akurasi</p>
              <p className="mt-1 text-xs font-bold leading-relaxed text-slate-600">{locationText}</p>
            </div>
          </div>
        </div>
      )}

      <button type="button" onClick={onToggle} className="flex w-full items-center justify-center gap-2 border-t border-slate-100 bg-white px-4 py-3 text-xs font-black uppercase text-blue-600 active:scale-[0.99]">
        {expanded ? "Tutup Detail" : "Lihat Detail"} <ChevronRight className={cx("transition", expanded && "rotate-90")} size={15} />
      </button>
    </div>
  );
}

function Segmented({ value, onChange, options }) {
  return (
    <div className="grid rounded-2xl bg-slate-200/70 p-1" style={{ gridTemplateColumns: `repeat(${options.length}, 1fr)` }}>
      {options.map((opt) => (
        <button key={opt.id} onClick={() => onChange(opt.id)} className={cx("rounded-xl px-3 py-3 text-xs font-black transition", value === opt.id ? "bg-white text-blue-700 shadow-sm" : "text-slate-500")}>
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function EmptyState({ title, text }) {
  return (
    <div className="rounded-[2rem] border border-dashed border-slate-200 bg-white p-8 text-center">
      <Sparkles className="mx-auto mb-3 text-slate-300" size={34} />
      <h3 className="text-base font-black text-slate-800">{title}</h3>
      <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-500">{text}</p>
    </div>
  );
}

function LeaveScreen({ currentUser, onSaveLeave }) {
  const [type, setType] = useState(LEAVE_OPTIONS[0]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [reason, setReason] = useState("");
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const attachmentRequired = requiresLeaveAttachment(type);

  useEffect(() => {
    if (!attachmentRequired && file) setFile(null);
  }, [attachmentRequired, file]);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const parts = nowParts();
    const photo = attachmentRequired ? await fileToBase64(file) : "";
    const range = end ? `${start} s/d ${end}` : start;
    try {
      await onSaveLeave({
        action: "cuti",
        id: `CUTI-${Date.now()}`,
        userId: getVal(currentUser, "id"),
        name: getVal(currentUser, "name"),
        role: detectRole(currentUser),
        penempatan: getVal(currentUser, "penempatan"),
        type,
        start: range,
        reason,
        status: "Menunggu",
        date: parts.dateOnly,
        photo,
        timestamp: parts.timestamp,
      });
      setReason("");
      setStart("");
      setEnd("");
      setFile(null);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 px-4 py-4 pb-28 sm:p-5 sm:pb-28">
      {saving && <LoadingOverlay label="Mengirim pengajuan..." />}
      <form onSubmit={submit} className="mx-auto max-w-2xl space-y-4 rounded-[2rem] border border-slate-100 bg-white p-5 shadow-sm">
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-blue-600">Pengajuan Kehadiran</p>
          <h2 className="mt-1 text-xl font-black text-slate-900">Izin, sakit, cuti, atau libur</h2>
        </div>
        <FormSelect label="Jenis Pengajuan" value={type} onChange={setType} options={LEAVE_OPTIONS} />
        <div className="grid gap-4 md:grid-cols-2">
          <FormInput label="Tanggal Mulai" value={start} onChange={setStart} type="date" required />
          <FormInput label="Tanggal Selesai" value={end} onChange={setEnd} type="date" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-500">Alasan</label>
          <textarea required value={reason} onChange={(e) => setReason(e.target.value)} className="min-h-36 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-semibold outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100" placeholder="Tuliskan alasan pengajuan..." />
        </div>
        {attachmentRequired && <FileInput label="Lampiran Surat Keterangan Sakit" file={file} setFile={setFile} accept="image/*,application/pdf" placeholder="Upload foto/PDF surat keterangan sakit" />}
        <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-4 text-sm font-black uppercase tracking-wide text-white shadow-xl shadow-blue-100 active:scale-[0.98]">
          <Send size={18} /> Kirim Pengajuan
        </button>
      </form>
    </div>
  );
}

function CalendarNationalScreen({ db, serverTimeOffsetMs = 0 }) {
  const [filter, setFilter] = useState("all");
  const serverDate = getServerDate(serverTimeOffsetMs);
  const year = serverDate.getFullYear();
  const holidays = useMemo(() => getHolidayRows(db).filter((row) => {
    const d = parseInputDate(String(row.date).slice(0, 10));
    return d && d.getFullYear() === year;
  }), [db, year]);
  const upcoming = getUpcomingHoliday(holidays, serverDate);
  const monthRows = holidays.filter((row) => {
    const d = parseInputDate(String(row.date).slice(0, 10));
    return d && d.getMonth() === serverDate.getMonth();
  });
  const holidayMap = useMemo(() => {
    const map = {};
    holidays.forEach((row) => {
      const d = parseInputDate(String(row.date).slice(0, 10));
      if (d) map[dateOnlyISO(d)] = row;
    });
    return map;
  }, [holidays]);
  const calendarCells = useMemo(() => {
    const first = new Date(year, serverDate.getMonth(), 1);
    const start = new Date(first);
    start.setDate(first.getDate() - first.getDay());
    return Array.from({ length: 42 }, (_, index) => {
      const d = new Date(start);
      d.setDate(start.getDate() + index);
      const iso = dateOnlyISO(d);
      return {
        date: d,
        iso,
        day: d.getDate(),
        currentMonth: d.getMonth() === serverDate.getMonth(),
        today: iso === dateOnlyISO(serverDate),
        holiday: holidayMap[iso],
      };
    });
  }, [year, serverDate, holidayMap]);
  const shownRows = filter === "month" ? monthRows : filter === "upcoming" ? holidays.filter((row) => {
    const d = parseInputDate(String(row.date).slice(0, 10));
    const today = new Date(serverDate.getFullYear(), serverDate.getMonth(), serverDate.getDate()).getTime();
    return d && d.getTime() >= today;
  }) : holidays;

  const nextDate = upcoming ? parseInputDate(String(upcoming.date).slice(0, 10)) : null;
  const daysLeft = nextDate ? Math.max(0, Math.ceil((nextDate.getTime() - new Date(serverDate.getFullYear(), serverDate.getMonth(), serverDate.getDate()).getTime()) / 86400000)) : null;

  return (
    <div className="flex-1 overflow-y-auto karsa-genz-shell px-4 py-4 pb-28 sm:p-5 sm:pb-28">
      <div className="mx-auto max-w-5xl space-y-4">
        <div className="overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-100">
          <div className="bg-gradient-to-br from-blue-500 via-indigo-600 to-slate-900 p-5 text-white">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 py-2">
                <h2 className="text-2xl font-black leading-tight">Kalender Nasional</h2>
              </div>
              <AppIcon icon={Coffee} size="xl" tone="blue" active className="bg-white/16 ring-white/20" />
            </div>
          </div>

          <div className="p-4">
            <div className="rounded-[1.75rem] bg-slate-50 p-3 ring-1 ring-slate-100">
              <div className="mb-3 flex items-center justify-between gap-3 px-1">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-600">Kalender Bulan Ini</p>
                  <h3 className="text-lg font-black text-slate-950">{MONTH_NAMES[serverDate.getMonth()]} {year}</h3>
                </div>
                <span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-black text-slate-500 ring-1 ring-slate-100">{monthRows.length} libur</span>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center">
                {DAY_NAMES.map((day) => (
                  <div key={day} className="py-2 text-[9px] font-black uppercase text-slate-400">
                    {day.slice(0, 3)}
                  </div>
                ))}
                {calendarCells.map((cell) => (
                  <div
                    key={cell.iso}
                    title={cell.holiday?.name || ""}
                    className={cx(
                      "relative grid aspect-square place-items-center rounded-xl text-xs font-black ring-1",
                      !cell.currentMonth && "text-slate-300 bg-white/50 ring-transparent",
                      cell.currentMonth && !cell.holiday && !cell.today && "bg-white text-slate-600 ring-slate-100",
                      cell.today && "bg-blue-600 text-white ring-blue-600 shadow-sm",
                      cell.holiday && !cell.today && "bg-rose-50 text-rose-700 ring-rose-100"
                    )}
                  >
                    {cell.day}
                    {cell.holiday && <span className="absolute bottom-1 h-1 w-1 rounded-full bg-rose-500" />}
                  </div>
                ))}
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2 px-1 text-[10px] font-bold text-slate-500">
                <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-600" /> Hari ini</span>
                <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-rose-500" /> Libur nasional</span>
              </div>
            </div>
          </div>
        </div>

        {upcoming && (
          <div className="rounded-[2rem] bg-white p-4 shadow-sm ring-1 ring-slate-100">
            <div className="flex items-start gap-3">
              <AppIcon icon={Sparkles} size="lg" tone="emerald" />
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-700">Libur Terdekat</p>
                <h3 className="mt-1 text-lg font-black leading-tight text-slate-950">{upcoming.name}</h3>
                <p className="mt-1 text-sm font-bold text-slate-500">{nowParts(parseInputDate(String(upcoming.date).slice(0, 10))).fullDate}</p>
                <span className="mt-3 inline-flex rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-700 ring-1 ring-emerald-100">{upcoming.type}</span>
              </div>
            </div>
          </div>
        )}

        <div className="rounded-[2rem] bg-white p-3 shadow-sm ring-1 ring-slate-100">
          <Segmented value={filter} onChange={setFilter} options={[{ id: "all", label: "Semua" }, { id: "upcoming", label: "Akan Datang" }, { id: "month", label: "Bulan Ini" }]} />
        </div>

        <div className="rounded-[2rem] bg-white p-4 shadow-sm ring-1 ring-slate-100">
          <div className="mb-4 flex items-center gap-3">
            <AppIcon icon={Coffee} size="md" tone="blue" />
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-600">Daftar Kalender</p>
              <h3 className="text-lg font-black text-slate-950">Hari Libur Nasional</h3>
            </div>
          </div>

          <div className="space-y-3">
            {shownRows.length === 0 ? (
              <EmptyState title="Belum ada data" text="Data kalender nasional akan muncul di sini setelah tersedia di database." />
            ) : (
              shownRows.map((row, idx) => {
                const d = parseInputDate(String(row.date).slice(0, 10));
                const isPast = d && d.getTime() < new Date(serverDate.getFullYear(), serverDate.getMonth(), serverDate.getDate()).getTime();
                return (
                  <div key={row.id || idx} className={cx("flex items-center gap-3 rounded-[1.65rem] p-3 ring-1", isPast ? "bg-slate-50 ring-slate-100 opacity-70" : "bg-white ring-slate-100 shadow-sm")}>
                    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-blue-50 via-white to-blue-100 text-center text-blue-700 shadow-sm shadow-blue-100 ring-1 ring-blue-100">
                      <p className="text-lg font-black leading-none">{d ? d.getDate() : "-"}</p>
                      <p className="mt-0.5 text-[9px] font-black uppercase">{d ? MONTH_NAMES[d.getMonth()].slice(0, 3) : ""}</p>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-1 text-sm font-black text-slate-950">{row.name}</p>
                      <p className="mt-1 text-xs font-bold text-slate-400">{d ? nowParts(d).fullDate : formatDateIndo(row.date)}</p>
                      {row.note && <p className="mt-1 line-clamp-2 text-xs font-semibold text-slate-500">{row.note}</p>}
                    </div>
                    <span className="shrink-0 rounded-full bg-slate-50 px-2.5 py-1 text-[9px] font-black uppercase text-slate-500 ring-1 ring-slate-100">{row.type}</span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportScreen({ currentUser, onSaveReport }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [saving, setSaving] = useState(false);

  const userId =
    getVal(currentUser, "id") ||
    getVal(currentUser, "userId") ||
    getVal(currentUser, "idKaryawan") ||
    getVal(currentUser, "id_karyawan") ||
    getVal(currentUser, "employeeId") ||
    "";

  const userName = getVal(currentUser, "nama") || getVal(currentUser, "name") || getVal(currentUser, "fullName") || "";
  const penempatan =
    getVal(currentUser, "penempatanDisplay") ||
    getVal(currentUser, "namaPenempatanLengkap") ||
    getVal(currentUser, "penempatan") ||
    "";

  const onPickPhoto = (file) => {
    if (!file) return;
    setPhoto(file);
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(String(reader.result || ""));
    reader.readAsDataURL(file);
  };

  const submit = async (event) => {
    event?.preventDefault?.();
    const judulLaporan = title.trim();
    const isiLaporan = content.trim();

    if (!judulLaporan) {
      notify?.("Judul laporan wajib diisi.", "error");
      return;
    }

    if (!isiLaporan) {
      notify?.("Isi laporan wajib diisi.", "error");
      return;
    }

    setSaving(true);
    try {
      const now = new Date();
      await onSaveReport?.({
        action: "submit_report",
        id: `LAPORAN-${userId || "USER"}-${now.toISOString()}`,
        userId,
        idKaryawan: userId,
        employeeId: userId,
        nama: userName,
        name: userName,
        penempatan,
        title: judulLaporan,
        judul: judulLaporan,
        judulLaporan,
        isiLaporan,
        uraian: isiLaporan,
        content: isiLaporan,
        photo: photoPreview || "",
        photoName: photo?.name || "",
        status: "Terkirim",
        tanggal: dateOnlyISO(now),
        time: now.toISOString(),
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
      });
      setTitle("");
      setContent("");
      setPhoto(null);
      setPhotoPreview("");
      notify?.("Laporan berhasil dikirim.", "success");
    } catch (err) {
      notify?.(err?.message || "Gagal mengirim laporan.", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-5 pb-44">
      <section className="rounded-[2rem] border border-slate-100 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600">
            <MessageSquare size={22} />
          </div>
          <div>
            <p className="text-[0.7rem] font-black uppercase tracking-[0.25em] text-blue-600">Form Laporan</p>
            <h2 className="text-xl font-black text-slate-950">Buat laporan</h2>
          </div>
        </div>

        <label className="mb-2 block text-xs font-black uppercase tracking-wide text-slate-500">Judul laporan</label>
        <input
          required
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Contoh: Pembersihan area lobby selesai"
          className="mb-5 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-bold text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
        />

        <label className="mb-2 block text-xs font-black uppercase tracking-wide text-slate-500">Isi laporan</label>
        <textarea
          required
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Tulis isi laporan kerja di sini..."
          className="min-h-[180px] w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-bold text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
        />

        <div className="mt-5">
          <label className="mb-2 block text-xs font-black uppercase tracking-wide text-slate-500">Foto</label>
          <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-dashed border-blue-200 bg-slate-50 px-4 py-4 text-sm font-black text-slate-600 transition hover:border-blue-400 hover:bg-blue-50">
            <span>{photo?.name || "Pilih / ambil foto"}</span>
            <Camera size={20} className="text-slate-500" />
            <input
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(event) => onPickPhoto(event.target.files?.[0])}
            />
          </label>

          {photoPreview ? (
            <div className="mt-3 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
              <img src={photoPreview} alt="Preview laporan" className="max-h-40 w-full object-cover" />
              <button
                type="button"
                onClick={() => {
                  setPhoto(null);
                  setPhotoPreview("");
                }}
                className="w-full px-4 py-3 text-sm font-black text-red-600"
              >
                Hapus Foto
              </button>
            </div>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={saving}
          className="sticky bottom-24 z-20 mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-4 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Send size={18} />
          {saving ? "Mengirim..." : "Kirim Laporan"}
        </button>
      </section>
    </form>
  );
}

function AccountRow({ icon: Icon, label, value, onClick, danger }) {
  return (
    <button type="button" onClick={onClick} className="flex w-full items-center gap-3 rounded-2xl bg-white px-4 py-4 text-left shadow-sm ring-1 ring-slate-100 active:scale-[0.98]">
      <AppIcon icon={Icon} size="md" tone={danger ? "red" : "blue"} />
      <div className="min-w-0 flex-1">
        <p className={cx("text-sm font-black", danger ? "text-red-600" : "text-slate-950")}>{label}</p>
        {value && <p className="mt-0.5 truncate text-xs font-bold text-slate-400">{value}</p>}
      </div>
      <ChevronRight className="shrink-0 text-slate-300" size={18} />
    </button>
  );
}

function InfoSheet({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/35 p-3 backdrop-blur-sm sm:items-center sm:p-4">
      <div className="mx-auto max-h-[86dvh] w-full max-w-md overflow-y-auto rounded-[2rem] bg-slate-50 p-4 shadow-2xl md:max-w-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-black text-slate-950">{title}</h3>
          <button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full bg-white text-slate-500 shadow-sm ring-1 ring-slate-100"><X size={18} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function NotificationSheet({ notifications = [], onClose }) {
  return (
    <InfoSheet title="Notifikasi" onClose={onClose}>
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <EmptyState title="Belum ada notifikasi" text="Update status cuti, laporan, dan info sistem akan tampil di sini." />
        ) : (
          notifications.map((item, idx) => {
            const Icon = item.icon || Bell;
            return (
              <div key={item.id || idx} className="flex items-start gap-3 rounded-[1.65rem] bg-white p-4 shadow-sm ring-1 ring-slate-100">
                <AppIcon icon={Icon} size="md" tone={getToneFromClassName(item.tone, "blue")} />
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 text-sm font-black text-slate-950">{item.title}</p>
                  <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-600">{item.body}</p>
                  <p className="mt-2 text-xs font-bold text-slate-400">{formatDateIndo(item.date)}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </InfoSheet>
  );
}

function getMessageAttachment(message) {
  const url = getVal(message, "attachmentUrl") || getVal(message, "fileUrl") || getVal(message, "url") || getVal(message, "suratUrl") || getVal(message, "suratCutiUrl") || "";
  const name = getVal(message, "attachmentName") || getVal(message, "fileName") || getVal(message, "namaFile") || getVal(message, "namaLampiran") || "Lampiran / Surat Cuti";
  const type = getVal(message, "attachmentType") || getVal(message, "fileType") || "";
  return { url, name, type, hasFile: Boolean(String(url || "").trim()) };
}

function InboxSheet({ title = "Pesan Masuk Admin", messages = [], onClose }) {
  return (
    <InfoSheet title={title} onClose={onClose}>
      <div className="space-y-3">
        {messages.length === 0 ? (
          <EmptyState title="Belum ada pesan" text="Pesan dari admin akan muncul di sini. Jika admin melampirkan surat cuti atau file lain, tombol unduh akan otomatis tampil." />
        ) : (
          messages.map((msg, idx) => {
            const attachment = getMessageAttachment(msg);
            const subject = getVal(msg, "subject") || getVal(msg, "judul") || getVal(msg, "title") || getVal(msg, "type") || "Pesan Admin";
            const body = getVal(msg, "pesan") || getVal(msg, "message") || getVal(msg, "body") || "-";
            const date = formatDateIndo(getVal(msg, "date"));
            const time = getVal(msg, "time") || getVal(msg, "waktu") || "-";
            return (
              <div key={getVal(msg, "id") || idx} className="overflow-hidden rounded-[1.65rem] bg-white shadow-sm ring-1 ring-slate-100">
                <div className="flex items-start gap-3 p-4">
                  <AppIcon icon={MessageSquare} size="md" tone="blue" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="line-clamp-1 text-sm font-black text-slate-950">{subject}</p>
                        <p className="mt-0.5 text-xs font-bold text-slate-400">{date} • {time}</p>
                      </div>
                      <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-[9px] font-black uppercase text-blue-700 ring-1 ring-blue-100">Admin</span>
                    </div>
                    <p className="mt-3 whitespace-pre-wrap text-sm font-semibold leading-relaxed text-slate-600">{body}</p>
                  </div>
                </div>
                {attachment.hasFile && (
                  <div className="border-t border-slate-100 bg-slate-50 p-3">
                    <a href={attachment.url} target="_blank" rel="noreferrer" className="flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-black text-white shadow-lg shadow-blue-100 active:scale-[0.98]">
                      <FileCheck2 size={18} /> Unduh {attachment.name}
                    </a>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </InfoSheet>
  );
}

function AppUpdateModal({ info, checking, onUpdate, onDismiss, onCheckAgain }) {
  if (!info?.hasUpdate) return null;

  const message = info.required
    ? "Aplikasi memerlukan update terbaru, silakan update aplikasi Anda terlebih dahulu."
    : "Update aplikasi terbaru tersedia. Silakan download update untuk mendapatkan perbaikan terbaru.";

  return (
    <div className="fixed inset-0 z-[120] grid place-items-center bg-black/60 px-8 backdrop-blur-[2px]">
      <div className="w-full max-w-[420px] rounded-[3px] bg-white px-7 pb-5 pt-6 shadow-2xl ring-1 ring-black/10">
        <h2 className="text-[26px] font-bold leading-tight text-slate-950">Info</h2>
        <p className="mt-5 text-[18px] font-normal leading-snug text-slate-950">
          {info.updateMessage || message}
        </p>

        {info.releaseNotes && (
          <p className="mt-3 text-[13px] font-medium leading-relaxed text-slate-500">
            {info.releaseNotes}
          </p>
        )}

        <div className="mt-8 flex items-center justify-end gap-5">
          {!info.required && (
            <button
              type="button"
              onClick={onDismiss}
              className="rounded px-1 py-2 text-[13px] font-bold uppercase tracking-wide text-slate-500 active:scale-95"
            >
              Nanti
            </button>
          )}
          <button
            type="button"
            onClick={onUpdate}
            disabled={!info.apkUrl || checking}
            className="rounded px-1 py-2 text-[15px] font-black uppercase tracking-wide text-slate-700 active:scale-95 disabled:text-slate-300"
          >
            {checking ? "Mengecek..." : "Download Update"}
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailCell({ label, value }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
      <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 break-words text-sm font-black leading-relaxed text-slate-900">{value || "-"}</p>
    </div>
  );
}

function ProfileScreen({ currentUser, attendance = [], leaves = [], reports = [], messages = [], onSaveProfile, onSendMessage, onLogout, serverTimeOffsetMs = 0 }) {
  const fileInputRef = useRef(null);
  const pendingProfilePhotoRef = useRef(false);
  const previewObjectUrlRef = useRef("");
  const profilePhotoInputId = "profile-photo-input";
  const role = detectRole(currentUser);
  const RoleIcon = getRoleIcon(role);
  const employeeStatus = getVal(currentUser, "status") || "Aktif";
  const fullName = getVal(currentUser, "name") || "Karyawan";
  const employeeId = getVal(currentUser, "id") || "-";
  const job = getVal(currentUser, "pekerjaan") || getVal(currentUser, "divisi") || role;
  const placement = getVal(currentUser, "penempatan") || getVal(currentUser, "site") || "-";
  const registeredPhone = getVal(currentUser, "phone") || getVal(currentUser, "noHp") || getVal(currentUser, "whatsapp") || "";
  const phoneLabel = String(registeredPhone || "").trim() || "Nomor belum tersedia";
  const ktpAddress = getVal(currentUser, "addressKtp") || getVal(currentUser, "alamatKtp") || getVal(currentUser, "alamat_ktp") || getVal(currentUser, "alamatSesuaiKtp") || getVal(currentUser, "alamat") || "";
  const domicileAddress = getVal(currentUser, "addressDetail") || getVal(currentUser, "alamatDomisili") || getVal(currentUser, "domisili") || getVal(currentUser, "alamatRumah") || getVal(currentUser, "address") || "";
  const mapAddress = domicileAddress || ktpAddress;
  const mapUrl = mapAddress ? `https://maps.google.com/maps?q=${encodeURIComponent(`${mapAddress} Indonesia`)}&z=15&output=embed` : "";
  const serverDate = getServerDate(serverTimeOffsetMs);
  const leaveStats = getLeaveQuotaStats(leaves, currentUser, serverDate.getFullYear());
  const userId = String(employeeId);
  const totalAbsensi = safeArray(attendance).filter((row) => String(getVal(row, "userId")) === userId).length;
  const totalLaporan = safeArray(reports).filter((row) => String(getVal(row, "userId")) === userId).length;
  const totalPengajuan = safeArray(leaves).filter((row) => String(getVal(row, "userId")) === userId).length;
  const incomingMessages = getIncomingAdminMessages(messages, currentUser);

  const [openSheet, setOpenSheet] = useState(null);
  const [form, setForm] = useState(() => ({
    email: getVal(currentUser, "email") || "",
    phone: registeredPhone,
    emergencyContact: getVal(currentUser, "emergencyContact") || "",
    addressKtp: ktpAddress,
    addressDetail: domicileAddress,
    photo: getProfilePhoto(currentUser),
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  }));
  const [file, setFile] = useState(null);
  const [draftPhoto, setDraftPhoto] = useState("");
  const [draftPhotoName, setDraftPhotoName] = useState("");
  const [preview, setPreview] = useState(form.photo);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [verifyStep, setVerifyStep] = useState("idle");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpToken, setOtpToken] = useState("");
  const [pendingAction, setPendingAction] = useState(null);
  const [verifiedAt, setVerifiedAt] = useState(0);

  const maskPhone = (value) => {
    const raw = String(value || "").replace(/[^0-9]/g, "");
    if (!raw) return "Nomor belum tersedia";
    if (raw.length <= 4) return raw;
    return `${raw.slice(0, 3)}••••${raw.slice(-3)}`;
  };

  const resetPasswordForm = () => setForm((prev) => ({ ...prev, oldPassword: "", newPassword: "", confirmPassword: "" }));

  useEffect(() => {
    // Saat user baru memilih foto, aplikasi bisa langsung sync/focus ulang.
    // Jangan reset preview dari currentUser lama sebelum tombol Simpan Foto Baru ditekan.
    if (pendingProfilePhotoRef.current || file || draftPhoto) return;

    const phone = getVal(currentUser, "phone") || getVal(currentUser, "noHp") || getVal(currentUser, "whatsapp") || "";
    const nextKtpAddress = getVal(currentUser, "addressKtp") || getVal(currentUser, "alamatKtp") || getVal(currentUser, "alamat_ktp") || getVal(currentUser, "alamatSesuaiKtp") || getVal(currentUser, "alamat") || "";
    const nextDomicileAddress = getVal(currentUser, "addressDetail") || getVal(currentUser, "alamatDomisili") || getVal(currentUser, "domisili") || getVal(currentUser, "alamatRumah") || getVal(currentUser, "address") || "";
    const nextPhoto = getProfilePhoto(currentUser);

    setForm((prev) => ({
      ...prev,
      email: getVal(currentUser, "email") || "",
      phone,
      emergencyContact: getVal(currentUser, "emergencyContact") || "",
      addressKtp: nextKtpAddress,
      addressDetail: nextDomicileAddress,
      photo: nextPhoto,
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));
    setPreview(nextPhoto);
    setFile(null);
    setDraftPhoto("");
    setDraftPhotoName("");
    setVerifyStep("idle");
    setOtp("");
    setOtpError("");
    setOtpToken("");
    setPendingAction(null);
    setVerifiedAt(0);
  }, [currentUser]);

  useEffect(() => {
    if (!file && !draftPhoto && !pendingProfilePhotoRef.current) {
      setPreview(form.photo);
    }
  }, [file, draftPhoto, form.photo]);

  const requirePhoneVerification = async (actionType) => {
    setOtpError("");
    if (!registeredPhone) {
      setOtpError("Nomor telepon belum terdaftar. Hubungi HRD/Admin untuk menambahkan nomor terlebih dahulu.");
      setOpenSheet("verify");
      return false;
    }
    const stillValid = verifiedAt && Date.now() - verifiedAt < 5 * 60 * 1000;
    if (stillValid) return true;
    setPendingAction(actionType);
    setOpenSheet("verify");
    setVerifyStep("sending");
    try {
      const result = await apiPost({ action: "request_phone_otp", userId: employeeId, name: fullName, phone: registeredPhone, purpose: actionType, timestamp: Date.now() });
      setOtpToken(result.otpToken || result.token || "");
      setVerifyStep("sent");
      return false;
    } catch (err) {
      setVerifyStep("sent");
      setOtpError("Kode SMS perlu handler GS/SMS Gateway. UI sudah siap; tambahkan action request_phone_otp dan verify_phone_otp di Google Script.");
      return false;
    }
  };

  const verifyOtp = async () => {
    setOtpError("");
    if (!otp.trim()) return setOtpError("Masukkan kode verifikasi dari SMS.");
    setSaving(true);
    try {
      await apiPost({ action: "verify_phone_otp", userId: employeeId, phone: registeredPhone, otp, otpToken, purpose: pendingAction || "password", timestamp: Date.now() });
      setVerifiedAt(Date.now());
      setVerifyStep("verified");
      setOpenSheet("password");
      setOtp("");
      setOtpError("");
    } catch (err) {
      setOtpError(err.message || "Kode verifikasi salah atau sudah kedaluwarsa.");
    } finally {
      setSaving(false);
    }
  };

  const saveProfile = async (e) => {
    e?.preventDefault?.();
    setSaving(true);
    let photo = draftPhoto || form.photo;
    try {
      if (file && !draftPhoto) {
        photo = await fileToBase64(file);
      }
      if (!photo || String(photo).length < 100) {
        throw new Error("Foto profil gagal dibaca. Pilih ulang foto dari galeri/kamera.");
      }

      const nowIso = new Date().toISOString();
      const employeeId = String(getVal(currentUser, "id") || getVal(currentUser, "userId") || getVal(currentUser, "idKaryawan") || "").toUpperCase();
      const nextProfilePayload = {
        ...currentUser,
        action: "update_profile",
        email: form.email,
        phone: form.phone,
        noHp: form.phone,
        whatsapp: form.phone,
        emergencyContact: form.emergencyContact,
        addressKtp: form.addressKtp,
        alamatKtp: form.addressKtp,
        addressDetail: form.addressDetail,
        alamatDomisili: form.addressDetail,
        photo,
        photoUrl: photo,
        fotoUrl: photo,
        fotoProfil: photo,
        profilePhoto: photo,
        profileImageUrl: photo,
        photoBase64: photo,
        fotoBase64: photo,
        imageBase64: photo,
        photoUpdatedAt: nowIso,
        profileUpdatedAt: nowIso,
        updatedAt: nowIso,
      };

      await onSaveProfile(nextProfilePayload);
      pendingProfilePhotoRef.current = false;
      if (previewObjectUrlRef.current) {
        URL.revokeObjectURL(previewObjectUrlRef.current);
        previewObjectUrlRef.current = "";
      }
      setForm((prev) => ({ ...prev, photo }));
      setPreview(photo);
      setFile(null);
      setDraftPhoto("");
      setDraftPhotoName("");
      setOpenSheet(null);
    } finally {
      setSaving(false);
    }
  };

  const savePassword = async (e) => {
    e?.preventDefault?.();
    setOtpError("");
    if (!form.oldPassword.trim()) return setOtpError("Password lama wajib diisi.");
    if (form.newPassword.length < 6) return setOtpError("Password baru minimal 6 karakter.");
    if (form.newPassword !== form.confirmPassword) return setOtpError("Konfirmasi password tidak sama.");
    const currentPass = String(getVal(currentUser, "password") || getVal(currentUser, "sandi") || "");
    if (currentPass && currentPass !== form.oldPassword) return setOtpError("Password lama tidak cocok.");
    setSaving(true);
    try {
      await onSaveProfile({ ...currentUser, password: form.newPassword, sandi: form.newPassword, passwordUpdatedAt: new Date().toISOString() });
      resetPasswordForm();
      setOpenSheet(null);
    } finally {
      setSaving(false);
    }
  };

  const send = async () => {
    if (!message.trim()) return;
    setSaving(true);
    const parts = nowParts();
    try {
      await onSendMessage({ action: "send_message", id: `MSG-${Date.now()}`, userId: employeeId, name: fullName, role, penempatan: placement, type: "Pesan Karyawan", pesan: message, status: "Terkirim", waktu: parts.time.slice(0, 5), date: parts.dateOnly, timestamp: parts.timestamp });
      setMessage("");
      setOpenSheet(null);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto karsa-genz-shell px-4 py-4 pb-28 sm:p-5 sm:pb-28">
      {saving && <LoadingOverlay label="Memproses..." />}
      <input
        ref={fileInputRef}
        id={profilePhotoInputId}
        type="file"
        accept="image/*,.jpg,.jpeg,.png,.webp"
        className="fixed left-0 top-0 h-px w-px opacity-0"
        onChange={(e) => {
          const selectedFile = e.target.files?.[0] || null;
          e.target.value = "";
          if (!selectedFile) return;

          pendingProfilePhotoRef.current = true;
          setFile(selectedFile);
          setDraftPhotoName(selectedFile.name || "Foto profil baru");

          const reader = new FileReader();
          reader.onload = () => {
            const dataUrl = String(reader.result || "");
            if (!dataUrl || dataUrl.length < 100) {
              pendingProfilePhotoRef.current = false;
              setFile(null);
              setDraftPhoto("");
              setDraftPhotoName("");
              notify?.("Foto profil gagal dibaca. Pilih foto lain.", "error");
              return;
            }

            setDraftPhoto(dataUrl);
            setPreview(dataUrl);
            setForm((prev) => ({ ...prev, photo: dataUrl }));
          };
          reader.onerror = () => {
            pendingProfilePhotoRef.current = false;
            setFile(null);
            setDraftPhoto("");
            setDraftPhotoName("");
            notify?.("Foto profil gagal dibaca. Pilih foto lain.", "error");
          };
          reader.readAsDataURL(selectedFile);
        }}
      />

      <div className="mx-auto mb-4 max-w-3xl">
        <div className="flex items-center gap-3 rounded-[1.75rem] bg-white px-4 py-4 shadow-sm ring-1 ring-slate-100">
          <AppIcon icon={UserCircle2} size="lg" tone="blue" />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-600">Akun Karyawan</p>
            <h1 className="truncate text-2xl font-black leading-tight text-slate-950">Profil</h1>
            <p className="mt-0.5 truncate text-sm font-bold text-slate-400">Akun karyawan</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl space-y-4">
        <div className="relative overflow-hidden rounded-[2.25rem] bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <button type="button" onClick={() => fileInputRef.current?.click()} className="absolute right-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full bg-slate-50 text-blue-700 shadow-sm ring-1 ring-slate-100 active:scale-95" title="Ganti foto profil">
            <Camera size={17} />
          </button>

          <div className="relative z-10 px-5 pb-1 pt-2 text-center">
            <label htmlFor={profilePhotoInputId} className="group relative mx-auto grid h-28 w-28 cursor-pointer place-items-center overflow-hidden rounded-full bg-slate-50 p-1 shadow-sm ring-1 ring-slate-100 active:scale-95">
              <div className="grid h-full w-full place-items-center overflow-hidden rounded-full bg-white ring-1 ring-slate-100">
                {preview ? <img src={preview} alt="Profil" className="h-full w-full object-cover" /> : <UserCircle2 className="text-slate-300" size={64} />}
              </div>
              <span className="absolute inset-x-4 bottom-2 rounded-full bg-slate-950/70 px-2 py-1 text-[10px] font-black text-white opacity-100 backdrop-blur transition sm:opacity-0 sm:group-hover:opacity-100">Ganti</span>
            </label>
            <h2 className="mt-4 truncate text-2xl font-black text-slate-950">{fullName}</h2>
            <p className="mt-1 text-sm font-bold text-slate-400">{employeeId} • {placement}</p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-black text-blue-700 ring-1 ring-blue-100"><RoleIcon size={14} /> {role}</span>
              <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-700 ring-1 ring-emerald-100">{employeeStatus}</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-black text-slate-600"><Phone size={13} /> {phoneLabel}</span>
            </div>
          </div>
        </div>

        {(draftPhoto || file) && (
          <div className="rounded-[1.75rem] bg-blue-50 p-3 ring-1 ring-blue-100">
            <p className="mb-2 text-center text-xs font-black text-blue-700">
              Foto baru sudah dipilih{draftPhotoName ? `: ${draftPhotoName}` : ""}. Tekan tombol di bawah untuk menyimpan ke Firebase.
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  pendingProfilePhotoRef.current = false;
                  setFile(null);
                  setDraftPhoto("");
                  setDraftPhotoName("");
                  setPreview(getProfilePhoto(currentUser));
                  setForm((prev) => ({ ...prev, photo: getProfilePhoto(currentUser) }));
                }}
                className="flex min-h-[52px] items-center justify-center rounded-2xl bg-white px-4 py-4 text-sm font-black uppercase tracking-wide text-slate-600 ring-1 ring-slate-100 active:scale-[0.98]"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={saveProfile}
                className="flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-4 text-sm font-black uppercase tracking-wide text-white shadow-xl shadow-blue-100 active:scale-[0.98]"
              >
                <Upload size={18} /> Simpan Foto
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 gap-2 rounded-[2rem] bg-white p-3 shadow-sm ring-1 ring-slate-100">
          <ProfileMetric label="Total Absensi" value={totalAbsensi} icon={Clock3} />
          <ProfileMetric label="Sisa Cuti" value={leaveStats.remaining} sub={`dari ${leaveStats.limit}`} icon={Coffee} />
          <ProfileMetric label="Laporan" value={totalLaporan} icon={FileText} />
        </div>

        <div className="rounded-[2rem] bg-white p-4 shadow-sm ring-1 ring-slate-100">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-slate-400">Statistik Pengguna</p>
              <h3 className="text-lg font-black text-slate-950">Ringkasan Aktivitas</h3>
            </div>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-black text-blue-700">{serverDate.getFullYear()}</span>
          </div>
          <div className="space-y-3">
            <StatBar label="Absensi" value={totalAbsensi} max={Math.max(totalAbsensi, 30)} />
            <StatBar label="Pengajuan" value={totalPengajuan} max={Math.max(totalPengajuan, 12)} />
            <StatBar label="Laporan" value={totalLaporan} max={Math.max(totalLaporan, 30)} />
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-4 shadow-sm ring-1 ring-slate-100">
          <div className="mb-3 flex items-center gap-3">
            <AppIcon icon={MapPinned} size="md" tone="blue" />
            <div className="min-w-0">
              <h3 className="text-lg font-black text-slate-950">Alamat & Lokasi</h3>
              <p className="truncate text-xs font-bold text-slate-400">{mapAddress || "Alamat belum tersedia"}</p>
            </div>
          </div>
          <div className="mb-3 grid gap-2 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-100">
              <div className="mb-1 flex items-center gap-2 text-[10px] font-black uppercase tracking-wide text-slate-400"><IdCard size={13} /> Alamat KTP</div>
              <p className="text-xs font-bold leading-relaxed text-slate-700">{ktpAddress || "-"}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-100">
              <div className="mb-1 flex items-center gap-2 text-[10px] font-black uppercase tracking-wide text-slate-400"><House size={13} /> Alamat Domisili</div>
              <p className="text-xs font-bold leading-relaxed text-slate-700">{domicileAddress || "-"}</p>
            </div>
          </div>
          <div className="h-52 overflow-hidden rounded-[1.5rem] bg-slate-50 ring-1 ring-slate-100">
            {mapUrl ? <iframe title="Lokasi Alamat" src={mapUrl} className="h-full w-full border-0" loading="lazy" /> : <div className="h-full w-full bg-slate-50" />}
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-3 shadow-sm ring-1 ring-slate-100">
          <div className="space-y-2">
            <AccountRow icon={IdCard} label="Data Karyawan" value="Nama, ID, status, penempatan" onClick={() => setOpenSheet("data")} />
            <AccountRow icon={Briefcase} label="Data Pekerjaan" value={job} onClick={() => setOpenSheet("work")} />
            <AccountRow icon={PhoneCall} label="Informasi Kontak" value="No. telpon, kontak darurat, alamat" onClick={() => setOpenSheet("edit")} />
            <AccountRow icon={LockKeyhole} label="Ubah Password" value="Ganti password akun" onClick={() => setOpenSheet("password")} />
            <AccountRow icon={MessageSquare} label="Pesan Masuk" value={incomingMessages.length ? `${incomingMessages.length} pesan dari admin` : "Belum ada pesan admin"} onClick={() => setOpenSheet("help")} />
          </div>
        </div>

        <button onClick={onLogout} className="flex min-h-[54px] w-full items-center justify-center gap-2 rounded-2xl bg-red-50 px-5 py-4 text-sm font-black uppercase tracking-wide text-red-600 ring-1 ring-red-100 active:scale-[0.98]"><LogOut size={18} /> Keluar Akun</button>
      </div>

      {openSheet === "data" && <InfoSheet title="Data Karyawan" onClose={() => setOpenSheet(null)}><div className="grid gap-3 sm:grid-cols-2"><DetailCell label="Nama Lengkap" value={fullName} /><DetailCell label="ID Karyawan" value={employeeId} /><DetailCell label="Status" value={employeeStatus} /><DetailCell label="Tanggal Lahir" value={formatDateIndo(getVal(currentUser, "tanggalLahir") || getVal(currentUser, "birthDate") || getVal(currentUser, "dob"))} /><DetailCell label="Nomor Telpon" value={phoneLabel} /><DetailCell label="Penempatan" value={placement} /><DetailCell label="Alamat Sesuai KTP" value={ktpAddress} /><DetailCell label="Alamat Domisili" value={domicileAddress} /></div></InfoSheet>}
      {openSheet === "work" && <InfoSheet title="Data Pekerjaan" onClose={() => setOpenSheet(null)}><div className="grid gap-3 sm:grid-cols-2"><DetailCell label="Role Absensi" value={role} /><DetailCell label="Pekerjaan" value={job} /><DetailCell label="Penempatan" value={placement} /><DetailCell label="Status Akun" value={employeeStatus} /></div></InfoSheet>}
      {openSheet === "edit" && <InfoSheet title="Informasi Kontak" onClose={() => setOpenSheet(null)}>
        <form onSubmit={saveProfile} className="space-y-4">
          <FormInput label="No. Telpon" value={form.phone} onChange={(value) => setForm((p) => ({ ...p, phone: value }))} type="tel" />
          <FormInput label="Kontak Darurat" value={form.emergencyContact} onChange={(value) => setForm((p) => ({ ...p, emergencyContact: value }))} type="tel" />
          <div>
            <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-500">Alamat Sesuai KTP</label>
            <textarea value={form.addressKtp} onChange={(e) => setForm((p) => ({ ...p, addressKtp: e.target.value }))} className="min-h-24 w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-semibold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-500">Alamat Domisili</label>
            <textarea value={form.addressDetail} onChange={(e) => setForm((p) => ({ ...p, addressDetail: e.target.value }))} className="min-h-24 w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-semibold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
          </div>
          <button className="flex min-h-[54px] w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-4 text-sm font-black uppercase tracking-wide text-white shadow-xl shadow-blue-100 active:scale-[0.98]"><CheckCircle2 size={18} /> Simpan Profil</button>
        </form>
      </InfoSheet>}
      {openSheet === "password" && <InfoSheet title="Ubah Password" onClose={() => { setOpenSheet(null); resetPasswordForm(); }}><form onSubmit={savePassword} className="space-y-4"><div className="rounded-2xl bg-blue-50 p-4 text-xs font-bold leading-relaxed text-blue-800 ring-1 ring-blue-100">Masukkan password lama, lalu buat password baru minimal 6 karakter.</div><FormInput label="Password Lama" value={form.oldPassword} onChange={(value) => setForm((p) => ({ ...p, oldPassword: value }))} type="password" /><FormInput label="Password Baru" value={form.newPassword} onChange={(value) => setForm((p) => ({ ...p, newPassword: value }))} type="password" /><FormInput label="Ulangi Password Baru" value={form.confirmPassword} onChange={(value) => setForm((p) => ({ ...p, confirmPassword: value }))} type="password" />{otpError && <p className="rounded-2xl bg-red-50 p-3 text-xs font-bold leading-relaxed text-red-700">{otpError}</p>}<button className="flex min-h-[54px] w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-4 text-sm font-black uppercase tracking-wide text-white shadow-xl shadow-blue-100 active:scale-[0.98]"><LockKeyhole size={18} /> Simpan Password Baru</button></form></InfoSheet>}
      {openSheet === "verify" && <InfoSheet title="Verifikasi Nomor Telepon" onClose={() => { setOpenSheet(null); setVerifyStep("idle"); setOtpError(""); }}><div className="space-y-4"><div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100"><p className="text-xs font-black uppercase tracking-wide text-slate-400">Kode dikirim ke</p><p className="mt-1 text-lg font-black text-slate-950">{maskPhone(registeredPhone)}</p><p className="mt-2 text-xs font-bold leading-relaxed text-slate-500">Masukkan kode OTP dari SMS untuk melanjutkan perubahan password.</p></div>{verifyStep === "sending" ? <div className="flex items-center justify-center gap-2 rounded-2xl bg-blue-50 p-4 text-sm font-black text-blue-700"><Loader2 className="animate-spin" size={18} /> Mengirim SMS...</div> : <><FormInput label="Kode SMS" value={otp} onChange={(value) => setOtp(value.replace(/[^0-9]/g, "").slice(0, 6))} type="tel" />{otpError && <p className="rounded-2xl bg-red-50 p-3 text-xs font-bold leading-relaxed text-red-700">{otpError}</p>}<button onClick={verifyOtp} className="flex min-h-[54px] w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-4 text-sm font-black uppercase tracking-wide text-white shadow-xl shadow-blue-100 active:scale-[0.98]"><ShieldCheck size={18} /> Verifikasi</button><button onClick={() => requirePhoneVerification("password")} className="w-full rounded-2xl bg-slate-100 px-5 py-3 text-sm font-black text-slate-600">Kirim Ulang Kode</button></>}</div></InfoSheet>}
      {openSheet === "help" && <InboxSheet messages={incomingMessages} onClose={() => setOpenSheet(null)} />}
    </div>
  );
}

function ProfileMetric({ label, value, sub, icon: Icon }) {
  return (
    <div className="rounded-[1.5rem] bg-slate-50 p-3 text-center ring-1 ring-slate-100">
      <AppIcon icon={Icon} size="sm" tone="blue" className="mx-auto mb-2" />
      <p className="text-lg font-black text-slate-950">{value}</p>
      <p className="mt-0.5 text-[9px] font-black uppercase leading-tight text-slate-400">{label}</p>
      {sub && <p className="mt-0.5 text-[9px] font-bold text-slate-300">{sub}</p>}
    </div>
  );
}

function StatBar({ label, value, max }) {
  const pct = Math.max(4, Math.min(100, Math.round((Number(value || 0) / Math.max(1, Number(max || 1))) * 100)));
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs font-black text-slate-500"><span>{label}</span><span>{value}</span></div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-blue-500" style={{ width: `${pct}%` }} /></div>
    </div>
  );
}

function FormInput({ label, value, onChange, type = "text", required = false, placeholder = "", disabled = false }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-500">{label}</label>
      <input disabled={disabled} required={required} type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-bold outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500" />
    </div>
  );
}

function FormSelect({ label, value, onChange, options }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-500">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-bold outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100">
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function FileInput({ label, file, setFile, accept = "image/*", placeholder = "Foto" }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-500">{label}</label>
      <label className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-sm font-bold text-slate-500 hover:bg-slate-100">
        <span className="line-clamp-1">{file ? file.name : placeholder}</span>
        <Camera size={18} />
        <input type="file" accept={accept} className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      </label>
    </div>
  );
}

function ScreenTitle({ title, subtitle }) {
  const titleMap = {
    "Riwayat Aktivitas": { icon: Clock3, label: "Aktivitas", tone: "violet" },
    Laporan: { icon: FileText, label: "Laporan Kerja", tone: "emerald" },
    "Kalender Nasional": { icon: Coffee, label: "Hari Libur", tone: "amber" },
    Profil: { icon: UserCircle2, label: "Akun Karyawan", tone: "blue" },
    Beranda: { icon: Home, label: "Dashboard", tone: "blue" },
    Pengajuan: { icon: Coffee, label: "Pengajuan", tone: "violet" },
  };
  const meta = titleMap[title] || titleMap.Beranda;
  const Icon = meta.icon;

  return (
    <div className="shrink-0 karsa-genz-shell px-4 pb-3 pt-[calc(env(safe-area-inset-top)+0.75rem)] sm:px-5">
      <div className="mx-auto max-w-5xl">
        <div className="karsa-genz-panel flex items-center gap-3 rounded-[2rem] px-4 py-4">
          <AppIcon icon={Icon} size="lg" tone={meta.tone} active />
          <div className="relative z-10 min-w-0 flex-1">
            <p className="bg-gradient-to-r from-cyan-600 via-blue-600 to-fuchsia-600 bg-clip-text text-[10px] font-black uppercase tracking-[0.18em] text-transparent">{meta.label}</p>
            <h1 className="truncate text-2xl font-black leading-tight text-slate-950">{title}</h1>
            {subtitle && <p className="mt-0.5 truncate text-sm font-bold text-slate-400">{subtitle}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [db, setDb] = useState(() =>
    readCache(STORAGE_KEYS.db, {
      karyawan: [],
      absensi: [],
      laporan: [],
      cuti: [],
      pesan: [],
      broadcast: [],
      kalender_nasional: [],
      hari_libur: [],
      jam_kerja: [],
    })
  );
  const [currentUser, setCurrentUser] = useState(() => readCache(STORAGE_KEYS.user, null));
  const [screen, setScreen] = useState("home");
  const [captureAction, setCaptureAction] = useState(null);
  const [syncing, setSyncing] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "success" });
  const [lastSync, setLastSync] = useState(() => localStorage.getItem(STORAGE_KEYS.lastSync) || "");
  const [serverTimeOffsetMs, setServerTimeOffsetMs] = useState(0);
  const [openInbox, setOpenInbox] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [readMessageKeys, setReadMessageKeys] = useState(() => readCache(STORAGE_KEYS.readMessages, []));
  const [readNotificationKeys, setReadNotificationKeys] = useState(() => readCache(STORAGE_KEYS.readNotifications, []));
  const [updateInfo, setUpdateInfo] = useState(null);
  const [updateChecking, setUpdateChecking] = useState(false);
  const [dismissedUpdateVersion, setDismissedUpdateVersion] = useState(() => localStorage.getItem(STORAGE_KEYS.dismissedUpdateVersion) || "");
  const [pendingQueue, setPendingQueue] = useState(() => safeArray(readCache(STORAGE_KEYS.pendingQueue, [])));
  const [isOnline, setIsOnline] = useState(() => isNetworkOnline());
  const [loginTransition, setLoginTransition] = useState(false);
  const attendanceSubmitLockRef = useRef(new Set());

  const notify = (message, type = "success") => setToast({ message, type });

  const persistPendingQueue = (updater) => {
    setPendingQueue((prev) => {
      const nextRaw = typeof updater === "function" ? updater(safeArray(prev)) : safeArray(updater);
      const next = safeArray(nextRaw).slice(-OFFLINE_QUEUE_MAX);
      writeCache(STORAGE_KEYS.pendingQueue, next);
      return next;
    });
  };

  const queueOfflinePayload = (payload, reason = "Koneksi offline / server belum merespons") => {
    const item = makeQueueItem(payload, reason);
    persistPendingQueue((prev) => {
      const exists = prev.some((row) => row.id === item.id || row.key === item.key);
      if (exists) {
        return prev.map((row) => (row.id === item.id || row.key === item.key ? { ...row, payload: { ...row.payload, ...item.payload }, lastError: reason } : row));
      }
      return [...prev, item];
    });
    return item.payload;
  };

  const verifyAttendanceSavedOnServer = async (payload) => {
    await sleep(1300);
    const userId = getAttendanceUserKey(payload) || String(getVal(currentUser, "id") || "").toUpperCase();
    const fresh = await syncEmployee(userId || currentUser);
    const serverRows = safeArray(fresh.absensi);
    return serverRows.some((row) => isSameAttendanceRecord(row, payload));
  };

  const markQueuedPayloadSynced = (payload, result) => {
    const syncedAt = new Date().toISOString();
    const actionRaw = normalizeText(getVal(payload, "action") || getVal(payload, "originalAction") || "");
    const alreadyQueuedProfile = actionRaw.includes("profile") || actionRaw.includes("profil") || actionRaw.includes("update_employee");
    const syncedPayload = {
      ...payload,
      syncStatus: "TERSINKRON",
      syncedAt,
      serverResponse: result?.message || "Berhasil",
      verificationStatus: getVal(payload, "verificationStatus") === "MENUNGGU_VERIFIKASI_SERVER" ? "MENUNGGU_REVIEW_ADMIN" : getVal(payload, "verificationStatus") || "TERSINKRON",
    };
    commitLocalPayload(syncedPayload);
    if (alreadyQueuedProfile && currentUser) {
      const nextUser = mergeUserProfileData(currentUser, syncedPayload);
      setCurrentUser(nextUser);
      writeCache(STORAGE_KEYS.user, nextUser);
    }
    return syncedPayload;
  };

  const flushOfflineQueue = async (manual = false) => {
    if (!isNetworkOnline()) {
      setIsOnline(false);
      if (manual) notify("Masih offline. Data tetap aman tersimpan lokal.", "error");
      return { synced: 0, failed: pendingQueue.length };
    }
    if (!pendingQueue.length) {
      if (manual) notify("Tidak ada data offline yang perlu disinkronkan.");
      return { synced: 0, failed: 0 };
    }

    setSyncing(true);
    let synced = 0;
    const failedItems = [];

    for (const item of safeArray(pendingQueue)) {
      try {
        const payload = {
          ...item.payload,
          offlineMode: true,
          sourceOfflineQueue: true,
          syncStatus: "MENUNGGU_SINKRON",
          retryAttempt: Number(item.attempts || 0) + 1,
          syncedAt: new Date().toISOString(),
          appVersion: APP_VERSION,
          sourceDevice: APP_PLATFORM,
        };
        const result = await savePayloadToServer(payload);
        if (result?.opaque && isAttendancePayload(payload)) {
          const verified = await verifyAttendanceSavedOnServer(payload).catch(() => false);
          if (!verified) throw new Error("Server belum memberi konfirmasi JSON dan absensi belum terlihat di Spreadsheet.");
        }
        markQueuedPayloadSynced(payload, result);
        synced += 1;
      } catch (err) {
        const attempts = Number(item.attempts || 0) + 1;
        const failedPayload = {
          ...item.payload,
          syncStatus: attempts >= OFFLINE_RETRY_LIMIT ? "GAGAL_SINKRON" : "MENUNGGU_SINKRON",
          syncError: err.message,
          lastAttemptAt: new Date().toISOString(),
        };
        commitLocalPayload(failedPayload);
        failedItems.push({ ...item, payload: failedPayload, attempts, lastAttemptAt: new Date().toISOString(), lastError: err.message });
      }
    }

    persistPendingQueue(failedItems);
    setSyncing(false);

    if (synced > 0) {
      notify(`${synced} data offline berhasil disinkronkan.`);
      window.setTimeout(function syncDatabaseSecondPass() {
        syncDatabase(true).catch(function ignoreSyncError() { });
      }, BACKGROUND_SYNC_SECOND_PASS_MS);
    } else if (manual && failedItems.length) {
      notify(`Belum berhasil sinkron. ${failedItems.length} data tetap aman di perangkat.`, "error");
    }

    return { synced, failed: failedItems.length };
  };

  const inboxMessages = useMemo(() => currentUser ? getIncomingAdminMessages([...safeArray(db.pesan), ...safeArray(db.broadcast)], currentUser) : [], [db.pesan, db.broadcast, currentUser]);
  const notificationItems = useMemo(() => currentUser ? getUserNotifications(db, currentUser) : [], [db, currentUser]);
  const unreadInboxMessages = useMemo(() => inboxMessages.filter((item) => !readMessageKeys.includes(item.readKey || getMessageReadKey(item, currentUser))), [inboxMessages, readMessageKeys, currentUser]);
  const unreadNotifications = useMemo(() => notificationItems.filter((item) => !readNotificationKeys.includes(item.readKey || getNotificationReadKey(item, currentUser))), [notificationItems, readNotificationKeys, currentUser]);
  const quickAttendanceAction = useMemo(() => {
    if (!currentUser) return null;
    const role = detectRole(currentUser);
    const serverDate = getServerDate(serverTimeOffsetMs);
    const today = nowParts(serverDate).dateOnly;
    const todayRecords = safeArray(db.absensi).filter((r) => String(getVal(r, "userId")) === String(getVal(currentUser, "id")) && formatDateIndo(getVal(r, "date")) === today);
    const approvedLeaveToday = getApprovedLeaveForDate(db.cuti, currentUser, serverDate);
    const menuItems = buildAttendanceMenu(role, todayRecords).map((item) => approvedLeaveToday ? { ...item, disabled: true, statusText: "Terkunci: cuti disetujui" } : item);
    return menuItems.find((item) => !item.disabled && ACTION_STYLE[item.action]) || null;
  }, [currentUser, db.absensi, db.cuti, serverTimeOffsetMs]);

  const markMessagesRead = (items = inboxMessages) => {
    const keys = safeArray(items).map((item) => item.readKey || getMessageReadKey(item, currentUser));
    setReadMessageKeys((prev) => {
      const next = uniqueKeys([...prev, ...keys]);
      writeCache(STORAGE_KEYS.readMessages, next);
      return next;
    });
  };

  const markNotificationsRead = (items = notificationItems) => {
    const keys = safeArray(items).map((item) => item.readKey || getNotificationReadKey(item, currentUser));
    setReadNotificationKeys((prev) => {
      const next = uniqueKeys([...prev, ...keys]);
      writeCache(STORAGE_KEYS.readNotifications, next);
      return next;
    });
  };

  const openInboxAndMarkRead = () => {
    markMessagesRead(inboxMessages);
    setOpenInbox(true);
  };

  const openNotificationsAndMarkRead = () => {
    markNotificationsRead(notificationItems);
    setOpenNotifications(true);
  };

  const dismissUpdate = () => {
    if (updateInfo?.required) return;
    const version = updateInfo?.latestVersion || "";
    if (version) {
      localStorage.setItem(STORAGE_KEYS.dismissedUpdateVersion, version);
      setDismissedUpdateVersion(version);
    }
    setUpdateInfo(null);
  };

  const openUpdateUrl = () => {
    const url = updateInfo?.apkUrl;
    if (!url) return notify("Link APK terbaru belum tersedia di database update.", "error");
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const runUpdateCheck = async (silent = true) => {
    if (!silent) setUpdateChecking(true);
    try {
      const info = await checkAppUpdate();
      if (info?.hasUpdate && (info.required || info.latestVersion !== dismissedUpdateVersion)) {
        setUpdateInfo(info);
      } else if (!silent) {
        notify("Aplikasi sudah memakai versi terbaru.");
      }
      return info;
    } catch (err) {
      if (!silent) notify(`Gagal cek update: ${err.message}`, "error");
      return null;
    } finally {
      if (!silent) setUpdateChecking(false);
    }
  };

  const syncDatabase = async (silent = false) => {
    if (!silent) setSyncing(true);
    try {
      const data = currentUser ? await syncEmployee(currentUser) : await apiGet({ action: "employees" });
      const serverMs = Date.parse(data.serverTime || data.server_time || data.serverTimestamp || data.server_timestamp || "");
      const nextOffset = Number.isFinite(serverMs) ? serverMs - Date.now() : serverTimeOffsetMs;
      if (Number.isFinite(serverMs)) setServerTimeOffsetMs(nextOffset);

      let outputDb = null;
      setDb((prev) => {
        const nextDb = {
          // Firebase menjadi sumber utama. Kalau data di Firebase dihapus,
          // aplikasi/admin harus ikut kosong, bukan pakai cache lama.
          karyawan: safeArray(data.karyawan),
          absensi: mergeRowsFirebaseTruth(safeArray(data.absensi), prev.absensi),
          laporan: mergeRowsFirebaseTruth(safeArray(data.laporan), prev.laporan),
          cuti: mergeRowsFirebaseTruth(safeArray(data.cuti), prev.cuti),
          pesan: safeArray(data.pesan),
          broadcast: safeArray(data.broadcast),
          kalender_nasional: safeArray(data.kalender_nasional),
          hari_libur: safeArray(data.hari_libur),
          jam_kerja: safeArray(data.jam_kerja),
        };

        outputDb = nextDb;
        if (currentUser) {
          const freshUser = nextDb.karyawan.find((u) => String(getVal(u, "id")).toUpperCase() === String(getVal(currentUser, "id")).toUpperCase());
          if (freshUser) {
            const mergedUser = mergeUserProfileData(currentUser, freshUser);
            outputDb = {
              ...nextDb,
              karyawan: nextDb.karyawan.map((u) => String(getVal(u, "id")).toUpperCase() === String(getVal(currentUser, "id")).toUpperCase() ? mergedUser : u),
            };
            setCurrentUser(mergedUser);
            writeCache(STORAGE_KEYS.user, mergedUser);
          }
        }

        writeCache(STORAGE_KEYS.db, outputDb);
        return outputDb;
      });

      const stamp = nowParts(getServerDate(nextOffset)).time;
      setLastSync(stamp);
      localStorage.setItem(STORAGE_KEYS.lastSync, stamp);
      return outputDb || data;
    } catch (err) {
      if (!silent) notify(`Gagal sinkron database: ${err.message}`, "error");
      return null;
    } finally {
      if (!silent) setSyncing(false);
    }
  };

  const upsertLocalRow = (rows, row) => {
    const list = safeArray(rows);
    const rowId = String(getVal(row, "id") || getVal(row, "requestId") || getVal(row, "clientRequestId") || getVal(row, "idempotencyKey") || "").trim();
    if (!rowId) return [row, ...list];
    const index = list.findIndex((item) => {
      const itemId = String(getVal(item, "id") || getVal(item, "requestId") || getVal(item, "clientRequestId") || getVal(item, "idempotencyKey") || "").trim();
      return itemId === rowId;
    });
    if (index < 0) return [row, ...list];
    return list.map((item, i) => (i === index ? { ...item, ...row } : item));
  };

  const normalizeDateKey = (value) => {
    const raw = String(value || "").replace(/^'/, "").trim();
    if (!raw) return "";
    if (/^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}/.test(raw)) return raw.slice(0, 10);
    const ms = parseDateToMillis(raw);
    if (ms) return dateOnlyISO(new Date(ms));
    return raw;
  };

  const normalizeTimeKey = (value) => String(value || "").split(".").join(":").trim();

  const getAttendanceUserKey = (row = {}) => String(getVal(row, "userId") || getVal(row, "idKaryawan") || getVal(row, "employeeId") || getVal(row, "id") || "").toUpperCase().trim();

  const getAttendanceActionKey = (row = {}) => {
    const label = getVal(row, "actionType") || getVal(row, "attendanceAction") || getVal(row, "aksi") || getVal(row, "jenisAbsensi") || getVal(row, "originalAction") || getVal(row, "action") || "Absensi";
    return String(label || "Absensi").trim();
  };

  const getAttendanceSubmitKey = (row = {}) => {
    const existing = getVal(row, "clientRequestId") || getVal(row, "idempotencyKey") || getVal(row, "requestId");
    if (existing) return String(existing).trim();
    const userId = getAttendanceUserKey(row) || "USER";
    const date = normalizeDateKey(getVal(row, "date") || getVal(row, "tanggal")) || dateOnlyISO(new Date());
    const actionSlug = getAttendanceActionKey(row).replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "") || "Absensi";
    return `${userId}-${date}-${actionSlug}`;
  };

  const isSameAttendanceRecord = (a = {}, b = {}) => {
    const aUser = getAttendanceUserKey(a);
    const bUser = getAttendanceUserKey(b);
    const aDate = normalizeDateKey(getVal(a, "date") || getVal(a, "tanggal"));
    const bDate = normalizeDateKey(getVal(b, "date") || getVal(b, "tanggal"));
    const aAction = normalizeText(getAttendanceActionKey(a));
    const bAction = normalizeText(getAttendanceActionKey(b));
    return Boolean(aUser && bUser && aUser === bUser && aDate && bDate && aDate === bDate && aAction && bAction && aAction === bAction);
  };

  const normalizeAttendanceClientPayload = (row = {}) => {
    const actionLabel = getAttendanceActionKey(row);
    const userId = getAttendanceUserKey(row);
    const date = normalizeDateKey(getVal(row, "date") || getVal(row, "tanggal")) || dateOnlyISO(new Date());
    const time = normalizeTimeKey(getVal(row, "time") || getVal(row, "jam") || getVal(row, "waktu") || nowParts().time);
    const requestId = getAttendanceSubmitKey({ ...row, userId, date, actionType: actionLabel });
    return {
      ...row,
      action: actionLabel,
      actionType: actionLabel,
      attendanceAction: actionLabel,
      aksi: actionLabel,
      jenisAbsensi: actionLabel,
      userId,
      idKaryawan: getVal(row, "idKaryawan") || userId,
      employeeId: getVal(row, "employeeId") || userId,
      name: getVal(row, "name") || getVal(row, "nama"),
      nama: getVal(row, "nama") || getVal(row, "name"),
      date,
      tanggal: date,
      time,
      jam: time,
      id: getVal(row, "id") || requestId,
      requestId,
      clientRequestId: requestId,
      idempotencyKey: requestId,
    };
  };

  const getUserKey = (row = {}) => String(getVal(row, "userId") || getVal(row, "idKaryawan") || getVal(row, "employeeId") || getVal(row, "id") || "").toUpperCase().trim();

  const normalizeLeaveClientPayload = (row = {}) => {
    const userId = getUserKey(row) || String(getVal(currentUser, "id") || getVal(currentUser, "userId") || getVal(currentUser, "idKaryawan") || "").toUpperCase();
    const type = getVal(row, "type") || getVal(row, "jenis") || getVal(row, "jenisCuti") || "Pengajuan";
    const start = normalizeDateKey(getVal(row, "dateStart") || getVal(row, "tanggalMulai") || String(getVal(row, "start") || "").split(" s/d ")[0] || getVal(row, "date")) || dateOnlyISO(new Date());
    const end = normalizeDateKey(getVal(row, "dateEnd") || getVal(row, "tanggalSelesai") || getVal(row, "end") || start) || start;
    const date = normalizeDateKey(getVal(row, "date") || getVal(row, "tanggal")) || dateOnlyISO(new Date());
    const time = normalizeTimeKey(getVal(row, "time") || getVal(row, "jam") || nowParts().time);
    const actionSlug = String(type).replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "") || "Pengajuan";
    const requestId = String(getVal(row, "clientRequestId") || getVal(row, "idempotencyKey") || getVal(row, "requestId") || getVal(row, "id") || `CUTI-${userId}-${start}-${actionSlug}`);
    const name = getVal(row, "name") || getVal(row, "nama") || getVal(currentUser, "name") || getVal(currentUser, "nama") || "";

    return {
      ...row,
      action: "cuti",
      id: getVal(row, "id") || requestId,
      requestId,
      clientRequestId: requestId,
      idempotencyKey: requestId,
      userId,
      idKaryawan: getVal(row, "idKaryawan") || userId,
      employeeId: getVal(row, "employeeId") || userId,
      id_karyawan: getVal(row, "id_karyawan") || userId,
      name,
      nama: getVal(row, "nama") || name,
      type,
      jenis: getVal(row, "jenis") || type,
      jenisCuti: getVal(row, "jenisCuti") || type,
      start: getVal(row, "start") || (end && end !== start ? `${start} s/d ${end}` : start),
      end,
      dateStart: start,
      dateEnd: end,
      tanggalMulai: start,
      tanggalSelesai: end,
      date,
      tanggal: date,
      time,
      jam: time,
      reason: getVal(row, "reason") || getVal(row, "alasan") || "",
      alasan: getVal(row, "alasan") || getVal(row, "reason") || "",
      status: getVal(row, "status") || "Menunggu",
    };
  };

  const mergeRowsKeepLocalRecent = (serverRows, localRows) => {
    const merged = [];
    const seen = new Set();
    const add = (row) => {
      if (!row) return;
      const key = String(getVal(row, "clientRequestId") || getVal(row, "idempotencyKey") || getVal(row, "requestId") || (isAttendancePayload(row) ? getAttendanceSubmitKey(row) : "") || getVal(row, "id") || `${getVal(row, "userId")}-${getVal(row, "date")}-${getVal(row, "time")}-${getVal(row, "action")}`).trim();
      if (key && seen.has(key)) return;
      if (key) seen.add(key);
      merged.push(row);
    };

    safeArray(serverRows).forEach(add);

    const now = Date.now();
    safeArray(localRows)
      .filter((row) => {
        const syncStatus = String(getVal(row, "syncStatus") || "").toUpperCase();
        const ts = Number(getVal(row, "timestamp") || parseDateToMillis(getVal(row, "date") || getVal(row, "tanggal")) || 0);
        const recent = Number.isFinite(ts) && ts > 0 && now - ts < 24 * 60 * 60 * 1000;
        return ["MENUNGGU_SINKRON", "GAGAL_SINKRON"].includes(syncStatus) || (!safeArray(serverRows).length && syncStatus === "MENUNGGU_SINKRON" && recent);
      })
      .forEach(add);

    return merged;
  };

  const mergeRowsFirebaseTruth = (serverRows, localRows) => {
    // Khusus Firebase: server adalah sumber kebenaran.
    // Kalau admin menghapus data cuti/absensi/laporan di Firebase, data lokal ikut hilang.
    // Yang dipertahankan hanya data lokal yang BENAR-BENAR belum terkirim/gagal sinkron.
    const merged = [];
    const seen = new Set();
    const add = (row) => {
      if (!row) return;
      const key = String(getVal(row, "clientRequestId") || getVal(row, "idempotencyKey") || getVal(row, "requestId") || getVal(row, "id") || `${getVal(row, "userId")}-${getVal(row, "date")}-${getVal(row, "time")}-${getVal(row, "action")}`).trim();
      if (key && seen.has(key)) return;
      if (key) seen.add(key);
      merged.push(row);
    };

    safeArray(serverRows).forEach(add);
    safeArray(localRows)
      .filter((row) => {
        const syncStatus = String(getVal(row, "syncStatus") || "").toUpperCase();
        return ["MENUNGGU_SINKRON", "GAGAL_SINKRON"].includes(syncStatus) && getVal(row, "offlineMode") === true;
      })
      .forEach(add);

    return merged;
  };

  const applyFirebaseSnapshotToApp = (rawSnapshot = {}, options = {}) => {
    const normalized = normalizeFirebaseDbPayload(rawSnapshot || {});
    const serverMs = Date.parse(normalized.serverTime || "");
    if (Number.isFinite(serverMs)) setServerTimeOffsetMs(serverMs - Date.now());

    setDb((prev) => {
      const nextDb = {
        karyawan: safeArray(normalized.karyawan),
        absensi: mergeRowsFirebaseTruth(safeArray(normalized.absensi), prev.absensi),
        laporan: mergeRowsFirebaseTruth(safeArray(normalized.laporan), prev.laporan),
        cuti: mergeRowsFirebaseTruth(safeArray(normalized.cuti), prev.cuti),
        pesan: safeArray(normalized.pesan),
        broadcast: safeArray(normalized.broadcast),
        kalender_nasional: safeArray(normalized.kalender_nasional),
        hari_libur: safeArray(normalized.hari_libur),
        jam_kerja: safeArray(normalized.jam_kerja),
      };

      if (currentUser) {
        const currentId = String(getVal(currentUser, "id") || getVal(currentUser, "userId") || getVal(currentUser, "idKaryawan") || "").toUpperCase();
        const freshUser = nextDb.karyawan.find((u) => String(getVal(u, "id") || getVal(u, "userId") || getVal(u, "idKaryawan") || "").toUpperCase() === currentId);
        if (freshUser) {
          const mergedUser = mergeUserProfileData(currentUser, freshUser);
          setCurrentUser(mergedUser);
          writeCache(STORAGE_KEYS.user, mergedUser);
        }
      }

      writeCache(STORAGE_KEYS.db, nextDb);
      return nextDb;
    });

    const stamp = nowParts(getServerDate(Number.isFinite(serverMs) ? serverMs - Date.now() : serverTimeOffsetMs)).time;
    setLastSync(stamp);
    localStorage.setItem(STORAGE_KEYS.lastSync, stamp);

    if (options.showToast) notify("Perubahan Firebase sudah masuk ke aplikasi.");
    return normalized;
  };

  const commitLocalPayload = (payload) => {
    const actionRaw = normalizeText(payload?.action || "");
    const cleanPayload = { ...payload, syncStatus: payload.syncStatus || "MENUNGGU_SINKRON" };
    if (!payload) return;

    setDb((prev) => {
      let next = { ...prev };
      const isReport = actionRaw.includes("report") || actionRaw.includes("laporan");
      const isLeave = actionRaw === "cuti" || actionRaw.includes("leave") || actionRaw.includes("pengajuan_cuti") || actionRaw.includes("izin_sakit");
      const isMessage = actionRaw.includes("message") || actionRaw.includes("pesan");
      const isProfile = actionRaw.includes("profile") || actionRaw.includes("profil");
      const isAttendance = ACTION_STYLE[payload.action] || /absen|shift|patroli|istirahat|bertugas|tiba|pulang|libur/.test(actionRaw);

      if (isProfile) {
        const targetId = String(getVal(payload, "id") || getVal(payload, "userId") || getVal(currentUser, "id") || "").toUpperCase();
        next.karyawan = safeArray(prev.karyawan).map((row) => String(getVal(row, "id") || getVal(row, "userId") || "").toUpperCase() === targetId ? { ...row, ...cleanPayload } : row);
      } else if (isReport) {
        next.laporan = upsertLocalRow(prev.laporan, cleanPayload);
      } else if (isLeave) {
        next.cuti = upsertLocalRow(prev.cuti, normalizeLeaveClientPayload(cleanPayload));
      } else if (isMessage) {
        next.pesan = upsertLocalRow(prev.pesan, cleanPayload);
      } else if (isAttendance) {
        next.absensi = upsertLocalRow(prev.absensi, normalizeAttendanceClientPayload(cleanPayload));
      }

      writeCache(STORAGE_KEYS.db, next);
      return next;
    });
  };

  const queueServerSave = (payload, successText) => {
    savePayloadToServer(payload)
      .then((result) => {
        const syncedPayload = {
          ...payload,
          syncStatus: "TERSINKRON",
          syncedAt: new Date().toISOString(),
          serverResponse: result?.message || "Berhasil",
        };
        commitLocalPayload(syncedPayload);

        const actionRaw = normalizeText(getVal(payload, "action") || getVal(payload, "originalAction") || "");
        const isProfileUpdate = actionRaw.includes("profile") || actionRaw.includes("profil") || actionRaw.includes("update_employee");
        if (isProfileUpdate && currentUser) {
          const nextUser = mergeUserProfileData(currentUser, syncedPayload);
          delete nextUser.action;
          setCurrentUser(nextUser);
          writeCache(STORAGE_KEYS.user, nextUser);
        }

        if (successText) notify(successText);

        // Google Spreadsheet tidak realtime seperti Firebase/WebSocket.
        // Karena Apps Script kadang butuh jeda menulis data, aplikasi melakukan 2x silent refresh:
        // pertama cepat, kedua sebagai konfirmasi setelah Spreadsheet selesai commit.
        window.setTimeout(function syncDatabaseSoon() {
          syncDatabase(true).catch(function ignoreSyncError() { });
        }, BACKGROUND_SYNC_DELAY_MS);
        window.setTimeout(function syncDatabaseSecondPass() {
          syncDatabase(true).catch(function ignoreSyncError() { });
        }, BACKGROUND_SYNC_SECOND_PASS_MS);

        // Event lokal untuk kebutuhan debugging / integrasi jika suatu saat app dan admin dijalankan satu origin.
        try {
          window.dispatchEvent(new CustomEvent("karsa:server-saved", { detail: { action: payload?.action, id: payload?.id, result } }));
        } catch {
          // ignore
        }
      })
      .catch((err) => {
        const queuedPayload = queueOfflinePayload(payload, err.message);
        commitLocalPayload(queuedPayload);
        notify(`Database belum merespons. Data disimpan lokal dan akan dikirim ulang otomatis.`, "error");
      });
  };

  useEffect(() => {
    const updateOnline = () => {
      const online = isNetworkOnline();
      setIsOnline(online);
      if (online) window.setTimeout(function flushQueueWhenOnline() {
        flushOfflineQueue(true).catch(function ignoreFlushError() { });
      }, 500);
    };

    window.addEventListener("online", updateOnline);
    window.addEventListener("offline", updateOnline);
    updateOnline();

    return () => {
      window.removeEventListener("online", updateOnline);
      window.removeEventListener("offline", updateOnline);
    };
  }, [pendingQueue.length]);

  useEffect(() => {
    if (isOnline && pendingQueue.length > 0) {
      const timer = window.setTimeout(function flushQueueLater() {
        flushOfflineQueue(true).catch(function ignoreFlushError() { });
      }, 1200);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isOnline, pendingQueue.length]);

  useEffect(() => {
    syncDatabase(true);
    runUpdateCheck(true);

    const timer = setInterval(() => syncDatabase(true), APP_AUTO_SYNC_MS);
    const updateTimer = setInterval(() => runUpdateCheck(true), UPDATE_CHECK_INTERVAL_MS);
    const onFocus = () => {
      setTimeout(() => syncDatabase(true), 150);
      setTimeout(() => runUpdateCheck(true), 700);
    };
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        syncDatabase(true);
        runUpdateCheck(true);
      }
    };

    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      clearInterval(timer);
      clearInterval(updateTimer);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  useEffect(() => {
    // Realtime Database listener: setiap data Firebase berubah/hapus/tambah,
    // aplikasi langsung update tanpa menunggu refresh manual.
    if (typeof EventSource === "undefined") return undefined;

    let closedByApp = false;
    let source = null;
    let reconnectTimer = null;

    const connectRealtime = () => {
      try {
        source = new EventSource(getFirebaseRealtimeUrl());

        source.addEventListener("put", (event) => {
          if (closedByApp) return;
          try {
            const payload = JSON.parse(event.data || "{}");
            if (payload.path === "/") {
              applyFirebaseSnapshotToApp(payload.data || {});
              return;
            }
            syncDatabase(true);
          } catch {
            syncDatabase(true);
          }
        });

        source.addEventListener("patch", () => {
          if (closedByApp) return;
          // Patch bisa berisi perubahan sebagian node. Supaya delete/add tidak salah merge,
          // kita ambil ulang snapshot penuh Firebase.
          syncDatabase(true);
        });

        source.onerror = () => {
          if (closedByApp) return;
          try { source?.close?.(); } catch { }
          reconnectTimer = window.setTimeout(connectRealtime, 2500);
        };
      } catch {
        reconnectTimer = window.setTimeout(() => syncDatabase(true), 2500);
      }
    };

    connectRealtime();

    return () => {
      closedByApp = true;
      if (reconnectTimer) window.clearTimeout(reconnectTimer);
      try { source?.close?.(); } catch { }
    };
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) writeCache(STORAGE_KEYS.user, currentUser);
    else localStorage.removeItem(STORAGE_KEYS.user);
  }, [currentUser]);

  useEffect(() => {
    if (!toast.message) return undefined;
    const timeoutMs = toast.type === "error" ? TOAST_ERROR_AUTO_CLOSE_MS : TOAST_SUCCESS_AUTO_CLOSE_MS;
    const timer = setTimeout(() => setToast({ message: "", type: "success" }), timeoutMs);
    return () => clearTimeout(timer);
  }, [toast.message, toast.type]);

  const showLoginTransition = () => {
    setLoginTransition(true);
    window.setTimeout(() => setLoginTransition(false), 740);
  };


  const findEmployeeForLogin = (employees, id, pin) => {
    const inputId = String(id || "").toUpperCase().trim();
    const inputKrs = inputId.replace(/^KS-/, "KRS-");
    const inputKs = inputId.replace(/^KRS-/, "KS-");
    return safeArray(employees).find((u) => {
      const ids = [
        getVal(u, "id"),
        getVal(u, "userId"),
        getVal(u, "idKaryawan"),
        getVal(u, "id_karyawan"),
        getVal(u, "oldId"),
        getVal(u, "idLama"),
      ].map((value) => String(value || "").toUpperCase().trim()).filter(Boolean);
      const matchId = ids.some((rowId) => rowId === inputId || rowId.replace(/^KS-/, "KRS-") === inputKrs || rowId.replace(/^KRS-/, "KS-") === inputKs);
      const pass = String(getVal(u, "password") || getVal(u, "sandi") || getVal(u, "pin") || "").trim();
      const status = normalizeText(getVal(u, "status") || "Aktif");
      return matchId && pass === String(pin).trim() && !["tidak aktif", "resign", "nonaktif"].includes(status);
    });
  };

  const handleLogin = async (id, pin) => {
    setSyncing(true);
    const cleanId = String(id || "").toUpperCase().trim();
    const cleanPin = String(pin || "").trim();

    try {
      if (!cleanId || !cleanPin) {
        notify("ID karyawan dan PIN wajib diisi.", "error");
        return;
      }

      try {
        const loginResult = await apiPost({ action: "login", id: cleanId, userId: cleanId, idKaryawan: cleanId, password: cleanPin, pin: cleanPin, sandi: cleanPin });
        const serverUser = loginResult?.user || loginResult?.employee || loginResult?.profile || loginResult?.data?.user || loginResult?.data?.employee || loginResult?.data?.profile || loginResult?.data || loginResult;
        if (serverUser && typeof serverUser === "object") {
          const nextUser = mergeUserProfileData(serverUser, serverUser);
          showLoginTransition();
          setCurrentUser(nextUser);
          writeCache(STORAGE_KEYS.user, nextUser);
          setScreen("home");
          notify(`Selamat datang, ${getVal(nextUser, "name") || getVal(nextUser, "nama") || "Karyawan"}.`);

          try {
            const fresh = await apiGet({ action: "sync", role: "employee", userId: getVal(nextUser, "id") || cleanId });
            const serverMs = Date.parse(fresh.serverTime?.iso || fresh.serverTime || fresh.server_time || fresh.serverTimestamp || fresh.server_timestamp || "");
            if (Number.isFinite(serverMs)) setServerTimeOffsetMs(serverMs - Date.now());
            const nextDb = {
              karyawan: safeArray(fresh.karyawan).length ? safeArray(fresh.karyawan) : [nextUser],
              absensi: safeArray(fresh.absensi),
              laporan: safeArray(fresh.laporan),
              cuti: safeArray(fresh.cuti),
              pesan: safeArray(fresh.pesan),
              broadcast: safeArray(fresh.broadcast),
              kalender_nasional: safeArray(fresh.kalender_nasional),
              hari_libur: safeArray(fresh.hari_libur),
              jam_kerja: safeArray(fresh.jam_kerja),
            };
            setDb(nextDb);
            writeCache(STORAGE_KEYS.db, nextDb);
          } catch {
            syncDatabase(true).catch(function ignoreSyncError() { });
          }
          return;
        }
      } catch (err) {
        // Fallback lokal tetap dipakai agar aplikasi masih bisa login saat handler login GS belum aktif.
        const message = String(err?.message || "");
        if (/nonaktif|password salah|pin|tidak ditemukan|wajib/i.test(message)) {
          throw err;
        }
      }

      const cachedEmployee = findEmployeeForLogin(db.karyawan, cleanId, cleanPin);
      if (cachedEmployee) {
        showLoginTransition();
        setCurrentUser(cachedEmployee);
        setScreen("home");
        notify(`Selamat datang, ${getVal(cachedEmployee, "name") || "Karyawan"}.`);
        setSyncing(false);
        syncDatabase(true).catch(function ignoreSyncError() { });
        return;
      }

      let employees = db.karyawan;
      try {
        const fresh = await apiGet({ action: "employees" });
        const serverMs = Date.parse(fresh.serverTime?.iso || fresh.serverTime || fresh.server_time || fresh.serverTimestamp || fresh.server_timestamp || "");
        if (Number.isFinite(serverMs)) setServerTimeOffsetMs(serverMs - Date.now());
        employees = safeArray(fresh.karyawan);
        const nextDb = { ...db, karyawan: employees, absensi: safeArray(fresh.absensi), laporan: safeArray(fresh.laporan), cuti: safeArray(fresh.cuti), pesan: safeArray(fresh.pesan), broadcast: safeArray(fresh.broadcast), kalender_nasional: safeArray(fresh.kalender_nasional), hari_libur: safeArray(fresh.hari_libur), jam_kerja: safeArray(fresh.jam_kerja) };
        setDb(nextDb);
        writeCache(STORAGE_KEYS.db, nextDb);
      } catch (err) {
        notify(`Database lambat / belum tersambung: ${err.message}`, "error");
      }

      const employee = findEmployeeForLogin(employees, cleanId, cleanPin);

      if (!employee) {
        notify("ID karyawan atau PIN tidak cocok.", "error");
        return;
      }

      showLoginTransition();
      setCurrentUser(employee);
      setScreen("home");
      notify(`Selamat datang, ${getVal(employee, "name") || "Karyawan"}.`);
    } catch (err) {
      notify(err.message || "Login gagal.", "error");
    } finally {
      setSyncing(false);
    }
  };

  const handleForgotPin = async (id, text) => {
    const parts = nowParts(getServerDate(serverTimeOffsetMs));
    try {
      await apiPost({
        action: "send_message",
        id: `MSG-${Date.now()}`,
        userId: String(id || "").toUpperCase(),
        name: "Permintaan Reset PIN",
        type: "Lupa Sandi",
        pesan: text || "Saya lupa PIN login, mohon bantuan HRD.",
        status: "Terkirim",
        waktu: parts.time.slice(0, 5),
        date: parts.dateOnly,
        timestamp: parts.timestamp,
      });
      notify("Permintaan reset PIN sudah dikirim ke HRD.");
    } catch (err) {
      notify(`Gagal mengirim permintaan: ${err.message}`, "error");
    }
  };

  const handleSave = async (payload, successText) => {
    if (!payload) return { status: "empty" };

    if (isAttendancePayload(payload)) {
      const prepared = normalizeAttendanceClientPayload(payload);
      const submitKey = getAttendanceSubmitKey(prepared);
      const actionLabel = getAttendanceActionKey(prepared);
      const repeatable = ["patroli area", "tiba di lokasi"].includes(normalizeText(actionLabel));

      if (attendanceSubmitLockRef.current.has(submitKey)) {
        notify("Absensi sedang diproses. Jangan tekan simpan dua kali.", "error");
        return { status: "locked" };
      }

      const alreadyLocal = safeArray(db.absensi).some((row) => isSameAttendanceRecord(row, prepared));
      if (alreadyLocal && !repeatable) {
        commitLocalPayload({ ...prepared, syncStatus: "TERSINKRON" });
        notify(`${actionLabel} sudah tercatat hari ini.`);
        return { status: "already_local" };
      }

      attendanceSubmitLockRef.current.add(submitKey);
      try {
        if (!isNetworkOnline()) {
          const queuedPayload = queueOfflinePayload({
            ...prepared,
            syncStatus: "MENUNGGU_SINKRON",
            offlineMode: true,
            verificationStatus: "MENUNGGU_VERIFIKASI_SERVER",
          }, "Perangkat offline saat absensi dibuat");
          commitLocalPayload(queuedPayload);
          notify("Absensi tersimpan lokal. Akan otomatis dikirim saat internet aktif.", "error");
          return { status: "queued_offline" };
        }

        try {
          const check = await attendanceCheck(prepared);
          const blocked = check?.success === false || check?.ok === false || check?.allowed === false || check?.data?.allowed === false;
          const blockMessage = String(check?.message || check?.data?.message || check?.geofence?.message || "");
          const isLocationOnlyBlock = /lokasi|geofence|radius|jarak|titik|koordinat|gps|akurasi/i.test(blockMessage);
          if (blocked && !isLocationOnlyBlock) {
            notify(check?.message || check?.data?.message || "Absensi ditolak oleh aturan jam kerja GS.", "error");
            return { status: "blocked", result: check };
          }
          if (blocked && isLocationOnlyBlock) {
            prepared.locationPolicy = "NO_LOCATION_BLOCK";
            prepared.outsideGeofenceAllowed = true;
            prepared.geofenceImpact = "TIDAK_MEMBLOKIR_ABSENSI";
            prepared.keteranganLokasi = prepared.keteranganLokasi || `Jauh dari titik lokasi: ${blockMessage || "di luar radius/geofence"}`;
            prepared.locationNote = prepared.locationNote || prepared.keteranganLokasi;
          }
        } catch (err) {
          const message = String(err?.message || "");
          const isLocationValidationError = /lokasi|geofence|radius|jarak|titik|koordinat|gps|akurasi/i.test(message);
          if (!isLocationValidationError && !/database|membaca|sync|server|fetch|timeout|network/i.test(message)) {
            notify(`Gagal validasi absensi: ${err.message}`, "error");
            return { status: "error", error: err };
          }
          if (/database|membaca|sync|server|fetch|timeout|network/i.test(message)) {
            prepared.validationWarning = `attendance_check dilewati: ${message}`;
          }
          prepared.locationPolicy = "NO_LOCATION_BLOCK";
          prepared.outsideGeofenceAllowed = true;
          prepared.geofenceImpact = "TIDAK_MEMBLOKIR_ABSENSI";
          prepared.keteranganLokasi = prepared.keteranganLokasi || `Jauh dari titik lokasi: ${message || "validasi lokasi dilewati"}`;
          prepared.locationNote = prepared.locationNote || prepared.keteranganLokasi;
        }

        const result = await submitAttendance(prepared);
        if (result?.opaque) {
          const verified = await verifyAttendanceSavedOnServer(prepared).catch(() => false);
          if (!verified) {
            const queuedPayload = queueOfflinePayload({
              ...prepared,
              syncStatus: "MENUNGGU_SINKRON",
              verificationStatus: "MENUNGGU_VERIFIKASI_SERVER",
              syncError: "Absensi belum terlihat di Spreadsheet setelah submit.",
            }, "Absensi belum terlihat di Spreadsheet setelah submit.");
            commitLocalPayload(queuedPayload);
            notify("Absensi belum terlihat di Spreadsheet. Data disimpan di antrean sinkron dan akan dicoba ulang otomatis.", "error");
            return { status: "queued_verification", result };
          }
        }

        const savedPayload = normalizeAttendanceClientPayload({
          ...prepared,
          syncStatus: "TERSINKRON",
          serverVerified: true,
          serverResponse: result?.message || "Berhasil",
          savedAt: new Date().toISOString(),
        });

        commitLocalPayload(savedPayload);
        notify(successText || result?.message || "Absensi berhasil disimpan.");

        window.setTimeout(function syncDatabaseSoon() {
          syncDatabase(true).catch(function ignoreSyncError() { });
        }, BACKGROUND_SYNC_DELAY_MS);
        window.setTimeout(function syncDatabaseSecondPass() {
          syncDatabase(true).catch(function ignoreSyncError() { });
        }, BACKGROUND_SYNC_SECOND_PASS_MS);

        return { status: "saved", result };
      } catch (err) {
        const queuedPayload = queueOfflinePayload({
          ...prepared,
          syncStatus: "MENUNGGU_SINKRON",
          verificationStatus: "MENUNGGU_VERIFIKASI_SERVER",
          syncError: err.message,
        }, err.message);
        commitLocalPayload(queuedPayload);
        notify("Absensi disimpan lokal. Akan otomatis dikirim saat koneksi/server siap.", "error");
        return { status: "queued_offline", error: err };
      } finally {
        attendanceSubmitLockRef.current.delete(submitKey);
      }
    }

    if (isLeavePayload(payload)) {
      const preparedLeave = normalizeLeaveClientPayload(payload);
      commitLocalPayload({ ...preparedLeave, syncStatus: "MENUNGGU_SINKRON" });
      notify(successText || "Pengajuan sedang dikirim ke database.");

      if (!isNetworkOnline()) {
        const queuedPayload = queueOfflinePayload(preparedLeave, "Perangkat offline saat pengajuan dibuat");
        commitLocalPayload(queuedPayload);
        notify("Pengajuan tersimpan lokal. Akan otomatis dikirim saat internet aktif.", "error");
        return { status: "queued_offline" };
      }

      submitLeaveRequest(preparedLeave)
        .then((result) => {
          commitLocalPayload({ ...preparedLeave, syncStatus: "TERSINKRON", serverResponse: result?.message || "Berhasil", savedAt: new Date().toISOString() });
          window.setTimeout(function syncDatabaseSoon() {
            syncDatabase(true).catch(function ignoreSyncError() { });
          }, BACKGROUND_SYNC_DELAY_MS);
          window.setTimeout(function syncDatabaseSecondPass() {
            syncDatabase(true).catch(function ignoreSyncError() { });
          }, BACKGROUND_SYNC_SECOND_PASS_MS);
        })
        .catch((err) => {
          const queuedPayload = queueOfflinePayload({ ...preparedLeave, syncStatus: "MENUNGGU_SINKRON", syncError: err.message }, err.message);
          commitLocalPayload(queuedPayload);
          notify("Pengajuan disimpan lokal. Akan otomatis dikirim saat koneksi/server siap.", "error");
        });

      return { status: "queued" };
    }

    commitLocalPayload(payload);
    notify(successText || "Data sedang dikirim ke database.");
    if (!isNetworkOnline()) {
      const queuedPayload = queueOfflinePayload(payload, "Perangkat offline saat data dibuat");
      commitLocalPayload(queuedPayload);
      notify("Data tersimpan lokal. Akan otomatis dikirim saat internet aktif.", "error");
      return { status: "queued_offline" };
    }
    queueServerSave(payload);
    return { status: "queued" };
  };

  const handleProfileSave = async (profile) => {
    const nowIso = new Date().toISOString();
    const payload = {
      ...profile,
      action: profile.action || "update_profile",
      id: getVal(profile, "id") || getVal(currentUser, "id"),
      userId: getVal(profile, "userId") || getVal(profile, "id") || getVal(currentUser, "id"),
      idKaryawan: getVal(profile, "idKaryawan") || getVal(profile, "id") || getVal(currentUser, "id"),
      profileUpdatedAt: getVal(profile, "profileUpdatedAt") || nowIso,
      photoUpdatedAt: getVal(profile, "photoUpdatedAt") || nowIso,
      updatedAt: getVal(profile, "updatedAt") || nowIso,
      syncStatus: "MENUNGGU_SINKRON",
    };

    const nextUserPending = mergeUserProfileData(currentUser, payload);
    delete nextUserPending.action;
    setCurrentUser(nextUserPending);
    writeCache(STORAGE_KEYS.user, nextUserPending);
    commitLocalPayload(payload);

    if (!isNetworkOnline()) {
      const queuedPayload = queueOfflinePayload(payload, "Perangkat offline saat update profil dibuat");
      commitLocalPayload(queuedPayload);
      notify("Profil tersimpan lokal. Akan otomatis disinkronkan saat internet aktif.", "error");
      return { status: "queued_offline" };
    }

    try {
      const result = await apiPost(payload);
      const syncedPayload = {
        ...payload,
        syncStatus: "TERSINKRON",
        syncedAt: new Date().toISOString(),
        serverResponse: result?.message || "Berhasil",
      };
      const nextUserSynced = mergeUserProfileData(nextUserPending, syncedPayload);
      delete nextUserSynced.action;
      setCurrentUser(nextUserSynced);
      writeCache(STORAGE_KEYS.user, nextUserSynced);
      commitLocalPayload(syncedPayload);
      notify(result?.message || "Profil berhasil diperbarui.");
      window.setTimeout(function syncDatabaseSecondPass() {
        syncDatabase(true).catch(function ignoreSyncError() { });
      }, BACKGROUND_SYNC_SECOND_PASS_MS);
      return { status: "saved", result };
    } catch (err) {
      const queuedPayload = queueOfflinePayload({ ...payload, syncError: err.message }, err.message);
      commitLocalPayload(queuedPayload);
      notify("Profil tersimpan lokal, tetapi belum berhasil masuk database. Coba tekan Sinkron setelah koneksi stabil.", "error");
      return { status: "queued_offline", error: err };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setScreen("home");
    notify("Kamu sudah keluar dari akun.");
  };

  if (!currentUser) {
    return (
      <>
        {loginTransition && <LoginTransitionOverlay />}
        <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: "", type: "success" })} />
        <LoginScreen onLogin={handleLogin} onForgotPin={handleForgotPin} syncing={syncing} lastSync={lastSync} />
        <AppUpdateModal info={updateInfo} checking={updateChecking} onUpdate={openUpdateUrl} onDismiss={dismissUpdate} onCheckAgain={() => runUpdateCheck(false)} />
      </>
    );
  }

  let content;
  let title = "Beranda";
  let subtitle = "Aplikasi absensi karyawan";

  if (screen === "home") content = <HomeScreen currentUser={currentUser} attendance={db.absensi} leaves={db.cuti} reports={db.laporan} onStartAction={setCaptureAction} setScreen={setScreen} onSaveLeave={(payload) => handleSave(payload, "Pengajuan berhasil dikirim.")} serverTimeOffsetMs={serverTimeOffsetMs} />;
  if (screen === "history") {
    title = "Riwayat Aktivitas";
    subtitle = "Absensi, laporan, pesan admin, pengajuan";
    content = <HistoryScreen currentUser={currentUser} attendance={db.absensi} leaves={db.cuti} reports={db.laporan} messages={db.pesan} onRefresh={() => syncDatabase(false)} />;
  }
  if (screen === "leave") {
    title = "Pengajuan";
    subtitle = "Izin, cuti, sakit";
    content = <LeaveScreen currentUser={currentUser} onSaveLeave={(payload) => handleSave(payload, "Pengajuan berhasil dikirim.")} />;
  }
  if (screen === "calendar") {
    title = "Kalender Nasional";
    subtitle = "Hari libur nasional";
    content = <CalendarNationalScreen db={db} serverTimeOffsetMs={serverTimeOffsetMs} />;
  }
  if (screen === "report") {
    title = "Laporan";
    subtitle = "Kirim laporan kerja";
    content = <ReportScreen currentUser={currentUser} onSaveReport={(payload) => handleSave(payload, "Laporan berhasil dikirim.")} />;
  }
  if (screen === "profile") {
    title = "Profil";
    subtitle = "Akun karyawan";
    content = <ProfileScreen currentUser={currentUser} attendance={db.absensi} leaves={db.cuti} reports={db.laporan} messages={[...safeArray(db.pesan), ...safeArray(db.broadcast)]} onSaveProfile={handleProfileSave} onSendMessage={(payload) => handleSave(payload, "Pesan berhasil dikirim.")} onLogout={logout} serverTimeOffsetMs={serverTimeOffsetMs} />;
  }

  return (
    <div className="h-[100dvh] min-h-[100dvh] w-full overflow-hidden karsa-genz-shell font-sans text-slate-900">
      <GenZBackdrop />
      {loginTransition && <LoginTransitionOverlay />}
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: "", type: "success" })} />
      <AppUpdateModal info={updateInfo} checking={updateChecking} onUpdate={openUpdateUrl} onDismiss={dismissUpdate} onCheckAgain={() => runUpdateCheck(false)} />
      <div className="mx-auto flex h-full w-full max-w-md overflow-hidden bg-white/80 shadow-2xl shadow-indigo-200/60 ring-1 ring-white/70 backdrop-blur md:h-full md:max-w-5xl md:rounded-[2.2rem] md:my-3 md:h-[calc(100dvh-1.5rem)]">
        <LeftTool screen={screen} setScreen={setScreen} currentUser={currentUser} onRefresh={() => syncDatabase(false)} syncing={syncing} onLogout={logout} />
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          {screen !== "home" && screen !== "profile" && <ScreenTitle title={title} subtitle={subtitle} />}
          <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
            {screen === "home" ? (
              <div className="flex-1 overflow-y-auto karsa-genz-shell">
                <AppHeader currentUser={currentUser} onRefresh={() => syncDatabase(false)} syncing={syncing} onLogout={logout} serverTimeOffsetMs={serverTimeOffsetMs} unreadMessageCount={unreadInboxMessages.length} unreadNotificationCount={unreadNotifications.length} onOpenMessages={openInboxAndMarkRead} onOpenNotifications={openNotificationsAndMarkRead} />
                <OfflineSyncBanner isOnline={isOnline} pendingCount={pendingQueue.length} syncing={syncing} onSync={() => flushOfflineQueue(false)} />
                {content}
              </div>
            ) : (
              content
            )}
          </div>
          <BottomNav screen={screen} setScreen={setScreen} currentUser={currentUser} quickAction={quickAttendanceAction} onQuickAttendance={() => quickAttendanceAction && setCaptureAction(quickAttendanceAction.action)} />
        </div>
      </div>

      {openNotifications && <NotificationSheet notifications={notificationItems} onClose={() => setOpenNotifications(false)} />}
      {openInbox && <InboxSheet messages={inboxMessages} onClose={() => setOpenInbox(false)} />}

      {captureAction && (
        <CaptureModal
          action={captureAction}
          currentUser={currentUser}
          onClose={() => setCaptureAction(null)}
          onSave={(payload) => handleSave(payload, "Absensi berhasil disimpan.")}
          serverTimeOffsetMs={serverTimeOffsetMs}
        />
      )}
    </div>
  );
}
