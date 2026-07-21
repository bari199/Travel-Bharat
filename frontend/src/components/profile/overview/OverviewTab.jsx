import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import {
  Mail,
  CalendarDays,
  Heart,
  MessageSquare,
  Star,
  User,
  MapPin,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

const OverviewTab = ({ user, wishlist = {}, reviews = [], ratings = [] }) => {
  const destinationCount = wishlist?.destinations?.length || 0;
  const experienceCount = wishlist?.experiences?.length || 0;
  const activityCount = wishlist?.activities?.length || 0;

  const summaryItems = [
    {
      label: "Destinations",
      value: destinationCount,
      Icon: Heart,
      color: "text-rose-500",
      bg: "bg-rose-100 dark:bg-rose-500/20",
    },
    {
      label: "Experiences",
      value: experienceCount,
      Icon: Sparkles,
      color: "text-violet-500",
      bg: "bg-violet-100 dark:bg-violet-500/20",
    },
    {
      label: "Activities",
      value: activityCount,
      Icon: MapPin,
      color: "text-emerald-500",
      bg: "bg-emerald-100 dark:bg-emerald-500/20",
    },
    {
      label: "Reviews",
      value: reviews.length,
      Icon: MessageSquare,
      color: "text-blue-500",
      bg: "bg-blue-100 dark:bg-blue-500/20",
    },
    {
      label: "Ratings",
      value: ratings.length,
      Icon: Star,
      color: "text-amber-500",
      bg: "bg-amber-100 dark:bg-amber-500/20",
    },
  ];

  return (
    <div className="space-y-4">
      {/* DASHBOARD SUMMARY */}

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        {summaryItems.map(({ label, value, Icon, color, bg }) => (
          <Card
            key={label}
            className="rounded-2xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <CardContent className="flex items-center justify-between p-3.5">
              <div>
                <p className="text-xs text-muted-foreground">{label}</p>

                <h2 className="mt-0.5 text-2xl font-bold">{value}</h2>
              </div>

              <div
                className={`flex h-9 w-9 items-center justify-center rounded-xl ${bg}`}
              >
                <Icon className={`h-4 w-4 ${color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Profile Information */}

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Left Section */}

        <Card className="rounded-2xl border bg-card shadow-sm lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <User className="h-4 w-4 text-orange-500" />
              Profile Information
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              {/* Username */}

              <div className="rounded-xl border bg-muted/30 p-3.5">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  Username
                </p>

                <h3 className="mt-1 text-sm font-bold text-foreground">
                  {user?.username}
                </h3>
              </div>

              {/* Email */}

              <div className="rounded-xl border bg-muted/30 p-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="rounded-lg bg-orange-100 dark:bg-orange-500/20 p-2">
                    <Mail className="h-4 w-4 text-orange-500" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      Email
                    </p>

                    <p className="truncate text-sm font-semibold">{user?.email}</p>
                  </div>
                </div>
              </div>

              {/* Member Since */}

              <div className="rounded-xl border bg-muted/30 p-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="rounded-lg bg-blue-100 dark:bg-blue-500/20 p-2">
                    <CalendarDays className="h-4 w-4 text-blue-500" />
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      Member Since
                    </p>

                    <p className="text-sm font-semibold">
                      {new Date(user?.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",

                        month: "long",

                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Account Status */}

              <div className="rounded-xl border bg-muted/30 p-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="rounded-lg bg-emerald-100 dark:bg-emerald-500/20 p-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      Account Status
                    </p>

                    {user?.isVerified ? (
                      <Badge className="mt-1 rounded-full bg-emerald-500 text-xs hover:bg-emerald-500">
                        Verified Account
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="mt-1 text-xs">
                        Not Verified
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Section */}

        <Card className="rounded-2xl border bg-card shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Account Statistics</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Wishlist Items</span>

              <span className="text-lg font-bold">
                {destinationCount + experienceCount + activityCount}
              </span>
            </div>

            <div className="h-px bg-border" />

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Reviews</span>

              <span className="text-lg font-bold text-blue-500">
                {reviews.length}
              </span>
            </div>

            <div className="h-px bg-border" />

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Ratings</span>

              <span className="text-lg font-bold text-amber-500">
                {ratings.length}
              </span>
            </div>

            <div className="h-px bg-border" />

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Account Type</span>

              <Badge className="text-xs">Traveller</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Recent Activity */}

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Activity Timeline */}

        <Card className="rounded-2xl border bg-card shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold">Recent Activity</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-500/20">
                <Heart className="h-4 w-4 text-rose-500" />
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold">Wishlist Items</p>

                <p className="text-xs text-muted-foreground">
                  You have saved{" "}
                  <span className="font-semibold text-foreground">
                    {destinationCount + experienceCount + activityCount}
                  </span>{" "}
                  places.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-500/20">
                <MessageSquare className="h-4 w-4 text-blue-500" />
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold">Reviews</p>

                <p className="text-xs text-muted-foreground">
                  Total Reviews Posted :
                  <span className="ml-1 font-semibold text-foreground">
                    {reviews.length}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-500/20">
                <Star className="h-4 w-4 text-amber-500" />
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold">Ratings</p>

                <p className="text-xs text-muted-foreground">
                  Total Ratings Given :
                  <span className="ml-1 font-semibold text-foreground">
                    {ratings.length}
                  </span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Completion */}

        <Card className="rounded-2xl border bg-card shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Profile Completion</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Completion</span>

              <span className="font-bold">
                {user?.isVerified ? "100%" : "80%"}
              </span>
            </div>

            <div className="h-2 w-full overflow-hidden rounded-full bg-border">
              <div
                className={`h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400 ${
                  user?.isVerified ? "w-full" : "w-4/5"
                }`}
              />
            </div>

            <div className="mt-4 rounded-xl bg-orange-50 p-3.5">
              <h3 className="text-sm font-bold text-orange-600">Traveller Tips</h3>

              <p className="mt-1.5 text-xs leading-5 text-gray-600">
                Complete your profile, explore new destinations, write reviews
                and rate places to unlock a better TravelBharat experience.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewTab;