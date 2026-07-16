import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
  Heart,
  MessageSquare,
  Star,
  ShieldCheck,
  Mail,
  CalendarDays,
  LogOut,
} from "lucide-react";

const SidebarStat = ({
  icon: Icon,
  label,
  value,
  color,
  bg,
}) => (
  <div className="group flex items-center justify-between rounded-2xl border border-transparent bg-muted/30 px-3 py-3 transition-all duration-300 hover:border-orange-200 hover:bg-orange-50 dark:hover:border-zinc-700 dark:hover:bg-zinc-800">

    <div className="flex items-center gap-3">

      <div
        className={`flex h-9 w-9 items-center justify-center rounded-xl ${bg}`}
      >
        <Icon className={`h-4 w-4 ${color}`} />
      </div>

      <span className="text-sm font-medium text-muted-foreground">
        {label}
      </span>

    </div>

    <span className="rounded-full bg-background px-2.5 py-1 text-sm font-bold shadow-sm">
      {value}
    </span>

  </div>
);

export default function ProfileSidebar({
  user,
  stats,
  activeTab,
  setActiveTab,
  navItems,
  onLogout,
}) {
  return (
    <>

      {/* ================= HEADER ================= */}

      <SidebarHeader className="overflow-hidden rounded-b-3xl p-0">

        {/* Cover */}

        <div className="relative h-36 overflow-hidden bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400">

          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />

          <div className="absolute -bottom-6 left-6 h-24 w-24 rounded-full bg-white/10" />

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

        <div className="px-5 pb-5">

          <div className="-mt-12 flex flex-col items-center">

            <div className="relative">

              <Avatar className="h-24 w-24 border-4 border-background shadow-2xl">

                <AvatarImage
                  src={user?.avatar}
                  className="object-cover"
                />

                <AvatarFallback className="bg-gradient-to-br from-orange-500 to-rose-500 text-3xl font-bold text-white">

                  {user?.username
                    ?.charAt(0)
                    ?.toUpperCase()}

                </AvatarFallback>

              </Avatar>

              {user?.isVerified && (

                <div className="absolute bottom-1 right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-emerald-500">

                  <ShieldCheck className="h-4 w-4 text-white" />

                </div>

              )}

            </div>

            <h2 className="mt-4 text-lg font-bold text-foreground">

              {user?.username}

            </h2>

            <Badge className="mt-2 rounded-full border-0 bg-orange-100 px-3 py-1 text-orange-600 dark:bg-orange-500/20 dark:text-orange-300">

              {user?.isVerified
                ? "Verified Account"
                : "Unverified"}

            </Badge>

            <div className="mt-5 w-full space-y-3 rounded-2xl border bg-card p-4">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-100 dark:bg-orange-500/20">

                  <Mail className="h-4 w-4 text-orange-500" />

                </div>

                <div className="min-w-0">

                  <p className="text-xs text-muted-foreground">

                    Email

                  </p>

                  <p className="truncate text-sm font-medium">

                    {user?.email}

                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-100 dark:bg-orange-500/20">

                  <CalendarDays className="h-4 w-4 text-orange-500" />

                </div>

                <div>

                  <p className="text-xs text-muted-foreground">

                    Member Since

                  </p>

                  <p className="text-sm font-medium">

                    {new Date(
                      user?.createdAt
                    ).toLocaleDateString("en-IN", {
                      month: "long",
                      year: "numeric",
                    })}

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        <Separator className="opacity-70" />

      </SidebarHeader>
            {/* ================= Navigation ================= */}

      <SidebarContent className="px-3 py-4">

        <SidebarGroup>

          <SidebarGroupLabel className="mb-3 px-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">

            Navigation

          </SidebarGroupLabel>

          <SidebarMenu className="space-y-2">

            {navItems.map(({ key, label, Icon, color }) => (

              <SidebarMenuItem key={key}>

                <SidebarMenuButton
                  onClick={() => setActiveTab(key)}
                  isActive={activeTab === key}
                  className={`
                    relative h-12 rounded-2xl px-3 transition-all duration-300

                    ${
                      activeTab === key
                        ? "bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-lg"
                        : "hover:bg-orange-50 dark:hover:bg-zinc-800"
                    }
                  `}
                >

                  {/* Active Indicator */}

                  {activeTab === key && (

                    <div className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-white" />

                  )}

                  {/* Icon */}

                  <div
                    className={`
                      mr-3 flex h-9 w-9 items-center justify-center rounded-xl transition-all

                      ${
                        activeTab === key
                          ? "bg-white/20"
                          : "bg-muted dark:bg-zinc-900"
                      }
                    `}
                  >

                    <Icon
                      className={`
                        h-5 w-5

                        ${
                          activeTab === key
                            ? "text-white"
                            : `${color} dark:text-zinc-300`
                        }
                      `}
                    />

                  </div>

                  {/* Label */}

                  <span
                    className={`
                      flex-1 text-sm font-semibold

                      ${
                        activeTab === key
                          ? "text-white"
                          : "text-foreground"
                      }
                    `}
                  >

                    {label}

                  </span>

                </SidebarMenuButton>

              </SidebarMenuItem>

            ))}

          </SidebarMenu>

        </SidebarGroup>

        <Separator className="my-6" />

        {/* ================= Statistics ================= */}

        <SidebarGroup>

          <SidebarGroupLabel className="mb-3 px-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">

            Statistics

          </SidebarGroupLabel>

          <div className="space-y-3">

            <SidebarStat
              icon={Heart}
              label="Wishlist"
              value={stats?.wishlist || 0}
              color="text-rose-500"
              bg="bg-rose-100 dark:bg-rose-500/20"
            />

            <SidebarStat
              icon={MessageSquare}
              label="Reviews"
              value={stats?.reviews || 0}
              color="text-blue-500"
              bg="bg-blue-100 dark:bg-blue-500/20"
            />

            <SidebarStat
              icon={Star}
              label="Ratings"
              value={stats?.ratings || 0}
              color="text-yellow-500"
              bg="bg-yellow-100 dark:bg-yellow-500/20"
            />

          </div>

        </SidebarGroup>

      </SidebarContent>
            {/* ================= Footer ================= */}

      <SidebarFooter className="border-t bg-background/50 p-4">

        <Button
          variant="outline"
          onClick={onLogout}
          className="
            h-12
            w-full
            justify-start
            gap-3
            rounded-2xl
            border-red-200
            text-red-500
            transition-all
            duration-300
            hover:border-red-300
            hover:bg-red-50
            hover:text-red-600
            dark:border-zinc-700
            dark:hover:bg-zinc-800
          "
        >

          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 dark:bg-red-500/20">

            <LogOut className="h-4 w-4" />

          </div>

          <span className="font-semibold">

            Sign Out

          </span>

        </Button>

      </SidebarFooter>

    </>
  );
}