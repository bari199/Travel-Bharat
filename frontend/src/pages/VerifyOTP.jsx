import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import api from "@/lib/api";

import {
  CheckCircle2,
  Loader2,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";

import React, {
  useRef,
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import { motion } from "framer-motion";

const VerifyOTP = () => {
  const [isVerified, setIsVerified] =
    useState(false);

  const [error, setError] = useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const [otp, setOtp] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [isLoading, setIsLoading] =
    useState(false);

  const inputRefs = useRef([]);

  const { email } = useParams();

  const navigate = useNavigate();

  const handleChange = (index, value) => {
    if (value.length > 1) return;

    const updatedOtp = [...otp];

    updatedOtp[index] = value;

    setOtp(updatedOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      setError("Please enter all 6 digits");

      return;
    }

    try {
      setError("");

      setIsLoading(true);

      const res = await api.post(
        `/user/verify-otp/${email}`,
        {
          otp: finalOtp,
        }
      );

      if (res.data.success) {
        setIsVerified(true);

        setSuccessMessage(res.data.message);

        setTimeout(() => {
          navigate(
            `/change-password/${email}`
          );
        }, 2000);
      }
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const clearOtp = () => {
    setOtp([
      "",
      "",
      "",
      "",
      "",
      "",
    ]);

    setError("");

    inputRefs.current[0]?.focus();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center px-4 py-10 overflow-hidden relative">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 h-72 w-72 bg-orange-500/20 blur-3xl rounded-full" />

      <div className="absolute bottom-0 right-0 h-72 w-72 bg-amber-500/20 blur-3xl rounded-full" />

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
        className="relative z-10 w-full max-w-md"
      >

        <Card className="border border-orange-200/40 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden">

          <CardContent className="p-7 sm:p-8">

            {/* Header */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >

              <div className="flex items-center gap-3">

                <div className="h-12 w-12 rounded-2xl bg-orange-100 flex items-center justify-center border border-orange-200">

                  <ShieldCheck className="h-6 w-6 text-orange-600" />

                </div>

                <div>
                  <h2 className="text-2xl font-bold text-orange-700">
                    Verify your login
                  </h2>

                  <p className="text-sm text-orange-500 mt-1 leading-6">
                    Enter the verification code
                    we sent to:
                  </p>

                  <p className="text-sm text-orange-600 break-all">
                    {email}
                  </p>
                </div>

              </div>

            </motion.div>

            {/* Alerts */}
            {error && (
              <Alert className="mt-6 border-red-300 bg-red-50 text-red-600">

                <AlertDescription>
                  {error}
                </AlertDescription>

              </Alert>
            )}

            {successMessage && (
              <Alert className="mt-6 border-orange-300 bg-orange-50 text-orange-700">

                <AlertDescription>
                  {successMessage}
                </AlertDescription>

              </Alert>
            )}

            {/* Verified Success */}
            {isVerified ? (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                className="py-10 flex flex-col items-center justify-center text-center space-y-5"
              >

                <div className="h-20 w-20 rounded-full bg-orange-100 flex items-center justify-center border border-orange-200">

                  <CheckCircle2 className="h-10 w-10 text-orange-600" />

                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold text-orange-700">
                    Verification Successful
                  </h3>

                  <p className="text-orange-500 text-sm leading-6">
                    Redirecting to password reset...
                  </p>
                </div>

                <div className="flex items-center gap-2 text-orange-500 text-sm">

                  <Loader2 className="h-4 w-4 animate-spin" />

                  Please wait...

                </div>

              </motion.div>
            ) : (
              <>
                {/* OTP Section */}
                <div className="mt-8 space-y-5">

                  <div className="flex items-center justify-between">

                    <label className="text-sm font-medium text-orange-700">
                      Verification code
                    </label>

                    <Button
                      variant="outline"
                      size="sm"
                      className="
                        bg-orange-50
                        border-orange-200
                        text-orange-700
                        hover:bg-orange-100
                        hover:text-orange-800
                        rounded-xl
                      "
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Resend Code
                    </Button>

                  </div>

                  {/* OTP Inputs */}
                  <div className="flex items-center justify-center gap-3 sm:gap-4">

                    {otp.map((digit, index) => (
                      <motion.div
                        whileFocus={{
                          scale: 1.05,
                        }}
                        key={index}
                      >

                        <Input
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          ref={(el) =>
                            (inputRefs.current[index] =
                              el)
                          }
                          onKeyDown={(e) =>
                            handleKeyDown(
                              index,
                              e
                            )
                          }
                          onChange={(e) =>
                            handleChange(
                              index,
                              e.target.value
                            )
                          }
                          className="
                            w-12
                            h-14
                            sm:w-14
                            sm:h-16
                            text-center
                            text-xl
                            font-bold
                            rounded-2xl
                            bg-orange-50
                            border
                            border-orange-200
                            text-orange-700
                            focus-visible:ring-2
                            focus-visible:ring-orange-500
                            focus-visible:border-orange-500
                          "
                        />

                      </motion.div>
                    ))}

                  </div>

                  {/* Verify Button */}
                  <Button
                    onClick={handleVerify}
                    disabled={
                      isLoading ||
                      otp.some(
                        (digit) => digit === ""
                      )
                    }
                    className="
                      w-full
                      h-12
                      mt-2
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
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      "Verify"
                    )}

                  </Button>

                  {/* Footer Links */}
                  <div className="space-y-4 text-center">

                    <button
                      className="
                        text-sm
                        text-orange-500
                        hover:text-orange-700
                        underline
                        transition-all
                      "
                    >
                      I no longer have access to
                      this email address.
                    </button>

                    <p className="text-sm text-orange-500">
                      Wrong email?{" "}

                      <Link
                        to="/forgot-password"
                        className="
                          text-orange-600
                          hover:text-orange-700
                          underline
                        "
                      >
                        Go back
                      </Link>

                    </p>

                  </div>

                </div>
              </>
            )}

          </CardContent>

        </Card>

      </motion.div>
    </div>
  );
};

export default VerifyOTP;