import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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


const OverviewTab = ({
  user,
  wishlist = {},
  reviews = [],
  ratings = [],
}) => {
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
    <div className="space-y-6">

      {/* FACEBOOK STYLE COVER */}

      <Card className="overflow-hidden rounded-3xl border bg-card shadow-lg">

        <div className="relative h-52 bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400">

          <div className="absolute inset-0 bg-black/10" />

          <div className="absolute bottom-0 left-0 h-28 w-full bg-gradient-to-t from-black/30 to-transparent" />

        </div>

        <CardContent className="relative px-8 pb-8">

          {/* Avatar */}

          <div className="-mt-16 flex flex-col items-start gap-5 md:flex-row md:items-end">

            <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-white shadow-xl">

              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-orange-500">

                <User className="h-14 w-14 text-white" />

              </div>

            </div>

            <div className="flex-1">

              <div className="flex flex-wrap items-center gap-3">

                <h1 className="text-3xl font-bold text-foreground">

                  {user?.username}

                </h1>

                {user?.isVerified && (

                  <Badge className="rounded-full bg-emerald-500 px-3 py-1 text-white hover:bg-emerald-500">

                    <ShieldCheck className="mr-1 h-4 w-4" />

                    Verified

                  </Badge>

                )}

              </div>

              <p className="mt-2 text-muted-foreground">

                {user?.email}

              </p>

            </div>

          </div>

        </CardContent>

      </Card>

      {/* DASHBOARD SUMMARY */}

      <div className="grid grid-cols-2 gap-5 lg:grid-cols-5">

        {summaryItems.map(
          ({ label, value, Icon, color, bg }) => (

            <Card
              key={label}
              className="rounded-3xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <CardContent className="flex items-center justify-between p-6">

                <div>

                  <p className="text-sm text-muted-foreground">

                    {label}

                  </p>

                  <h2 className="mt-1 text-4xl font-bold">

                    {value}

                  </h2>

                </div>

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${bg}`}
                >

                  <Icon className={`h-6 w-6 ${color}`} />

                </div>

              </CardContent>

            </Card>

          )
        )}

      </div>

            {/* Profile Information */}

      <div className="grid gap-6 lg:grid-cols-3">

        {/* Left Section */}

        <Card className="rounded-3xl border bg-card shadow-sm lg:col-span-2">

          <CardHeader>

            <CardTitle className="flex items-center gap-2 text-xl">

              <User className="h-5 w-5 text-orange-500" />

              Profile Information

            </CardTitle>

          </CardHeader>

          <CardContent>

            <div className="grid gap-5 md:grid-cols-2">

              {/* Username */}

              <div className="rounded-2xl border bg-muted/30 p-5">

                <p className="text-xs uppercase tracking-widest text-muted-foreground">

                  Username

                </p>

                <h3 className="mt-2 text-lg font-bold text-foreground">

                  {user?.username}

                </h3>

              </div>

              {/* Email */}

              <div className="rounded-2xl border bg-muted/30 p-5">

                <div className="flex items-center gap-3">

                  <div className="rounded-xl bg-orange-100 dark:bg-orange-500/20 p-3">

                    <Mail className="h-5 w-5 text-orange-500" />

                  </div>

                  <div>

                    <p className="text-xs uppercase tracking-widest text-muted-foreground">

                      Email

                    </p>

                    <p className="font-semibold break-all">

                      {user?.email}

                    </p>

                  </div>

                </div>

              </div>

              {/* Member Since */}

              <div className="rounded-2xl border bg-muted/30 p-5">

                <div className="flex items-center gap-3">

                  <div className="rounded-xl bg-blue-100 dark:bg-blue-500/20 p-3">

                    <CalendarDays className="h-5 w-5 text-blue-500" />

                  </div>

                  <div>

                    <p className="text-xs uppercase tracking-widest text-muted-foreground">

                      Member Since

                    </p>

                    <p className="font-semibold">

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

              <div className="rounded-2xl border bg-muted/30 p-5">

                <div className="flex items-center gap-3">

                  <div className="rounded-xl bg-emerald-100 dark:bg-emerald-500/20 p-3">

                    <ShieldCheck className="h-5 w-5 text-emerald-500" />

                  </div>

                  <div>

                    <p className="text-xs uppercase tracking-widest text-muted-foreground">

                      Account Status

                    </p>

                    {user?.isVerified ? (

                      <Badge className="mt-2 rounded-full bg-emerald-500 hover:bg-emerald-500">

                        Verified Account

                      </Badge>

                    ) : (

                      <Badge variant="destructive" className="mt-2">

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

        <Card className="rounded-3xl border bg-card shadow-sm">

          <CardHeader>

            <CardTitle>

              Account Statistics

            </CardTitle>

          </CardHeader>

          <CardContent className="space-y-5">

            <div className="flex items-center justify-between">

              <span className="text-muted-foreground">

                Wishlist Items

              </span>

              <span className="text-2xl font-bold">

                {destinationCount + experienceCount + activityCount}

              </span>

            </div>

            <div className="h-px bg-border" />

            <div className="flex items-center justify-between">

              <span className="text-muted-foreground">

                Reviews

              </span>

              <span className="text-2xl font-bold text-blue-500">

                {reviews.length}

              </span>

            </div>

            <div className="h-px bg-border" />

            <div className="flex items-center justify-between">

              <span className="text-muted-foreground">

                Ratings

              </span>

              <span className="text-2xl font-bold text-amber-500">

                {ratings.length}

              </span>

            </div>

            <div className="h-px bg-border" />

            <div className="flex items-center justify-between">

              <span className="text-muted-foreground">

                Account Type

              </span>

              <Badge>

                Traveller

              </Badge>

            </div>

          </CardContent>

        </Card>

      </div>
            {/* Recent Activity */}

      <div className="grid gap-6 lg:grid-cols-2">

        {/* Activity Timeline */}

        <Card className="rounded-3xl border bg-card shadow-sm">

          <CardHeader>

            <CardTitle className="text-lg font-bold">

              Recent Activity

            </CardTitle>

          </CardHeader>

          <CardContent className="space-y-5">

            <div className="flex items-start gap-4">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-500/20">

                <Heart className="h-5 w-5 text-rose-500" />

              </div>

              <div className="flex-1">

                <p className="font-semibold">

                  Wishlist Items

                </p>

                <p className="text-sm text-muted-foreground">

                  You have saved{" "}
                  <span className="font-semibold text-foreground">
                    {destinationCount + experienceCount + activityCount}
                  </span>{" "}
                  places.

                </p>

              </div>

            </div>

            <div className="flex items-start gap-4">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-500/20">

                <MessageSquare className="h-5 w-5 text-blue-500" />

              </div>

              <div className="flex-1">

                <p className="font-semibold">

                  Reviews

                </p>

                <p className="text-sm text-muted-foreground">

                  Total Reviews Posted :

                  <span className="ml-1 font-semibold text-foreground">

                    {reviews.length}

                  </span>

                </p>

              </div>

            </div>

            <div className="flex items-start gap-4">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-500/20">

                <Star className="h-5 w-5 text-amber-500" />

              </div>

              <div className="flex-1">

                <p className="font-semibold">

                  Ratings

                </p>

                <p className="text-sm text-muted-foreground">

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

        <Card className="rounded-3xl border bg-card shadow-sm">

          <CardHeader>

            <CardTitle>

              Profile Completion

            </CardTitle>

          </CardHeader>

          <CardContent>

            <div className="mb-3 flex items-center justify-between">

              <span className="text-muted-foreground">

                Completion

              </span>

              <span className="font-bold">

                {user?.isVerified ? "100%" : "80%"}

              </span>

            </div>

            <div className="h-3 w-full overflow-hidden rounded-full bg-border">

              <div
                className={`h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400 ${
                  user?.isVerified ? "w-full" : "w-4/5"
                }`}
              />

            </div>

            <div className="mt-8 rounded-2xl bg-orange-50 p-5">

              <h3 className="font-bold text-orange-600">

                Traveller Tips

              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">

                Complete your profile, explore new destinations,
                write reviews and rate places to unlock a better
                TravelBharat experience.

              </p>

            </div>

          </CardContent>

        </Card>

      </div>

    </div>
  );
};

export default OverviewTab;