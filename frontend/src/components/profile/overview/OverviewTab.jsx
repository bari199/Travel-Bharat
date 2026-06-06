import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, CalendarDays, Heart, MessageSquare, Star, User } from "lucide-react";

const OverviewTab = ({ user, wishlist = [], reviews = [], ratings = [] }) => {
  const summaryItems = [
    { label: "Wishlist",  value: wishlist.length,  Icon: Heart,          color: "text-rose-500",  bg: "bg-rose-50"  },
    { label: "Reviews",   value: reviews.length,   Icon: MessageSquare,  color: "text-blue-500",  bg: "bg-blue-50"  },
    { label: "Ratings",   value: ratings.length,   Icon: Star,           color: "text-amber-500", bg: "bg-amber-50" },
  ];

  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {/* Profile Info */}
      <Card className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm lg:col-span-2">
        <CardHeader className="border-b border-gray-50 bg-gray-50/50 pb-4">
          <CardTitle className="flex items-center gap-2 text-base font-bold text-gray-800">
            <User className="h-4 w-4 text-orange-500" />
            Profile Information
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5 p-6">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Username</p>
            <p className="text-base font-semibold text-gray-900">{user?.username}</p>
          </div>

          <div className="h-px bg-gray-100" />

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-orange-50">
              <Mail className="h-4 w-4 text-orange-500" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Email</p>
              <p className="text-sm font-medium text-gray-800">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-orange-50">
              <CalendarDays className="h-4 w-4 text-orange-500" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Member Since</p>
              <p className="text-sm font-medium text-gray-800">
                {new Date(user?.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric", month: "long", year: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="h-px bg-gray-100" />

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
              Account Status
            </p>
            {user?.isVerified ? (
              <Badge className="border-0 bg-emerald-50 text-emerald-600 hover:bg-emerald-50">
                ✓ Verified Account
              </Badge>
            ) : (
              <Badge variant="destructive">Not Verified</Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Summary */}
      <Card className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
        <CardHeader className="border-b border-gray-50 bg-gray-50/50 pb-4">
          <CardTitle className="text-base font-bold text-gray-800">Quick Summary</CardTitle>
        </CardHeader>

        <CardContent className="divide-y divide-gray-50 p-0">
          {summaryItems.map(({ label, value, Icon, color, bg }) => (
            <div
              key={label}
              className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-gray-50/60"
            >
              <div className="flex items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${bg}`}>
                  <Icon className={`h-4 w-4 ${color}`} />
                </div>
                <span className="text-sm font-medium text-gray-700">{label}</span>
              </div>
              <span className="text-xl font-extrabold text-gray-900">{value}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewTab;
