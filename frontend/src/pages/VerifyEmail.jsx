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

import {
  MailCheck,
  Mail,
  LogIn,
  RefreshCw,
} from "lucide-react";

import axios from "axios";
import { toast } from "sonner";

const VerifyEmail = () => {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);

  const navigate = useNavigate();
  const location = useLocation();

  // email from signup
  const email =
    location.state?.email || localStorage.getItem("verifyEmail") || "";

  useEffect(() => {
    if (location.state?.email) {
      localStorage.setItem("verifyEmail", location.state.email);
    }
  }, [location]);

  // countdown
  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const openGmail = () => {
    window.open("https://mail.google.com", "_blank");
  };

  const resendVerification = async () => {
    if (!email) {
      toast.error("Email not found.");
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/resend-verification`,
        {
          email,
        }
      );

      toast.success(data.message);

      setCountdown(60);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to resend verification email."
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

            <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center mb-5">
              <MailCheck className="h-12 w-12 text-orange-600" />
            </div>

            <DialogTitle className="text-3xl font-bold text-orange-600">
              Verify Your Email
            </DialogTitle>

            <DialogDescription className="text-base mt-3 leading-7">

              We've sent a verification link to

            </DialogDescription>

            <p className="font-bold text-orange-700 break-all mt-2">
              {email}
            </p>

            <p className="text-gray-500 text-sm mt-4 leading-6">
              Please open your inbox and click the verification link to
              activate your Travel Bharat account.
            </p>

          </DialogHeader>

          <div className="space-y-4 mt-8">

            <Button
              onClick={openGmail}
              className="w-full h-12 bg-orange-600 hover:bg-orange-700"
            >
              <Mail className="mr-2 h-5 w-5" />
              Open Gmail
            </Button>

            <Button
              variant="outline"
              className="w-full h-12"
              onClick={() => navigate("/login")}
            >
              <LogIn className="mr-2 h-5 w-5" />
              Go To Login
            </Button>

            <Button
              variant="secondary"
              className="w-full h-12"
              disabled={loading || countdown > 0}
              onClick={resendVerification}
            >
              <RefreshCw className="mr-2 h-5 w-5" />

              {loading
                ? "Sending..."
                : countdown > 0
                ? `Resend Email (${countdown}s)`
                : "Resend Verification Email"}
            </Button>

          </div>

          <div className="text-center mt-6 text-sm text-gray-500 leading-6">

            Didn't receive the email?

            <br />

            Check your Spam or Promotions folder.

          </div>

        </DialogContent>

      </Dialog>

    </div>
  );
};

export default VerifyEmail;