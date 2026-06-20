import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import BasicInfoSection from "../sections/BasicInfoSection";
import TravelInfoSection from "../sections/TravelInfoSection";
import ImagesSection from "../sections/ImagesSection";
import HighlightsSection from "../sections/HighlightsSection";
import BestExperiencesSection from "../sections/BestExperiencesSection";
import NearbyAttractionsSection from "../sections/NearbyAttractionsSection";
import BestSessionsSection from "../sections/BestSessionsSections";
import DescriptionSection from "../sections/DescriptionSection";

import { Button } from "@/components/ui/button";
import {
  MapPinned, Plane, Images, Sparkles,
  Star, Compass, CalendarDays, FileText,
  ChevronLeft, ChevronRight, Check, Loader2,
} from "lucide-react";

/* ── Step metadata ─────────────────────────────────────────── */
const STEP_META = [
  { title: "Basic Info",          subtitle: "Name, city & category",      icon: MapPinned    },
  { title: "Travel Info",         subtitle: "How to reach & best time",   icon: Plane        },
  { title: "Images",              subtitle: "Upload destination photos",   icon: Images       },
  { title: "Highlights",          subtitle: "Key features & USPs",        icon: Sparkles     },
  { title: "Best Experiences",    subtitle: "Activities & things to do",  icon: Star         },
  { title: "Nearby Attractions",  subtitle: "Places around the area",     icon: Compass      },
  { title: "Season Guide",        subtitle: "Month-wise travel tips",     icon: CalendarDays },
  { title: "Description",         subtitle: "Long-form content & details",icon: FileText     },
];

