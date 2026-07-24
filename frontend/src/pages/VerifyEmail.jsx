import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { MailCheck, Mail, LogIn, RefreshCw } from "lucide-react";

import axios from "axios";
import { toast } from "sonner";

const VerifyEmail = () => {
  const [open, setOpen] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";

  useEffect(() => {
    setOpen(true);
  }, []);

  // Countdown
  useEffect(() => {
    if (countdown === 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  // Open Gmail
  const openGmail = () => {
    window.open("https://mail.google.com", "_blank");
  };

  // Resend Verification Email
  const resendVerification = async () => {
    if (!email) {
      toast.error("Email not found.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/resend-verification`,
        {
          email,
        }
      );

      toast.success(res.data.message);

      setCountdown(60);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to resend verification email."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100 px-4">

      <Dialog open={open}>

        <DialogContent className="sm:max-w-lg rounded-3xl border-0 shadow-2xl">

          <DialogHeader className="items-center text-center">

            <div className="h-24 w-24 rounded-full bg-orange-100 flex items-center justify-center mb-4">

              <MailCheck className="h-12 w-12 text-orange-600" />

            </div>

            <DialogTitle className="text-3xl font-bold text-orange-600">

              Check Your Email

            </DialogTitle>

            <DialogDescription className="text-base leading-7 mt-3">

              We've sent a verification link to

            </DialogDescription>

            <p className="font-bold text-orange-700 break-all mt-2">
              {email}
            </p>

            <p className="text-gray-500 text-sm mt-4">
              Open your inbox and click the verification link to activate your
              account.
            </p>

          </DialogHeader>

          <div className="space-y-3 mt-8">

            <Button
              onClick={openGmail}
              className="w-full h-12 bg-orange-600 hover:bg-orange-700"
            >
              <Mail className="mr-2 h-5 w-5" />
              Open Gmail
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate("/login")}
              className="w-full h-12"
            >
              <LogIn className="mr-2 h-5 w-5" />
              Go To Login
            </Button>

            <Button
              variant="secondary"
              disabled={countdown > 0 || loading}
              onClick={resendVerification}
              className="w-full h-12"
            >
              <RefreshCw className="mr-2 h-5 w-5" />

              {loading
                ? "Sending..."
                : countdown > 0
                ? `Resend Email (${countdown}s)`
                : "Resend Verification Email"}
            </Button>

          </div>

          <p className="text-center text-xs text-gray-500 mt-6">
            Didn't receive the email?
            <br />
            Check your Spam or Promotions folder.
          </p>

        </DialogContent>

      </Dialog>

    </div>
  );
};

export default VerifyEmail;