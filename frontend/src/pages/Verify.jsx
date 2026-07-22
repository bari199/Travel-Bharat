import axios from "axios";

import React, { useEffect, useState } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { motion } from "framer-motion";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";

const Verify = () => {
  const { token } = useParams();

  const navigate = useNavigate();

  const [status, setStatus] = useState(
    "Verifying your email..."
  );

  const [isSuccess, setIsSuccess] =
    useState(false);

  const [isLoading, setIsLoading] =
    useState(true);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await axios.post(
          `http://localhost:8000/user/verify`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          setIsSuccess(true);

          setStatus(
            "Email Verified Successfully"
          );

          setTimeout(() => {
            navigate("/", {
              state: {
                openLogin: true,
              },
            });
          }, 2000);
        } else {
          setIsSuccess(false);

          setStatus(
            "Invalid or Expired Token"
          );
        }
      } catch (error) {
        console.log(error);

        setIsSuccess(false);

        setStatus(
          "Verification Failed. Please try again"
        );
      } finally {
        setIsLoading(false);
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gradient-to-br
        from-orange-50
        via-orange-100
        to-orange-200
        px-4
        overflow-hidden
      "
    >

      {/* Background Blur */}
      <div className="absolute w-72 h-72 bg-orange-300/30 rounded-full blur-3xl top-10 left-10" />

      <div className="absolute w-72 h-72 bg-orange-400/20 rounded-full blur-3xl bottom-10 right-10" />

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
          y: 40,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="relative z-10 w-full max-w-md"
      >

        <Card
          className="
            rounded-3xl
            border
            border-orange-200
            shadow-2xl
            bg-white/90
            backdrop-blur-xl
            overflow-hidden
          "
        >

          <CardContent className="p-8 md:p-10 text-center">

            {/* Icon */}
            <motion.div
              initial={{
                scale: 0.8,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              transition={{
                delay: 0.2,
              }}
              className="flex justify-center mb-6"
            >

              {isLoading ? (
                <div
                  className="
                    w-20
                    h-20
                    rounded-full
                    bg-orange-100
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
                </div>
              ) : isSuccess ? (
                <div
                  className="
                    w-20
                    h-20
                    rounded-full
                    bg-orange-100
                    flex
                    items-center
                    justify-center
                  "
                >
                  <CheckCircle2 className="w-10 h-10 text-orange-500" />
                </div>
              ) : (
                <div
                  className="
                    w-20
                    h-20
                    rounded-full
                    bg-red-100
                    flex
                    items-center
                    justify-center
                  "
                >
                  <XCircle className="w-10 h-10 text-red-500" />
                </div>
              )}

            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.3,
              }}
              className="
                text-2xl
                md:text-3xl
                font-bold
                text-gray-800
                mb-3
              "
            >

              {isLoading
                ? "Verifying..."
                : isSuccess
                ? "Verification Complete"
                : "Verification Failed"}

            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.4,
              }}
              className="
                text-gray-500
                text-sm
                md:text-base
                leading-relaxed
              "
            >

              {status}

            </motion.p>

            {/* Button */}
            {!isLoading && (
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
                  delay: 0.5,
                }}
                className="mt-8"
              >

                <Button
                  onClick={() =>
                    navigate("/")
                  }
                  className="
                    bg-orange-500
                    hover:bg-orange-600
                    rounded-xl
                    px-6
                    h-11
                    text-white
                    shadow-lg
                    transition-all
                    duration-300
                  "
                >
                  Go To Home
                </Button>

              </motion.div>
            )}

          </CardContent>

        </Card>

      </motion.div>

    </div>
  );
};

export default Verify;