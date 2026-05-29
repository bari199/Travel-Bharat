import React, { useState } from "react";

import axios from "axios";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { motion } from "framer-motion";

import {
  Loader2,
  LockKeyhole,
  ShieldCheck,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";

const ChangePassword = () => {
  const { email } = useParams();

  const navigate = useNavigate();

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [isLoading, setIsLoading] =
    useState(false);

  const [newPassword, setNewPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [showNew, setShowNew] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  const handleChangePassword = async () => {
    setError("");

    setSuccess("");

    if (!newPassword || !confirmPassword) {
      setError("Please fill in all fields");

      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");

      return;
    }

    try {
      setIsLoading(true);

      const res = await axios.post(
        `http://localhost:8000/user/change-password/${email}`,
        {
          newPassword,
          confirmPassword,
        }
      );

      setSuccess(res.data.message);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center px-4 py-10 overflow-hidden relative">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 h-72 w-72 bg-orange-400/20 blur-3xl rounded-full" />

      <div className="absolute bottom-0 right-0 h-72 w-72 bg-amber-400/20 blur-3xl rounded-full" />

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.5,
        }}
        className="relative z-10 w-full max-w-sm"
      >

        <Card className="border border-orange-200/40 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden">

          <CardContent className="p-5 sm:p-6">

            {/* Header */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center space-y-4"
            >

              <div className="mx-auto h-16 w-16 rounded-full bg-orange-100 flex items-center justify-center border border-orange-200">

                <ShieldCheck className="h-8 w-8 text-orange-600" />

              </div>

              <div className="space-y-2">

                <h2 className="text-2xl font-bold text-orange-700">
                  Change Password
                </h2>

                <p className="text-sm text-orange-500 leading-6">
                  Set a new secure password for:
                </p>

                <p className="text-sm font-medium text-orange-700 break-all">
                  {email}
                </p>

              </div>

            </motion.div>

            {/* Alerts */}
            {error && (
              <Alert className="mt-5 border-red-300 bg-red-50 text-red-600">

                <AlertDescription>
                  {error}
                </AlertDescription>

              </Alert>
            )}

            {success && (
              <Alert className="mt-5 border-orange-300 bg-orange-50 text-orange-700">

                <AlertDescription className="flex items-center gap-2">

                  <CheckCircle2 className="h-4 w-4" />

                  {success}

                </AlertDescription>

              </Alert>
            )}

            {/* Form */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.3,
              }}
              className="mt-6 space-y-4"
            >

              {/* New Password */}
              <div className="space-y-2">

                <label className="text-sm font-medium text-orange-700">
                  New Password
                </label>

                <div className="relative">

                  <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-400" />

                  <Input
                    type={
                      showNew
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) =>
                      setNewPassword(
                        e.target.value
                      )
                    }
                    className="
                      h-11
                      pl-10
                      pr-12
                      rounded-2xl
                      border-orange-200
                      bg-orange-50
                      text-orange-700
                      focus-visible:ring-orange-500
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowNew(!showNew)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-500"
                  >
                    {showNew ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>

                </div>

              </div>

              {/* Confirm Password */}
              <div className="space-y-2">

                <label className="text-sm font-medium text-orange-700">
                  Confirm Password
                </label>

                <div className="relative">

                  <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-400" />

                  <Input
                    type={
                      showConfirm
                        ? "text"
                        : "password"
                    }
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(
                        e.target.value
                      )
                    }
                    className="
                      h-11
                      pl-10
                      pr-12
                      rounded-2xl
                      border-orange-200
                      bg-orange-50
                      text-orange-700
                      focus-visible:ring-orange-500
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirm(
                        !showConfirm
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-500"
                  >
                    {showConfirm ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>

                </div>

              </div>

              {/* Submit Button */}
              <Button
                onClick={handleChangePassword}
                disabled={isLoading}
                className="
                  w-full
                  h-11
                  rounded-2xl
                  bg-orange-600
                  hover:bg-orange-700
                  text-white
                  font-semibold
                  transition-all
                  duration-300
                "
              >

                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Changing...
                  </>
                ) : (
                  "Change Password"
                )}

              </Button>

            </motion.div>

          </CardContent>

        </Card>

      </motion.div>
    </div>
  );
};

export default ChangePassword;