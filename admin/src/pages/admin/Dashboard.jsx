import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Users, MapPinned, MessageSquare, Star,
  Heart, ThumbsUp, TrendingUp, TrendingDown, ArrowRight,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";
import { toast } from "sonner";

import AdminLayout from "../../components/layout/AdminLayout";
import StatsCards from "../../components/dashboard/StatsCards";
import { getDashboardStats } from "../../services/dashboardApi";

/* ─── Mock time-series data (replace with real API data when available) ─── */
const growthData = [
  { month: "Jan", users: 320, destinations: 28, comments: 140 },
  { month: "Feb", users: 480, destinations: 31, comments: 198 },
  { month: "Mar", users: 610, destinations: 33, comments: 265 },
  { month: "Apr", users: 790, destinations: 36, comments: 310 },
  { month: "May", users: 1020, destinations: 39, comments: 390 },
  { month: "Jun", users: 1340, destinations: 42, comments: 455 },
  { month: "Jul", users: 1680, destinations: 44, comments: 510 },
  { month: "Aug", users: 1920, destinations: 46, comments: 562 },
  { month: "Sep", users: 2100, destinations: 47, comments: 598 },
  { month: "Oct", users: 2450, destinations: 48, comments: 634 },
];

const engagementData = [
  { name: "Wishlist", value: 0, color: "#f59e0b" },
  { name: "Reactions", value: 0, color: "#8b5cf6" },
  { name: "Comments", value: 0, color: "#10b981" },
  { name: "Ratings", value: 0, color: "#0ea5e9" },
];

const regionData = [
  { region: "North", destinations: 14 },
  { region: "South", destinations: 11 },
  { region: "East", destinations: 8 },
  { region: "West", destinations: 9 },
  { region: "Central", destinations: 4 },
  { region: "NE", destinations: 7 },
];

const recentActivity = [
  { dot: "#10b981", text: "New user Rahul Sharma signed up from Mumbai", time: "2 min ago" },
  { dot: "#0ea5e9", text: 'Comment on Manali — "Absolutely stunning views!"', time: "14 min ago" },
  { dot: "#f59e0b", text: "Goa Beaches added to wishlist by 3 users", time: "32 min ago" },
  { dot: "#8b5cf6", text: "New destination Kaziranga, Assam published", time: "1 hr ago" },
  { dot: "#ef4444", text: "Review on Varanasi flagged — pending moderation", time: "2 hr ago" },
  { dot: "#0ea5e9", text: "Priya Mehta left a 5-star rating on Munnar", time: "3 hr ago" },
];

/* ─── Stat card config ─── */
const buildStatCards = (stats) => [
  {
    label: "Total Users",
    value: stats.totalUsers.toLocaleString(),
    icon: Users,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-500",
    change: "+12%",
    up: true,
    sub: "vs last month",
  },
  {
    label: "Destinations",
    value: stats.totalDestinations.toLocaleString(),
    icon: MapPinned,
    iconBg: "bg-sky-50",
    iconColor: "text-sky-500",
    change: "+3",
    up: true,
    sub: "added this month",
  },
  {
    label: "Comments",
    value: stats.totalComments.toLocaleString(),
    icon: MessageSquare,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    change: "+28",
    up: true,
    sub: "posted today",
  },
  {
    label: "Avg Rating",
    value: stats.totalRatings > 0 ? "4.7" : "—",
    icon: Star,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
    change: "−0.1",
    up: false,
    sub: "vs last week",
  },
  {
    label: "Wishlist Saves",
    value: stats.totalWishlist.toLocaleString(),
    icon: Heart,
    iconBg: "bg-rose-50",
    iconColor: "text-rose-500",
    change: "+5%",
    up: true,
    sub: "this week",
  },
  {
    label: "Reactions",
    value: stats.totalReactions.toLocaleString(),
    icon: ThumbsUp,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-500",
    change: "+18%",
    up: true,
    sub: "this week",
  },
];

