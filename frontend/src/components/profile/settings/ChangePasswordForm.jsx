// ── ChangePasswordForm.jsx ───────────────────────────────────────────────────
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KeyRound, ShieldCheck } from "lucide-react";

export const ChangePasswordForm = ({ email, onChangePassword, loading }) => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onChangePassword(formData);
  };

  return (
    <Card className="rounded-2xl border border-gray-100 shadow-sm">
      <CardHeader className="border-b border-gray-50 bg-gray-50/50 pb-4">
        <CardTitle className="flex items-center gap-2 text-base font-bold text-gray-800">
          <KeyRound className="h-4 w-4 text-orange-500" />
          Change Password
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              New Password
            </label>
            <Input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              className="rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-100"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Confirm Password
            </label>
            <Input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              className="rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-100"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-orange-500 hover:bg-orange-600 px-6 shadow-sm shadow-orange-200 transition-all"
          >
            <ShieldCheck className="mr-2 h-4 w-4" />
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordForm;