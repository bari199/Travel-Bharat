import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  KeyRound,
  ShieldCheck,
  Lock,
} from "lucide-react";

export const ChangePasswordForm = ({
  onChangePassword,
  loading,
}) => {
  const [formData, setFormData] =
    useState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      return;
    }

    onChangePassword(formData);

    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <Card
      className="
        rounded-2xl
        border
        bg-card
        shadow-sm
        transition-all
        duration-300
      "
    >
      {/* Header */}

      <CardHeader className="border-b bg-muted/30 py-4">

        <CardTitle className="flex items-center gap-2.5">

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-500/20">

            <KeyRound className="h-4 w-4 text-orange-500" />

          </div>

          <div>

            <h2 className="text-sm font-bold text-foreground">
              Change Password
            </h2>

            <p className="text-xs text-muted-foreground">
              Keep your account secure
            </p>

          </div>

        </CardTitle>

      </CardHeader>

      <CardContent className="p-4">

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* Current Password */}

          <div className="space-y-1.5">

            <label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">

              Current Password

            </label>

            <div className="relative">

              <Lock className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />

              <Input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Enter current password"
                className="
                  h-10
                  rounded-xl
                  border-border
                  bg-background
                  pl-10
                  text-sm
                  focus-visible:ring-orange-500
                "
              />

            </div>

          </div>

          {/* New Password */}

          <div className="space-y-1.5">

            <label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">

              New Password

            </label>

            <div className="relative">

              <Lock className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />

              <Input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                className="
                  h-10
                  rounded-xl
                  border-border
                  bg-background
                  pl-10
                  text-sm
                  focus-visible:ring-orange-500
                "
              />

            </div>

          </div>

          {/* Confirm Password */}

          <div className="space-y-1.5">

            <label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">

              Confirm Password

            </label>

            <div className="relative">

              <ShieldCheck className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-green-500" />

              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                className="
                  h-10
                  rounded-xl
                  border-border
                  bg-background
                  pl-10
                  text-sm
                  focus-visible:ring-orange-500
                "
              />

            </div>

          </div>

          {/* Security Notice */}

          <div className="rounded-xl border border-orange-200 bg-orange-50 p-3 dark:border-orange-500/20 dark:bg-orange-500/10">

            <div className="flex items-start gap-2.5">

              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />

              <div>

                <p className="text-xs font-semibold text-orange-600 dark:text-orange-300">

                  Password Security

                </p>

                <p className="mt-1 text-[11px] leading-5 text-muted-foreground">

                  Use at least 8 characters with uppercase,
                  lowercase, numbers and special characters
                  for better security.

                </p>

              </div>

            </div>

          </div>

          {/* Button */}

          <Button
            type="submit"
            disabled={loading}
            className="
              h-10
              w-full
              rounded-xl
              bg-gradient-to-r
              from-orange-500
              to-orange-400
              text-sm
              shadow-lg
              transition-all
              duration-300
              hover:scale-[1.02]
              hover:from-orange-600
              hover:to-orange-500
            "
          >

            <ShieldCheck className="mr-2 h-4 w-4" />

            {loading
              ? "Updating Password..."
              : "Update Password"}

          </Button>

        </form>

      </CardContent>

    </Card>
  );
};

export default ChangePasswordForm;