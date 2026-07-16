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
        rounded-3xl
        border
        bg-card
        shadow-sm
        transition-all
        duration-300
      "
    >
      {/* Header */}

      <CardHeader className="border-b bg-muted/30">

        <CardTitle className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 dark:bg-orange-500/20">

            <KeyRound className="h-5 w-5 text-orange-500" />

          </div>

          <div>

            <h2 className="text-lg font-bold text-foreground">
              Change Password
            </h2>

            <p className="text-sm text-muted-foreground">
              Keep your account secure
            </p>

          </div>

        </CardTitle>

      </CardHeader>

      <CardContent className="p-6">

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Current Password */}

          <div className="space-y-2">

            <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">

              Current Password

            </label>

            <div className="relative">

              <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Enter current password"
                className="
                  h-12
                  rounded-2xl
                  border-border
                  bg-background
                  pl-11
                  focus-visible:ring-orange-500
                "
              />

            </div>

          </div>

          {/* New Password */}

          <div className="space-y-2">

            <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">

              New Password

            </label>

            <div className="relative">

              <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                className="
                  h-12
                  rounded-2xl
                  border-border
                  bg-background
                  pl-11
                  focus-visible:ring-orange-500
                "
              />

            </div>

          </div>

          {/* Confirm Password */}

          <div className="space-y-2">

            <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">

              Confirm Password

            </label>

            <div className="relative">

              <ShieldCheck className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-green-500" />

              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                className="
                  h-12
                  rounded-2xl
                  border-border
                  bg-background
                  pl-11
                  focus-visible:ring-orange-500
                "
              />

            </div>

          </div>

          {/* Security Notice */}

          <div className="rounded-2xl border border-orange-200 bg-orange-50 p-4 dark:border-orange-500/20 dark:bg-orange-500/10">

            <div className="flex items-start gap-3">

              <ShieldCheck className="mt-0.5 h-5 w-5 text-orange-500" />

              <div>

                <p className="text-sm font-semibold text-orange-600 dark:text-orange-300">

                  Password Security

                </p>

                <p className="mt-1 text-xs leading-6 text-muted-foreground">

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
              h-12
              w-full
              rounded-2xl
              bg-gradient-to-r
              from-orange-500
              to-orange-400
              shadow-lg
              transition-all
              duration-300
              hover:scale-[1.02]
              hover:from-orange-600
              hover:to-orange-500
            "
          >

            <ShieldCheck className="mr-2 h-5 w-5" />

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