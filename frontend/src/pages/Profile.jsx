import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import {
  LayoutDashboard,
  Heart,
  MessageSquare,
  Star,
  Activity,
  Settings,
  ShieldCheck,
  ShieldX,
  Mail,
  CalendarDays,
  Reply,
  LogOut,
} from "lucide-react";

import OverviewTab from "@/components/profile/overview/OverviewTab";
import WishlistTab from "@/components/profile/wishlist/WishlistTab";
import ReviewsTab from "@/components/profile/reviews/ReviewsTab";
import RatingsTab from "@/components/profile/ratings/RatingTab";
import ActivityTab from "@/components/profile/activity/ActivityTab";
import SettingsTab from "@/components/profile/settings/SettingsTab";

import useProfile from "@/hooks/userProfile";
import { logout } from "@/services/profileService";
import { getData } from "@/context/userContext";

/* ── Nav config ──────────────────────────────────────────────────────── */
const NAV_ITEMS = [
  {
    key: "overview",
    label: "Overview",
    Icon: LayoutDashboard,
    color: "text-orange-500",
  },
  { key: "wishlist", label: "Wishlist", Icon: Heart, color: "text-rose-500" },
  {
    key: "reviews",
    label: "Reviews",
    Icon: MessageSquare,
    color: "text-blue-500",
  },
  { key: "ratings", label: "Ratings", Icon: Star, color: "text-amber-500" },
  {
    key: "activity",
    label: "Activity",
    Icon: Activity,
    color: "text-emerald-500",
  },
  {
    key: "settings",
    label: "Settings",
    Icon: Settings,
    color: "text-gray-500",
  },
];

/* ── Skeleton ────────────────────────────────────────────────────────── */
const ProfileSkeleton = () => (
  <div className="flex h-screen">
    <div className="w-64 border-r border-gray-100 p-5 space-y-4">
      <div className="flex flex-col items-center gap-3 py-4">
        <Skeleton className="h-20 w-20 rounded-full bg-orange-100" />
        <Skeleton className="h-4 w-28 rounded-lg bg-gray-200" />
        <Skeleton className="h-3 w-36 rounded-lg bg-gray-100" />
      </div>
      <Separator />
      <div className="space-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-full rounded-xl bg-gray-100" />
        ))}
      </div>
    </div>
    <div className="flex-1 p-8 space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-2xl bg-gray-100" />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Skeleton className="h-64 rounded-2xl bg-gray-100 lg:col-span-2" />
        <Skeleton className="h-64 rounded-2xl bg-gray-100" />
      </div>
    </div>
  </div>
);

/* ── Stat pill for sidebar ───────────────────────────────────────────── */
const SidebarStat = ({ icon: Icon, label, value, color, bg }) => (
  <div className="flex items-center justify-between rounded-xl px-3 py-2.5 hover:bg-orange-50/60 transition-colors">
    <div className="flex items-center gap-2.5">
      <div
        className={`flex h-7 w-7 items-center justify-center rounded-lg ${bg}`}
      >
        <Icon className={`h-3.5 w-3.5 ${color}`} />
      </div>
      <span className="text-sm text-gray-600">{label}</span>
    </div>
    <span className="text-sm font-bold text-gray-900">{value}</span>
  </div>
);