/* ── Step indicator dot ─────────────────────────────────────── */
const StepDot = ({ index, current, total, onClick }) => {
  const state =
    index + 1 < current ? "done" :
    index + 1 === current ? "active" : "upcoming";

  const Meta = STEP_META[index];
  const Icon = Meta.icon;

  return (
    <button
      type="button"
      onClick={() => onClick(index + 1)}
      className="flex flex-col items-center gap-2 group focus:outline-none"
      title={Meta.title}
    >
      {/* Circle */}
      <div className="relative">
        {/* Connector line — left */}
        {index > 0 && (
          <div className={`absolute right-full top-1/2 -translate-y-1/2 h-[2px] w-6
            ${index + 1 <= current ? "bg-sky-400" : "bg-slate-200"} transition-colors duration-500`}
          />
        )}
        {/* Connector line — right */}
        {index < total - 1 && (
          <div className={`absolute left-full top-1/2 -translate-y-1/2 h-[2px] w-6
            ${index + 2 <= current ? "bg-sky-400" : "bg-slate-200"} transition-colors duration-500`}
          />
        )}

        <motion.div
          animate={
            state === "active"   ? { scale: 1.12 } :
            state === "done"     ? { scale: 1 }    : { scale: 0.92 }
          }
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 border-2
            ${state === "active"  ? "bg-sky-500 border-sky-500 text-white shadow-md shadow-sky-200" :
              state === "done"    ? "bg-indigo-500 border-indigo-500 text-white" :
                                    "bg-white border-slate-200 text-slate-400"}`}
        >
          {state === "done"
            ? <Check size={16} strokeWidth={2.5} />
            : <Icon size={16} />}
        </motion.div>
      </div>

      {/* Label — only visible on md+ */}
      <span className={`hidden md:block text-[11px] font-semibold text-center leading-tight transition-colors
        ${state === "active" ? "text-sky-600" : state === "done" ? "text-indigo-500" : "text-slate-400"}`}
      >
        {Meta.title}
      </span>
    </button>
  );
};

/* ════════════════════════════════════════════════════════════ */
const DestinationForm = ({ formData, setFormData, handleSubmit, loading }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back

  const total = STEP_META.length;
  const meta = STEP_META[currentStep - 1];
  const StepIcon = meta.icon;

  /* shared handleChange */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const goTo = (step) => {
    if (step < 1 || step > total) return;
    setDirection(step > currentStep ? 1 : -1);
    setCurrentStep(step);
  };

  const nextStep = () => { if (currentStep < total) goTo(currentStep + 1); };
  const prevStep = () => { if (currentStep > 1)     goTo(currentStep - 1); };

  /* Step → component map */
  const stepComponents = [
    <BasicInfoSection          formData={formData} handleChange={handleChange} />,
    <TravelInfoSection         formData={formData} handleChange={handleChange} />,
    <ImagesSection             formData={formData} setFormData={setFormData}   />,
    <HighlightsSection         formData={formData} setFormData={setFormData}   />,
    <BestExperiencesSection    formData={formData} setFormData={setFormData}   />,
    <NearbyAttractionsSection  formData={formData} setFormData={setFormData}   />,
    <BestSessionsSection       formData={formData} setFormData={setFormData}   />,
    <DescriptionSection        formData={formData} handleChange={handleChange} />,
  ];

  /* Slide animation variants */
  const variants = {
    enter:  (d) => ({ opacity: 0, x: d * 40 }),
    center: { opacity: 1, x: 0 },
    exit:   (d) => ({ opacity: 0, x: d * -40 }),
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-[860px] pb-6">

      {/* ── Stepper bar ──────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white border border-slate-100 rounded-2xl shadow-sm px-6 py-5"
      >
        {/* Top row: fraction + pct */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Creating destination
            </p>
            <p className="text-sm font-bold text-slate-700 mt-0.5">
              Step {currentStep} <span className="text-slate-400 font-normal">of {total}</span>
            </p>
          </div>
          <span className="text-xs font-bold text-sky-600 bg-sky-50 border border-sky-100 px-3 py-1 rounded-full">
            {Math.round((currentStep / total) * 100)}% complete
          </span>
        </div>

        {/* Step dots with connector lines */}
        <div className="flex items-start justify-between px-2">
          {STEP_META.map((_, i) => (
            <StepDot
              key={i}
              index={i}
              current={currentStep}
              total={total}
              onClick={goTo}
            />
          ))}
        </div>

        {/* Overall progress bar */}
        <div className="mt-5 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-sky-400 to-indigo-500"
            animate={{ width: `${(currentStep / total) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* ── Step card ────────────────────────────────────────── */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">

        {/* Card header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-slate-50/60">
          <span className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center shrink-0">
            <StepIcon size={17} className="text-sky-500" />
          </span>
          <div>
            <h2 className="text-sm font-bold text-slate-800">{meta.title}</h2>
            <p className="text-xs text-slate-400 mt-0.5">{meta.subtitle}</p>
          </div>

          {/* Mini step pills — mobile only */}
          <div className="ml-auto flex items-center gap-1.5 md:hidden">
            {STEP_META.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300
                  ${i + 1 === currentStep ? "w-5 bg-sky-500" :
                    i + 1 < currentStep    ? "w-2 bg-indigo-400" : "w-2 bg-slate-200"}`}
              />
            ))}
          </div>
        </div>

        {/* Animated step content */}
        <div className="p-6 min-h-[300px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: "easeInOut" }}
            >
              {stepComponents[currentStep - 1]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Navigation ───────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-between gap-4"
      >
        {/* Previous */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="h-10 px-5 text-sm font-semibold border-slate-200 text-slate-600
              hover:bg-slate-50 hover:text-slate-800 rounded-xl gap-2 disabled:opacity-40"
          >
            <ChevronLeft size={16} />
            Previous
          </Button>
        </motion.div>

        {/* Step count — centre */}
        <div className="flex items-center gap-1.5">
          {STEP_META.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i + 1)}
              className={`rounded-full transition-all duration-300 focus:outline-none
                ${i + 1 === currentStep
                  ? "w-5 h-2 bg-sky-500"
                  : i + 1 < currentStep
                    ? "w-2 h-2 bg-indigo-400 hover:bg-indigo-500"
                    : "w-2 h-2 bg-slate-200 hover:bg-slate-300"}`}
              aria-label={`Go to step ${i + 1}`}
            />
          ))}
        </div>

        {/* Next / Submit */}
        {currentStep < total ? (
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
            <Button
              type="button"
              onClick={nextStep}
              className="h-10 px-5 text-sm font-semibold bg-sky-500 hover:bg-sky-600
                text-white rounded-xl gap-2 shadow-sm shadow-sky-200"
            >
              Save & Next
              <ChevronRight size={16} />
            </Button>
          </motion.div>
        ) : (
          <motion.div
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.97 }}
          >
            <Button
              type="submit"
              disabled={loading}
              className="h-10 px-6 text-sm font-semibold bg-indigo-600 hover:bg-indigo-700
                text-white rounded-xl gap-2 shadow-sm shadow-indigo-200 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Creating…
                </>
              ) : (
                <>
                  <Check size={15} />
                  Create Destination
                </>
              )}
            </Button>
          </motion.div>
        )}
      </motion.div>
    </form>
  );
};

export default DestinationForm;