/* ─── Animated counter ─── */
const AnimatedNumber = ({ value }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!value || isNaN(Number(String(value).replace(/,/g, "")))) {
      setDisplay(value);
      return;
    }
    const target = Number(String(value).replace(/,/g, ""));
    let start = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setDisplay(target.toLocaleString()); clearInterval(timer); }
      else setDisplay(start.toLocaleString());
    }, 30);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{display}</span>;
};

/* ─── Custom tooltip for recharts ─── */
const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-100 rounded-xl shadow-lg px-4 py-3 text-sm">
      <p className="font-semibold text-slate-700 mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.color }} className="font-medium">
          {p.name}: {p.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════ */
const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDestinations: 0,
    totalComments: 0,
    totalRatings: 0,
    totalWishlist: 0,
    totalReactions: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchDashboard(); }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getDashboardStats();
      setStats(res.stats);
    } catch (error) {
      toast.error(error?.response?.data?.message ?? "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  const statCards = buildStatCards(stats);

  /* Merge real totals into engagement pie */
  const pieData = engagementData.map((d) => ({
    ...d,
    value:
      d.name === "Wishlist"  ? stats.totalWishlist  :
      d.name === "Reactions" ? stats.totalReactions :
      d.name === "Comments"  ? stats.totalComments  :
      d.name === "Ratings"   ? stats.totalRatings   : d.value,
  }));

  /* Animation helpers */
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, delay, ease: "easeOut" },
  });

  return (
    <AdminLayout>
      <div className="space-y-7 max-w-[1400px]">

        {/* ── Page header ── */}
        <motion.div {...fadeUp(0)}>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Dashboard</h1>
          <p className="text-sm text-slate-400 mt-1">
            Welcome back! Here's what's happening with Travel Bharat today.
          </p>
        </motion.div>

        {/* ── Stat cards (shadcn StatsCards + fallback grid) ── */}
        <motion.div {...fadeUp(0.05)}>
          {/* If StatsCards exists, render it, otherwise fall back to our own grid */}
          
        </motion.div>

        {/* ── Metric mini-cards (animated counters) ── */}
        <motion.div
          {...fadeUp(0.1)}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {statCards.map(({ label, value, icon: Icon, iconBg, iconColor, change, up, sub }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 + i * 0.06, duration: 0.35, ease: "easeOut" }}
              whileHover={{ y: -3, transition: { duration: 0.18 } }}
              className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 leading-tight">{label}</span>
                <span className={`w-8 h-8 rounded-xl ${iconBg} flex items-center justify-center`}>
                  <Icon size={15} className={iconColor} />
                </span>
              </div>
              <div className="text-2xl font-bold text-slate-800 tabular-nums">
                {loading ? (
                  <span className="inline-block w-12 h-7 rounded-lg bg-slate-100 animate-pulse" />
                ) : (
                  <AnimatedNumber value={value} />
                )}
              </div>
              <div className={`flex items-center gap-1 text-xs font-semibold ${up ? "text-emerald-500" : "text-rose-500"}`}>
                {up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {change}
                <span className="text-slate-400 font-normal ml-0.5">{sub}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Charts row 1: Growth area + Region bar ── */}
        <motion.div {...fadeUp(0.2)} className="grid lg:grid-cols-3 gap-5">

          {/* Growth area chart — 2/3 width */}
          <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-sm font-bold text-slate-800">Platform Growth</h2>
                <p className="text-xs text-slate-400 mt-0.5">Users, destinations & comments over 10 months</p>
              </div>
              <span className="text-xs text-sky-500 font-semibold flex items-center gap-1 cursor-pointer hover:underline">
                View full report <ArrowRight size={12} />
              </span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={growthData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gDest" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gComments" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34d399" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 12 }} />
                <Area type="monotone" dataKey="users" name="Users" stroke="#818cf8" strokeWidth={2} fill="url(#gUsers)" dot={false} />
                <Area type="monotone" dataKey="destinations" name="Destinations" stroke="#38bdf8" strokeWidth={2} fill="url(#gDest)" dot={false} />
                <Area type="monotone" dataKey="comments" name="Comments" stroke="#34d399" strokeWidth={2} fill="url(#gComments)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Region bar chart — 1/3 width */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <div className="mb-5">
              <h2 className="text-sm font-bold text-slate-800">Destinations by Region</h2>
              <p className="text-xs text-slate-400 mt-0.5">Current distribution across India</p>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={regionData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }} barSize={22}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={true} vertical={false} />
                <XAxis dataKey="region" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="destinations" name="Destinations" radius={[6, 6, 0, 0]}>
                  {regionData.map((_, i) => (
                    <Cell key={i} fill={["#818cf8","#38bdf8","#34d399","#f59e0b","#f87171","#a78bfa"][i % 6]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* ── Charts row 2: Pie + Activity feed ── */}
        <motion.div {...fadeUp(0.28)} className="grid lg:grid-cols-3 gap-5">

          {/* Engagement pie */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <div className="mb-4">
              <h2 className="text-sm font-bold text-slate-800">Engagement Breakdown</h2>
              <p className="text-xs text-slate-400 mt-0.5">Wishlist · Reactions · Comments · Ratings</p>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%" cy="50%"
                  innerRadius={52} outerRadius={76}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} strokeWidth={0} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => v.toLocaleString()} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-3">
              {pieData.map(({ name, color, value }) => (
                <div key={name} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: color }} />
                  <span className="text-xs text-slate-500 truncate">{name}</span>
                  <span className="text-xs font-semibold text-slate-700 ml-auto">{value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity feed — 2/3 width */}
          <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-sm font-bold text-slate-800">Recent Activity</h2>
                <p className="text-xs text-slate-400 mt-0.5">Live updates across the platform</p>
              </div>
              <span className="text-xs text-sky-500 font-semibold flex items-center gap-1 cursor-pointer hover:underline">
                View all <ArrowRight size={12} />
              </span>
            </div>
            <div className="space-y-1">
              {recentActivity.map(({ dot, text, time }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.32 + i * 0.07, duration: 0.3 }}
                  className="flex items-start gap-3 py-2.5 border-b border-slate-50 last:border-0"
                >
                  <span
                    className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                    style={{ background: dot }}
                  />
                  <p className="text-sm text-slate-600 flex-1 leading-snug">{text}</p>
                  <span className="text-xs text-slate-400 shrink-0 whitespace-nowrap">{time}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Quick summary cards (original content, styled) ── */}
        <motion.div {...fadeUp(0.36)} className="grid md:grid-cols-2 gap-5">
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <h2 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full bg-sky-400 inline-block" />
              Quick Summary
            </h2>
            <div className="space-y-2.5">
              {[
                { label: "Total Users",        value: stats.totalUsers,        color: "text-indigo-500" },
                { label: "Total Destinations", value: stats.totalDestinations, color: "text-sky-500" },
                { label: "Total Comments",     value: stats.totalComments,     color: "text-emerald-500" },
                { label: "Total Ratings",      value: stats.totalRatings,      color: "text-amber-500" },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex items-center justify-between py-1.5 border-b border-slate-50 last:border-0">
                  <span className="text-sm text-slate-500">{label}</span>
                  <span className={`text-sm font-bold tabular-nums ${color}`}>
                    {value.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <h2 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full bg-purple-400 inline-block" />
              Platform Activity
            </h2>
            <div className="space-y-2.5">
              {[
                { label: "Wishlist Saves", value: stats.totalWishlist,  color: "text-amber-500" },
                { label: "Reactions",      value: stats.totalReactions, color: "text-purple-500" },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex items-center justify-between py-1.5 border-b border-slate-50 last:border-0">
                  <span className="text-sm text-slate-500">{label}</span>
                  <span className={`text-sm font-bold tabular-nums ${color}`}>
                    {value.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Mini engagement bar visual */}
            <div className="mt-5 space-y-2">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Engagement split</p>
              {pieData.map(({ name, color, value }) => {
                const total = pieData.reduce((s, d) => s + d.value, 0) || 1;
                const pct = Math.round((value / total) * 100);
                return (
                  <div key={name} className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 w-20 shrink-0">{name}</span>
                    <div className="flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ background: color }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-slate-500 w-8 text-right">{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

      </div>
    </AdminLayout>
  );
};

export default Dashboard;