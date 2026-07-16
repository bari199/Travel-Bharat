import React from "react";
import { motion } from "framer-motion";
import {
  ShieldAlert,
  AlertTriangle,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

const ActivitySafety = ({ activity }) => {
  const safetyTips = activity?.safetyTips || [];

  if (!safetyTips.length) return null;

  return (
    <Card className="overflow-hidden rounded-3xl border border-red-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl dark:border-red-900/40 dark:bg-slate-900">

      <CardContent className="p-6 sm:p-8">

        {/* Header */}

        <div className="mb-8 flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 dark:bg-red-500/20">

            <ShieldAlert className="h-7 w-7 text-red-500" />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">

              Safety Guidelines

            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">

              Follow these recommendations to enjoy a safe and comfortable experience.

            </p>

          </div>

        </div>

        {/* Safety Tips */}

        <div className="space-y-4">

          {safetyTips.map((tip, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{
                once: true,
                margin: "-40px",
              }}
              transition={{
                duration: 0.25,
                delay: index * 0.03,
              }}
              whileHover={{
                x: 4,
              }}
              className="group flex gap-4 rounded-2xl border border-red-100 bg-red-50 p-5 transition-all duration-300 hover:border-red-200 hover:shadow-md dark:border-red-900/30 dark:bg-red-950/20"
            >

              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/20">

                <AlertTriangle className="h-5 w-5 text-red-500" />

              </div>

              <div>

                <h4 className="mb-1 font-semibold text-slate-900 dark:text-white">

                  Safety Tip {index + 1}

                </h4>

                <p className="leading-7 text-slate-600 dark:text-slate-300">

                  {tip}

                </p>

              </div>

            </motion.div>

          ))}

        </div>

      </CardContent>

    </Card>
  );
};

export default ActivitySafety;