//SettingsTab.jsx
import EditProfileForm from "./EditProfileForm";
import ChangePasswordForm from "./ChangePasswordForm";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, CalendarDays, ShieldCheck, ShieldX } from "lucide-react";

export const SettingsTab = ({
  user,
  onProfileUpdate,
  onPasswordChange,
  loading,
}) => {
  return (
    <div className="space-y-5">
      {/* Account Info */}
      <Card className="rounded-2xl border border-gray-100 shadow-sm">
        <CardContent className="divide-y divide-gray-50 p-0">
          <div className="px-6 py-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">
              Account Information
            </h3>
          </div>

          {[
            {
              label: "Email",
              value: user?.email,
              Icon: Mail,
            },
            {
              label: "Joined",
              value: new Date(user?.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }),
              Icon: CalendarDays,
            },
          ].map(({ label, value, Icon }) => (
            <div key={label} className="flex items-center gap-4 px-6 py-4">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-orange-50">
                <Icon className="h-4 w-4 text-orange-500" />
              </div>
              <div>
                <p className="text-xs text-gray-400">{label}</p>
                <p className="text-sm font-medium text-gray-800">{value}</p>
              </div>
            </div>
          ))}

          <div className="flex items-center gap-4 px-6 py-4">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-orange-50">
              {user?.isVerified ? (
                <ShieldCheck className="h-4 w-4 text-orange-500" />
              ) : (
                <ShieldX className="h-4 w-4 text-orange-500" />
              )}
            </div>
            <div>
              <p className="text-xs text-gray-400">Verification</p>
              {user?.isVerified ? (
                <Badge className="mt-0.5 border-0 bg-emerald-50 text-emerald-600 hover:bg-emerald-50">
                  ✓ Verified
                </Badge>
              ) : (
                <Badge variant="destructive" className="mt-0.5">
                  Not Verified
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <EditProfileForm
        user={user}
        onUpdate={onProfileUpdate}
        loading={loading}
      />
      <ChangePasswordForm
        onChangePassword={onPasswordChange}
        loading={loading}
      />
      {/* <EditProfileForm />
      <ChangePasswordForm /> */}
    </div>
  );
};

export default SettingsTab;
