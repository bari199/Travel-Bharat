import React from "react";
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

const SeasonBlock = ({ icon: Icon, iconBg, iconColor, label, months, essentials }) => (
  <div className="flex gap-4">
    <div
      className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${iconBg}`}
    >
      <Icon size={19} className={iconColor} />
    </div>

    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <span className="text-sm font-semibold text-slate-800">{label}</span>
        <div className="flex items-center gap-1 text-xs text-slate-400">
          <CalendarClock size={13} />
          <span>{months}</span>
        </div>
      </div>

      <ul className="mt-2.5 space-y-1">
        {essentials?.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-slate-500 leading-5">
            <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-300 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const DestinationDescription = ({ destination }) => {
  const { seasonGuide } = destination ?? {};

  return (
    <section className="w-full py-10 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── MAIN GRID ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 items-start">

          {/* ── LEFT ─────────────────────────────────────────── */}
          <div>

            {/* Eyebrow + heading */}
            <div className="mb-8">
              <Badge
                variant="secondary"
                className="bg-orange-50 text-orange-500 border border-orange-100 text-[11px] font-semibold tracking-wide uppercase rounded-full px-3 py-1"
              >
                Quick Details · Destination
              </Badge>

              <h2 className="mt-4 text-3xl sm:text-[34px] font-bold text-slate-900 leading-tight tracking-tight">
                Overview Destination
              </h2>

            </div>

            {/* Description paragraphs */}
            <div className="space-y-5 text-[15px] leading-[1.85] text-slate-600">
              <p>{destination?.description}</p>
            </div>

            {/* Highlights */}
            <div className="mt-12">
              <h3 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-2">
                <span className="inline-block w-1 h-5 rounded-full bg-orange-400 mr-1" />
                Destination Highlights
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {destination?.highlights?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 bg-white border border-slate-100 rounded-xl px-4 py-3 shadow-sm hover:shadow-md hover:border-orange-100 transition-all duration-200"
                  >
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-green-50 border border-green-100 flex items-center justify-center">
                      <Check size={11} className="text-green-600" strokeWidth={2.8} />
                    </span>
                    <p className="text-[13px] text-slate-700 leading-6">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT ─────────────────────────────────────────── */}
          <div className="lg:sticky lg:top-20">
            <Card className="rounded-3xl border border-slate-200 shadow-sm bg-white overflow-hidden">
              <CardHeader className="px-6 pt-6 pb-4">
                <CardTitle className="text-base font-bold text-slate-900 tracking-tight">
                  Travel Things To Carry
                </CardTitle>
                <p className="text-xs text-slate-400 mt-0.5">
                  Packing guide by season
                </p>
              </CardHeader>

              <CardContent className="px-6 pb-6 space-y-5">
                {/* Summer */}
                <SeasonBlock
                  icon={SunDim}
                  iconBg="bg-orange-50"
                  iconColor="text-orange-400"
                  label="Summer"
                  months={seasonGuide?.summer?.months ?? "Mar – Jun"}
                  essentials={seasonGuide?.summer?.essentials}
                />

                <Separator className="bg-slate-100" />

                {/* Monsoon */}
                <SeasonBlock
                  icon={CloudHail}
                  iconBg="bg-sky-50"
                  iconColor="text-sky-400"
                  label="Monsoon"
                  months={seasonGuide?.monsoon?.months ?? "Jun – Sep"}
                  essentials={seasonGuide?.monsoon?.essentials}
                />

                <Separator className="bg-slate-100" />

                {/* Winter */}
                <SeasonBlock
                  icon={Snowflake}
                  iconBg="bg-teal-50"
                  iconColor="text-teal-500"
                  label="Winter"
                  months={seasonGuide?.winter?.months ?? "Nov – Feb"}
                  essentials={seasonGuide?.winter?.essentials}
                />
              </CardContent>
            </Card>
          </div>

        </div>

        {/* Bottom divider */}
        <Separator className="mt-14 bg-slate-200" />
      </div>
    </section>
  );
};

export default DestinationDescription;