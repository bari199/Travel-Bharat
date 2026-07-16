import React from "react";
import {
  CheckCircle2,
  Backpack,
  PackageCheck,
} from "lucide-react";

const ActivityIncludes = ({ activity }) => {
  const provided = activity.equipmentProvided || [];
  const carry = activity.thingsToCarry || [];

  if (!provided.length && !carry.length) return null;

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">

      {/* Header */}

      <div className="border-b border-slate-200 px-8 py-6 dark:border-slate-800">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 dark:bg-orange-500/20">

            <PackageCheck className="h-7 w-7 text-orange-500" />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">

              What's Included

            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">

              Everything you'll receive and what you should bring.

            </p>

          </div>

        </div>

      </div>

      {/* Content */}

      <div className="grid gap-6 p-8 lg:grid-cols-2">

        {/* Provided */}

        {provided.length > 0 && (

          <div className="rounded-2xl border border-green-200 bg-green-50 p-6 dark:border-green-900/30 dark:bg-green-950/20">

            <div className="mb-5 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 dark:bg-green-500/20">

                <CheckCircle2 className="h-6 w-6 text-green-500" />

              </div>

              <div>

                <h3 className="font-semibold text-slate-900 dark:text-white">

                  Provided for You

                </h3>

                <p className="text-sm text-slate-500 dark:text-slate-400">

                  Included with your booking

                </p>

              </div>

            </div>

            <ul className="space-y-4">

              {provided.map((item, i) => (

                <li
                  key={i}
                  className="flex items-start gap-3"
                >

                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />

                  <span className="leading-7 text-slate-700 dark:text-slate-300">

                    {item}

                  </span>

                </li>

              ))}

            </ul>

          </div>

        )}

        {/* Carry */}

        {carry.length > 0 && (

          <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6 dark:border-orange-900/30 dark:bg-orange-950/20">

            <div className="mb-5 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 dark:bg-orange-500/20">

                <Backpack className="h-6 w-6 text-orange-500" />

              </div>

              <div>

                <h3 className="font-semibold text-slate-900 dark:text-white">

                  Bring Along

                </h3>

                <p className="text-sm text-slate-500 dark:text-slate-400">

                  Recommended items

                </p>

              </div>

            </div>

            <ul className="space-y-4">

              {carry.map((item, i) => (

                <li
                  key={i}
                  className="flex items-start gap-3"
                >

                  <Backpack className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />

                  <span className="leading-7 text-slate-700 dark:text-slate-300">

                    {item}

                  </span>

                </li>

              ))}

            </ul>

          </div>

        )}

      </div>

    </section>
  );
};

export default ActivityIncludes;