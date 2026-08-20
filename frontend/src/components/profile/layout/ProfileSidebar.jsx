import { memo } from "react";
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Heart,
  MessageSquare,
  Star,
  ShieldCheck,
  Mail,
  LogOut,
} from "lucide-react";

// ---- dark, admin-sidebar-style icon box ----
const IconBadge = memo(function IconBadge({ icon: Icon, iconClassName, boxClassName }) {
  return (
    <div
      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-xl transition-colors duration-200 sm:h-8 sm:w-8 ${boxClassName}`}
    >
      <Icon className={`h-3.5 w-3.5 ${iconClassName}`} />
    </div>
  );
});

const SidebarStat = memo(function SidebarStat({ icon, label, value, color, bg }) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  if (collapsed) {
    return (
      <div className="flex w-full justify-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-stone-200 bg-stone-50 transition-colors duration-200 hover:bg-stone-100 dark:border-white/[0.06] dark:bg-white/[0.03] dark:hover:bg-white/[0.06] sm:h-10 sm:w-10">
              <IconBadge icon={icon} iconClassName={color} boxClassName={bg} />
            </div>
          </TooltipTrigger>
          <TooltipContent side="right" className="text-xs">
            {label}
            <span className="ml-1.5 text-stone-400">({value})</span>
          </TooltipContent>
        </Tooltip>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between rounded-xl border border-stone-200 bg-stone-50 px-2.5 py-2 transition-colors duration-200 hover:bg-stone-100 dark:border-white/[0.06] dark:bg-white/[0.03] dark:hover:bg-white/[0.06]">
      <div className="flex min-w-0 items-center gap-2.5">
        <IconBadge icon={icon} iconClassName={color} boxClassName={bg} />
        <span className="truncate text-xs font-medium text-stone-500 dark:text-stone-400">
          {label}
        </span>
      </div>
      <span className="shrink-0 rounded-full bg-stone-200 px-2 py-0.5 text-xs font-bold text-stone-700 dark:bg-white/[0.06] dark:text-stone-200">
        {value}
      </span>
    </div>
  );
});

const NavButton = memo(function NavButton({ item, isActive, onSelect }) {
  const { key, label, Icon, color } = item;
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  if (collapsed) {
    return (
      <SidebarMenuItem className="flex w-full justify-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={() => onSelect(key)}
              className={`flex h-9 w-9 items-center justify-center rounded-2xl transition-colors duration-200 sm:h-10 sm:w-10 ${
                isActive
                  ? "bg-gradient-to-r from-orange-500/15 to-orange-400/10"
                  : "hover:bg-stone-100 dark:hover:bg-white/[0.06]"
              }`}
            >
              <IconBadge
                icon={Icon}
                iconClassName={isActive ? "text-orange-400" : `${color} dark:text-stone-400`}
                boxClassName={isActive ? "bg-orange-500/15" : "bg-stone-100 dark:bg-white/[0.06]"}
              />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" className="text-xs">
            {label}
          </TooltipContent>
        </Tooltip>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        onClick={() => onSelect(key)}
        isActive={isActive}
        className={`relative h-9 rounded-2xl px-2.5 transition-colors duration-200 sm:h-10 ${
          isActive
            ? "bg-gradient-to-r from-orange-500/15 to-orange-400/10 text-orange-400"
            : "text-stone-600 hover:bg-stone-100 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-white/[0.06] dark:hover:text-stone-200"
        }`}
      >
        {isActive && (
          <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-gradient-to-b from-orange-400 to-amber-500" />
        )}

        <IconBadge
          icon={Icon}
          iconClassName={isActive ? "text-orange-400" : `${color} dark:text-stone-400`}
          boxClassName={
            isActive
              ? "bg-orange-500/15 mr-2.5"
              : "bg-stone-100 mr-2.5 group-hover:bg-stone-200 dark:bg-white/[0.06] dark:group-hover:bg-white/[0.1]"
          }
        />

        <span
          className={`flex-1 truncate text-xs font-semibold ${
            isActive ? "text-orange-400" : "text-stone-700 dark:text-stone-300"
          }`}
        >
          {label}
        </span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
});

export default function ProfileSidebar({
  user,
  stats,
  activeTab,
  setActiveTab,
  navItems,
  onLogout,
}) {
  const { isMobile, setOpenMobile, state } = useSidebar();
  const collapsed = state === "collapsed";

  const handleSelect = (key) => {
    setActiveTab(key);
    if (isMobile) setOpenMobile(false);
  };

  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex h-full flex-col bg-gradient-to-br from-white via-white to-stone-50 dark:from-stone-900 dark:via-stone-900 dark:to-neutral-900">
        {/* ================= HEADER ================= */}
        <SidebarHeader className="overflow-hidden rounded-b-3xl p-0">
        {/* Cover */}
        <div className="relative h-14 overflow-hidden bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 sm:h-16 group-data-[collapsible=icon]:hidden">
          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/10" />
          <div className="absolute -bottom-6 left-6 h-16 w-16 rounded-full bg-white/10" />
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "18px 18px",
            }}
          />
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center px-3 pb-3 sm:px-4 sm:pb-4 group-data-[collapsible=icon]:px-1.5 group-data-[collapsible=icon]:pb-2 group-data-[collapsible=icon]:pt-2">
          <div className="mt-3 flex w-full flex-col items-center sm:mt-4 group-data-[collapsible=icon]:mt-0">
            <div className="relative">
              <Avatar className="h-16 w-16 border-4 border-white shadow-2xl dark:border-stone-900 sm:h-20 sm:w-20 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:border-2">
                <AvatarImage
                  src={user?.avatar}
                  alt={user?.username}
                  className="h-full w-full rounded-full object-cover object-top"
                />
                <AvatarFallback className="flex h-full w-full items-center justify-center bg-gradient-to-br from-orange-500 to-amber-500 text-xl font-bold text-white sm:text-2xl group-data-[collapsible=icon]:text-xs">
                  {user?.username?.charAt(0)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>

              {user?.isVerified && (
                <div className="absolute bottom-0.5 right-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-emerald-500 dark:border-stone-900 sm:h-6 sm:w-6 group-data-[collapsible=icon]:hidden">
                  <ShieldCheck className="h-3 w-3 text-white sm:h-3.5 sm:w-3.5" />
                </div>
              )}
            </div>

            <h2 className="mt-2 truncate text-sm font-bold text-stone-800 dark:text-orange-50 sm:text-base group-data-[collapsible=icon]:hidden">
              {user?.username}
            </h2>

            <Badge className="mt-1.5 rounded-full border-0 bg-orange-500/15 px-2.5 py-0.5 text-xs text-orange-600 dark:text-orange-400 group-data-[collapsible=icon]:hidden">
              {user?.isVerified ? "Verified Account" : "Unverified"}
            </Badge>

            <div className="mt-3 w-full space-y-1.5 rounded-2xl border border-stone-200 bg-stone-50 p-2.5 dark:border-white/[0.06] dark:bg-white/[0.03] group-data-[collapsible=icon]:hidden">
              <div className="flex items-center gap-2.5">
                <IconBadge
                  icon={Mail}
                  iconClassName="text-orange-400"
                  boxClassName="bg-orange-500/15"
                />
                <div className="min-w-0">
                  <p className="text-[10px] text-stone-500">Email</p>
                  <p className="truncate text-xs font-medium text-stone-700 dark:text-stone-200">{user?.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-stone-200 dark:bg-white/[0.06]" />
      </SidebarHeader>

      {/* ================= Navigation ================= */}
      <SidebarContent className="flex flex-col overflow-y-auto px-2.5 py-2.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:px-1.5">
        <SidebarGroup className="w-full group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:items-center">
          <SidebarGroupLabel className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-widest text-stone-400 dark:text-stone-500 group-data-[collapsible=icon]:hidden">
            Navigation
          </SidebarGroupLabel>

          <SidebarMenu className="w-full space-y-1 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:items-center">
            {navItems.map((item) => (
              <NavButton
                key={item.key}
                item={item}
                isActive={activeTab === item.key}
                onSelect={handleSelect}
              />
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <Separator className="my-3 w-full bg-stone-200 dark:bg-white/[0.06]" />

        {/* ================= Statistics ================= */}
        <SidebarGroup className="w-full group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:items-center">
          <SidebarGroupLabel className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-widest text-stone-400 dark:text-stone-500 group-data-[collapsible=icon]:hidden">
            Statistics
          </SidebarGroupLabel>

          <div className="w-full space-y-1.5 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:items-center">
            <SidebarStat
              icon={Heart}
              label="Wishlist"
              value={stats?.wishlist || 0}
              color="text-rose-400"
              bg="bg-rose-500/15"
            />
            <SidebarStat
              icon={MessageSquare}
              label="Reviews"
              value={stats?.reviews || 0}
              color="text-blue-400"
              bg="bg-blue-500/15"
            />
            <SidebarStat
              icon={Star}
              label="Ratings"
              value={stats?.ratings || 0}
              color="text-yellow-400"
              bg="bg-yellow-500/15"
            />
          </div>
        </SidebarGroup>
      </SidebarContent>

      {/* ================= Footer ================= */}
      <SidebarFooter className="flex items-center border-t border-stone-200 bg-transparent p-2.5 dark:border-white/[0.06]">
        {collapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                onClick={onLogout}
                className="flex h-9 w-9 items-center justify-center gap-0 rounded-2xl border-stone-200 bg-white p-0 text-red-500 transition-colors duration-200 hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-500 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-red-400 dark:hover:text-red-400 sm:h-10 sm:w-10"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-red-500/15">
                  <LogOut className="h-3.5 w-3.5" />
                </div>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="text-xs">
              Sign Out
            </TooltipContent>
          </Tooltip>
        ) : (
          <Button
            variant="outline"
            onClick={onLogout}
            className="h-9 w-full justify-start gap-2.5 rounded-2xl border-stone-200 bg-white text-red-500 transition-colors duration-200 hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-500 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-red-400 dark:hover:text-red-400"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-red-500/15">
              <LogOut className="h-3.5 w-3.5" />
            </div>
            <span className="text-sm font-semibold">Sign Out</span>
          </Button>
        )}
      </SidebarFooter>
    </div>
    </TooltipProvider>
  );
}