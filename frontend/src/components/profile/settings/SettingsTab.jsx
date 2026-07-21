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
    <div className="space-y-4">

      {/* ================= Account Information ================= */}

      <Card className="rounded-2xl border bg-card shadow-sm">

        <CardContent className="p-0">

          {/* Header */}

          <div className="flex items-center gap-2.5 border-b p-4">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-500/20">

              <UserCircle2 className="h-4 w-4 text-orange-500" />

            </div>

            <div>

              <h2 className="text-sm font-bold text-foreground">

                Account Information

              </h2>

              <p className="text-xs text-muted-foreground">

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
                  className="flex items-center gap-3 p-4 transition-colors hover:bg-muted/30"
                >

                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${bg}`}
                  >

                    <Icon
                      className={`h-4 w-4 ${color}`}
                    />

                  </div>

                  <div>

                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">

                      {label}

                    </p>

                    <p className="mt-0.5 text-sm font-medium text-foreground">

                      {value}

                    </p>

                  </div>

                </div>

              )
            )}

            {/* Verification */}

            <div className="flex items-center gap-3 p-4 transition-colors hover:bg-muted/30">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-100 dark:bg-green-500/20">

                {user?.isVerified ? (
                  <ShieldCheck className="h-4 w-4 text-green-500" />
                ) : (
                  <ShieldX className="h-4 w-4 text-red-500" />
                )}

              </div>

              <div>

                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">

                  Account Status

                </p>

                {user?.isVerified ? (

                  <Badge
                    className="
                      mt-1.5
                      rounded-full
                      border-0
                      bg-green-100
                      text-xs
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
                    className="mt-1.5 rounded-full text-xs"
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