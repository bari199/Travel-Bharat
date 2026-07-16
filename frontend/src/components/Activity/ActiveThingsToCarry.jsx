import React from "react";
import { motion } from "framer-motion";
import {
  Backpack,
  CheckCircle2,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

const ActivityThingsToCarry = ({ activity }) => {
  const items = activity?.thingsToCarry || [];

  if (!items.length) return null;

  return (
    <Card className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">

      <CardContent className="p-6 sm:p-8">

        {/* Header */}

        <div className="mb-8 flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 dark:bg-orange-500/20">

            <Backpack className="h-7 w-7 text-orange-500" />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">

              Things To Carry

            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">

              Essential items recommended for this activity.

            </p>

          </div>

        </div>

        {/* Items */}

        <div className="grid gap-4 sm:grid-cols-2">

          {items.map((item, index) => (

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
                y: -3,
              }}
              className="group flex items-center gap-4 rounded-2xl border border-orange-100 bg-orange-50 p-4 transition-all duration-300 hover:border-orange-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
            >

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-500/20">

                <CheckCircle2 className="h-5 w-5 text-green-500" />

              </div>

              <span className="font-medium text-slate-700 transition-colors group-hover:text-orange-600 dark:text-slate-200 dark:group-hover:text-orange-400">

                {item}

              </span>

            </motion.div>

          ))}

        </div>

      </CardContent>

    </Card>
  );
};

export default ActivityThingsToCarry;