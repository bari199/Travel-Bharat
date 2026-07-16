// ── SettingsTab.jsx ─────────────────────────────────────────────────────────

import EditProfileForm from "./EditProfileForm";
import ChangePasswordForm from "./ChangePasswordForm";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  Mail,
  CalendarDays,
  ShieldCheck,
  ShieldX,
  UserCircle2,
} from "lucide-react";

export const SettingsTab = ({
  user,
  onProfileUpdate,
  onPasswordChange,
  loading,
}) => {
  const accountInfo = [
    {
      label: "Email Address",
      value: user?.email,
      Icon: Mail,
      color: "text-orange-500",
      bg: "bg-orange-100 dark:bg-orange-500/20",
    },
    {
      label: "Member Since",
      value: new Date(user?.createdAt).toLocaleDateString(
        "en-IN",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      ),
      Icon: CalendarDays,
      color: "text-blue-500",
      bg: "bg-blue-100 dark:bg-blue-500/20",
    },
  ];

  return (
    <div className="space-y-6">

      {/* ================= Account Information ================= */}

      <Card className="rounded-3xl border bg-card shadow-sm">

        <CardContent className="p-0">

          {/* Header */}

          <div className="flex items-center gap-3 border-b p-6">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 dark:bg-orange-500/20">

              <UserCircle2 className="h-5 w-5 text-orange-500" />

            </div>

            <div>

              <h2 className="text-lg font-bold text-foreground">

                Account Information

              </h2>

              <p className="text-sm text-muted-foreground">

                View your account details

              </p>

            </div>

          </div>

          {/* Information */}

          <div className="divide-y">

            {accountInfo.map(
              ({
                label,
                value,
                Icon,
                color,
                bg,
              }) => (

                <div
                  key={label}
                  className="flex items-center gap-4 p-6 transition-colors hover:bg-muted/30"
                >

                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${bg}`}
                  >

                    <Icon
                      className={`h-5 w-5 ${color}`}
                    />

                  </div>

                  <div>

                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">

                      {label}

                    </p>

                    <p className="mt-1 font-medium text-foreground">

                      {value}

                    </p>

                  </div>

                </div>

              )
            )}

            {/* Verification */}

            <div className="flex items-center gap-4 p-6 transition-colors hover:bg-muted/30">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 dark:bg-green-500/20">

                {user?.isVerified ? (
                  <ShieldCheck className="h-5 w-5 text-green-500" />
                ) : (
                  <ShieldX className="h-5 w-5 text-red-500" />
                )}

              </div>

              <div>

                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">

                  Account Status

                </p>

                {user?.isVerified ? (

                  <Badge
                    className="
                      mt-2
                      rounded-full
                      border-0
                      bg-green-100
                      text-green-700
                      dark:bg-green-500/20
                      dark:text-green-300
                    "
                  >
                    ✓ Verified Account
                  </Badge>

                ) : (

                  <Badge
                    variant="destructive"
                    className="mt-2 rounded-full"
                  >
                    Not Verified
                  </Badge>

                )}

              </div>

            </div>

          </div>

        </CardContent>

      </Card>

      {/* ================= Edit Profile ================= */}

      <EditProfileForm
        user={user}
        onUpdate={onProfileUpdate}
        loading={loading}
      />

      {/* ================= Password ================= */}

      <ChangePasswordForm
        onChangePassword={onPasswordChange}
        loading={loading}
      />

    </div>
  );
};

export default SettingsTab;