/* ── Main page ───────────────────────────────────────────────────────── */
const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  
  const { setUser } = getData();

  const {
    user,
    stats,
    wishlist,
    reviews,
    ratings,
    activity,
    loading,
    handleProfileUpdate,
    handlePasswordChange,
  } = useProfile();

  const handleLogout = async () => {
  try {
    const data = await logout();

    // Clear user state
    setUser(null);

    // Clear storage
    localStorage.clear();

    // Success notification
    toast.success(
      data?.message || "Logged out successfully"
    );

    // Redirect to home page
    navigate("/", { replace: true });

  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
      "Logout failed"
    );
  }
};

  const activeNav = NAV_ITEMS.find((n) => n.key === activeTab);

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <OverviewTab
            user={user}
            reviews={reviews}
            ratings={ratings}
            wishlist={wishlist}
          />
        );
      case "wishlist":
        return <WishlistTab wishlist={wishlist} />;
      case "reviews":
        return <ReviewsTab reviews={reviews} />;
      case "ratings":
        return <RatingsTab ratings={ratings} />;
      case "activity":
        return <ActivityTab activity={activity} />;
      case "settings":
        return (
          <SettingsTab
            user={user}
            onProfileUpdate={handleProfileUpdate}
            onPasswordChange={handlePasswordChange}
            loading={loading}
          />
        );
      default:
        return null;
    }
  };

  if (loading) return <ProfileSkeleton />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/30 via-white to-rose-50/20">
      <SidebarProvider>
        {/* ── Sidebar ── */}
        <Sidebar className="border-r border-orange-100/80 bg-white">
          {/* Avatar / user block */}
          <SidebarHeader className="p-0">
            {/* Mini cover */}
            <div className="relative h-30 w-full overflow-hidden bg-gradient-to-br from-orange-400 via-orange-500 to-rose-500">
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10" />
              <div className="absolute -bottom-4 left-8 h-16 w-16 rounded-full bg-white/10" />
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                  backgroundSize: "20px 20px",
                }}
              />
            </div>

            {/* Avatar overlapping cover */}
            <div className="px-5 pb-4">
              <div className="-mt-10 flex flex-col items-center text-center">
                <div className="relative mb-3">
                  <Avatar className="h-20 w-20 border-4 border-white shadow-lg ring-2 ring-orange-100">
                    <AvatarImage src={user?.avatar} className="object-cover" />
                    <AvatarFallback className="bg-gradient-to-br from-orange-400 to-rose-500 text-2xl font-bold text-white">
                      {user?.username?.charAt(0)?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {user?.isVerified && (
                    <span className="absolute bottom-0.5 right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 ring-2 ring-white shadow">
                      <ShieldCheck className="h-3 w-3 text-white" />
                    </span>
                  )}
                </div>

                <h2 className="text-base font-extrabold tracking-tight text-gray-900">
                  {user?.username}
                </h2>

                {user?.isVerified ? (
                  <Badge className="mt-1 border-0 bg-orange-50 text-orange-600 hover:bg-orange-50 text-[10px] px-2 py-0">
                    <ShieldCheck className="mr-1 h-2.5 w-2.5" /> Verified
                  </Badge>
                ) : (
                  <Badge
                    variant="destructive"
                    className="mt-1 text-[10px] px-2 py-0 opacity-80"
                  >
                    <ShieldX className="mr-1 h-2.5 w-2.5" /> Unverified
                  </Badge>
                )}

                <div className="mt-4 space-y-1 text-left w-full">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Mail className="h-3 w-3 text-orange-400 flex-shrink-0" />
                    <span className="truncate">{user?.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <CalendarDays className="h-3 w-3 text-orange-400 flex-shrink-0" />
                    <span>
                      Joined{" "}
                      {new Date(user?.createdAt).toLocaleDateString("en-IN", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-orange-100/60" />
          </SidebarHeader>

          {/* Nav items */}
          <SidebarContent className="px-2 py-3">
            <SidebarGroup>
              <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-3 mb-1">
                Navigation
              </SidebarGroupLabel>
              <SidebarMenu className="space-y-2">
                {NAV_ITEMS.map(({ key, label, Icon, color }) => (
                  <SidebarMenuItem key={key}>
                    <SidebarMenuButton
                      onClick={() => setActiveTab(key)}
                      isActive={activeTab === key}
                      className={`
                        group rounded-xl transition-all duration-200 font-medium
                        ${
                          activeTab === key
                            ? "bg-orange-50 text-orange-600 shadow-sm"
                            : "text-gray-600 hover:bg-orange-50/50 hover:text-orange-500"
                        }
                      `}
                    >
                      <Icon
                        className={`h-4 w-4 flex-shrink-0 transition-colors ${activeTab === key ? "text-orange-500" : color} `}
                      />
                      <span>{label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>

            <Separator className="my-3 bg-orange-100/60" />

            {/* Stats summary */}
            <SidebarGroup>
              <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-3 mb-1">
                Stats
              </SidebarGroupLabel>
              <div className="space-y-0.5 px-1">
                <SidebarStat
                  icon={Heart}
                  label="Wishlist"
                  value={stats?.wishlist || 0}
                  color="text-rose-500"
                  bg="bg-rose-50"
                />
                <SidebarStat
                  icon={MessageSquare}
                  label="Reviews"
                  value={stats?.reviews || 0}
                  color="text-blue-500"
                  bg="bg-blue-50"
                />
                <SidebarStat
                  icon={Star}
                  label="Ratings"
                  value={stats?.ratings || 0}
                  color="text-amber-500"
                  bg="bg-amber-50"
                />
                <SidebarStat
                  icon={Reply}
                  label="Replies"
                  value={stats?.replies || 0}
                  color="text-emerald-500"
                  bg="bg-emerald-50"
                />
              </div>
            </SidebarGroup>
          </SidebarContent>

          {/* Footer */}
          <SidebarFooter className="p-4 border-t border-orange-100/60">
            <Button
              variant="ghost"
              onClick={handleLogout}
              size="sm"
              className="w-full justify-start gap-2 rounded-xl text-gray-500 hover:bg-rose-50 hover:text-rose-600 transition-all"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </SidebarFooter>
        </Sidebar>

        {/* ── Main content ── */}
        <SidebarInset className="bg-transparent">
          {/* Top bar */}
          <header className="sticky top-0 z-10 flex h-14 items-center gap-3 border-b border-orange-100/60 bg-white/80 px-5 backdrop-blur-sm">
            <SidebarTrigger className="text-gray-500 hover:text-orange-500 transition-colors" />
            <Separator orientation="vertical" className="h-5 bg-orange-100" />
            <div className="flex items-center gap-2">
              {activeNav && (
                <>
                  <activeNav.Icon className={`h-4 w-4 ${activeNav.color}`} />
                  <span className="text-sm font-semibold text-gray-700">
                    {activeNav.label}
                  </span>
                </>
              )}
            </div>
          </header>

          {/* Tab content */}
          <main className="p-5 sm:p-7">
            <div className="animate-fade-in">{renderContent()}</div>
          </main>
        </SidebarInset>
      </SidebarProvider>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease both; }
      `}</style>
    </div>
  );
};

export default Profile;
