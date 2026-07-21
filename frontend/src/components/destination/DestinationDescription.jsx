import React, { memo } from "react";
import {
  Check,
  SunDim,
  CloudHail,
  Snowflake,
  CalendarClock,
  MapPin,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/* Memoized so a re-render of the parent (e.g. sidebar sticky repositioning)
   never forces all three season blocks to re-render. */
const SeasonBlock = memo(function SeasonBlock({
  icon: Icon,
  iconBg,
  iconColor,
  label,
  months,
  essentials,
}) {
  return (

    
    <div className="flex gap-4">
      <div
        className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${iconBg}`}
      >
        <Icon size={19} className={iconColor} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-[15px] font-semibold text-slate-800 dark:text-slate-200 tracking-tight">
            {label}
          </span>
          <div className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
            <CalendarClock size={12} />
            <span>{months}</span>
          </div>
        </div>

        <ul className="mt-2.5 space-y-1.5">
          {essentials?.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-[13px] text-slate-500 dark:text-slate-400 leading-[1.6]"
            >
              <span className="mt-[7px] w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

const DestinationDescription = ({ destination }) => {
  const { seasonGuide } = destination ?? {};

  return (
    <section className="w-full py-10 bg-slate-50 dark:bg-slate-950 antialiased transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── MAIN GRID ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 items-start">

          {/* ── LEFT ─────────────────────────────────────────── */}
          <div>

            {/* Eyebrow + heading */}
            <div className="mb-8">
              <Badge
                variant="secondary"
                className="bg-orange-50 dark:bg-orange-500/10 text-orange-600 border border-orange-100 dark:border-orange-500/20 text-[11px] font-semibold tracking-[0.06em] uppercase rounded-full px-3 py-1"
              >
                Quick Details · Destination
              </Badge>

              <h2 className="mt-4 text-[28px] sm:text-3xl lg:text-[34px] font-extrabold text-slate-900 dark:text-slate-100 leading-[1.15] tracking-tight">
                Overview Destination
              </h2>

            </div>

            {/* Description paragraphs */}
            <div className="space-y-5 text-[15.5px] leading-[1.9] tracking-[-0.005em] text-slate-600 dark:text-slate-300 font-normal">
              <p>{destination?.description}</p>
            </div>

            {/* Highlights */}
            <div className="mt-12">
              <h3 className="text-xl sm:text-[22px] font-bold text-slate-900 dark:text-slate-100 mb-5 flex items-center gap-2 tracking-tight">
                <span className="inline-block w-1 h-5 rounded-full bg-orange-400 mr-1" />
                Destination Highlights
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {destination?.highlights?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3.5 shadow-sm hover:shadow-md hover:border-orange-100 dark:hover:border-orange-500/30 transition-all duration-200"
                  >
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20 flex items-center justify-center">
                      <Check size={11} className="text-green-600 dark:text-green-400" strokeWidth={2.8} />
                    </span>
                    <p className="text-[13.5px] font-medium text-slate-700 dark:text-slate-300 leading-[1.6]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT ─────────────────────────────────────────── */}
          <div className="lg:sticky lg:top-20">
            <Card className="rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900 overflow-hidden">
              <CardHeader className="px-6 pt-6 pb-4">
                <CardTitle className="text-[15px] font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                  Travel Things To Carry
                </CardTitle>
                <p className="text-[12.5px] text-slate-400 dark:text-slate-500 mt-0.5 leading-relaxed">
                  Packing guide by season
                </p>
              </CardHeader>

              <CardContent className="px-6 pb-6 space-y-5">
                {/* Summer */}
                <SeasonBlock
                  icon={SunDim}
                  iconBg="bg-orange-50 dark:bg-orange-500/10"
                  iconColor="text-orange-400 dark:text-orange-300"
                  label="Summer"
                  months={seasonGuide?.summer?.months ?? "Mar – Jun"}
                  essentials={seasonGuide?.summer?.essentials}
                />

                <Separator className="bg-slate-100 dark:bg-slate-800" />

                {/* Monsoon */}
                <SeasonBlock
                  icon={CloudHail}
                  iconBg="bg-sky-50 dark:bg-sky-500/10"
                  iconColor="text-sky-400 dark:text-sky-300"
                  label="Monsoon"
                  months={seasonGuide?.monsoon?.months ?? "Jun – Sep"}
                  essentials={seasonGuide?.monsoon?.essentials}
                />

                <Separator className="bg-slate-100 dark:bg-slate-800" />

                {/* Winter */}
                <SeasonBlock
                  icon={Snowflake}
                  iconBg="bg-teal-50 dark:bg-teal-500/10"
                  iconColor="text-teal-500 dark:text-teal-300"
                  label="Winter"
                  months={seasonGuide?.winter?.months ?? "Nov – Feb"}
                  essentials={seasonGuide?.winter?.essentials}
                />
              </CardContent>
            </Card>
          </div>

        </div>

        {/* Bottom divider */}
        <Separator className="mt-14 bg-slate-200 dark:bg-slate-700" />
      </div>
    </section>
  );
};

export default memo(DestinationDescription);