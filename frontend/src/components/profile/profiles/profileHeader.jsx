import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Mail, ShieldCheck, ShieldX } from "lucide-react";

const ProfileHeader = ({ user }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-sm">
      {/* Cover gradient */}
      <div className="relative h-52 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-orange-500 to-rose-500" />
        {/* Decorative circles */}
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10" />
        <div className="absolute -bottom-6 left-1/3 h-32 w-32 rounded-full bg-white/10" />
        <div className="absolute right-1/4 top-4 h-16 w-16 rounded-full bg-white/10" />
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* Profile content */}
      <div className="px-6 pb-6 sm:px-8">
        <div className="-mt-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          {/* Avatar + name */}
          <div className="flex items-end gap-5">
            <div className="relative">
              <Avatar className="h-28 w-28 border-4 border-white shadow-xl ring-2 ring-orange-100">
                <AvatarImage src={user?.avatar} className="object-cover" />
                <AvatarFallback className="bg-gradient-to-br from-orange-400 to-rose-500 text-3xl font-bold text-white">
                  {user?.username?.charAt(0)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {user?.isVerified && (
                <span className="absolute bottom-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 shadow-md ring-2 ring-white">
                  <ShieldCheck className="h-3.5 w-3.5 text-white" />
                </span>
              )}
            </div>

            <div className="pb-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
                  {user?.username}
                </h1>
                {user?.isVerified ? (
                  <Badge className="border-0 bg-orange-50 text-orange-600 hover:bg-orange-50">
                    <ShieldCheck className="mr-1 h-3 w-3" /> Verified
                  </Badge>
                ) : (
                  <Badge variant="destructive" className="opacity-80">
                    <ShieldX className="mr-1 h-3 w-3" /> Unverified
                  </Badge>
                )}
              </div>

              <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-orange-400" />
                  <span>{user?.email}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5 text-orange-400" />
                  <span>
                    Joined{" "}
                    {new Date(user?.createdAt).toLocaleDateString("en-IN", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
