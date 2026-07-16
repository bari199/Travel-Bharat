import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

const ActivityHighlights = ({ activity }) => {
  const highlights = activity?.highlights || [];

  if (!highlights.length) return null;

  return (
    <Card className="overflow-hidden rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-50 via-amber-50 to-white shadow-sm transition-all duration-300 hover:shadow-xl dark:border-slate-700 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">

      <CardContent className="p-6 sm:p-8">

        {/* Header */}

        <div className="mb-8 flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 dark:bg-orange-500/20">

            <Sparkles className="h-7 w-7 text-orange-500" />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">

              Activity Highlights

            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">

              Discover the best moments and key experiences of this activity.

            </p>

          </div>

        </div>

        {/* Highlight Cards */}

        <div className="grid gap-4 sm:grid-cols-2">

          {highlights.map((item, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
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
                y: -3,
              }}
            >

              <Card className="group h-full rounded-2xl border border-orange-100 bg-white shadow-sm transition-all duration-300 hover:border-orange-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800">

                <CardContent className="flex items-start gap-4 p-5">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-500/20">

                    <CheckCircle2 className="h-5 w-5 text-green-500" />

                  </div>

                  <p className="leading-7 text-slate-700 transition-colors group-hover:text-orange-600 dark:text-slate-300 dark:group-hover:text-orange-400">

                    {item}

                  </p>

                </CardContent>

              </Card>

            </motion.div>

          ))}

        </div>

      </CardContent>

    </Card>
  );
};

export default ActivityHighlights;