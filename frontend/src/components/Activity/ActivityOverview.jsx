import React from "react";
import { FileText } from "lucide-react";

const ActivityOverview = ({ activity }) => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

      {/* Header */}

      <div className="flex items-center gap-4 border-b border-slate-200 px-8 py-6 dark:border-slate-800">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 dark:bg-orange-500/20">

          <FileText className="h-7 w-7 text-orange-500" />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">

            About this Activity

          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">

            Everything you should know before booking.

          </p>

        </div>

      </div>

      {/* Description */}

      <div className="px-8 py-8">

        <div className="prose prose-slate max-w-none dark:prose-invert">

          <p className="whitespace-pre-line text-[16px] leading-8 text-slate-600 dark:text-slate-300">

            {activity.description}

          </p>

        </div>

      </div>

    </section>
  );
};

export default ActivityOverview;