import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Info,
  Images,
  FileText,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Check,
  Loader2,
  X,
  RotateCcw,
} from "lucide-react";

import ExperienceBasicInfoSection from "../Exsections/ExperienceBasicInfoSection";
import ExperienceImagesSection from "../Exsections/ExperienceImagesSection";
import ExperienceHighlightsSection from "../Exsections/ExperienceHighlightsSection";
import ExperienceDescriptionSection from "../Exsections/ExperienceDescriptionSection";

import { initialExperienceData } from "./initialExperienceData";

import { createExperience, updateExperience } from "@/services/experienceApi";

/* ── Step metadata (mirrors DestinationForm's STEP_META) ─────── */
const STEP_META = [
  { title: "Basic Info", subtitle: "Title, destination & summary", icon: Info },
  { title: "Images", subtitle: "Upload experience photos", icon: Images },
  { title: "Highlights", subtitle: "Key features & USPs", icon: Sparkles },
  { title: "Description", subtitle: "Long-form content & details", icon: FileText },
];

/* ── Step indicator dot (same look as DestinationForm) ────────── */
const StepDot = ({ index, current, total, onClick }) => {
  const state =
    index + 1 < current
      ? "done"
      : index + 1 === current
        ? "active"
        : "upcoming";

  const Meta = STEP_META[index];
  const Icon = Meta.icon;

  // Only allow navigating to steps already completed (or the current one) —
  // never skip ahead, so step validation order is never bypassed.
  const clickable = index + 1 <= current;

  return (
    <button
      type="button"
      onClick={() => clickable && onClick(index + 1)}
      className={`flex flex-col items-center gap-2 group focus:outline-none ${
        clickable ? "cursor-pointer" : "cursor-default"
      }`}
      title={Meta.title}
    >
      <div className="relative">
        {index > 0 && (
          <div
            className={`absolute right-full top-1/2 -translate-y-1/2 h-[2px] w-6
            ${index + 1 <= current ? "bg-orange-400" : "bg-slate-200 dark:bg-stone-700"} transition-colors duration-500`}
          />
        )}
        {index < total - 1 && (
          <div
            className={`absolute left-full top-1/2 -translate-y-1/2 h-[2px] w-6
            ${index + 2 <= current ? "bg-orange-400" : "bg-slate-200 dark:bg-stone-700"} transition-colors duration-500`}
          />
        )}

        <motion.div
          animate={
            state === "active"
              ? { scale: 1.12 }
              : state === "done"
                ? { scale: 1 }
                : { scale: 0.92 }
          }
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 border-2
            ${
              state === "active"
                ? "bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-200 dark:shadow-none"
                : state === "done"
                  ? "bg-amber-500 border-amber-500 text-white"
                  : "bg-white dark:bg-stone-900 border-slate-200 dark:border-stone-700 text-slate-400 dark:text-stone-500"
            }`}
        >
          {state === "done" ? (
            <Check size={16} strokeWidth={2.5} />
          ) : (
            <Icon size={16} />
          )}
        </motion.div>
      </div>

      <span
        className={`hidden md:block text-[11px] font-semibold text-center leading-tight transition-colors
        ${state === "active" ? "text-orange-600 dark:text-orange-400" : state === "done" ? "text-amber-500 dark:text-amber-400" : "text-slate-400 dark:text-stone-500"}`}
      >
        {Meta.title}
      </span>
    </button>
  );
};

/* ════════════════════════════════════════════════════════════ */
const ExperienceForm = ({
  initialData = null,
  isEdit = false,
  experienceId = null,
  onSuccess,
}) => {
  /* ===========================================================
     States — unchanged from original
  =========================================================== */
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(initialExperienceData);

  const total = STEP_META.length;
  const meta = STEP_META[step - 1];
  const StepIcon = meta.icon;

  /* ===========================================================
     Edit Mode — unchanged
  =========================================================== */

  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
        ...initialExperienceData,
        ...initialData,
      });
    }
  }, [isEdit, initialData]);

  /* ===========================================================
     Handle Input Change — unchanged
  =========================================================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  /* ===========================================================
     Validation — unchanged
  =========================================================== */

  const validateStep = () => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.destination) {
          newErrors.destination = "Destination is required.";
        }

        if (!formData.title?.trim()) {
          newErrors.title = "Title is required.";
        }

        if (!formData.shortDescription?.trim()) {
          newErrors.shortDescription = "Short description is required.";
        }

        break;

      case 2:
        if (!formData.images || formData.images.length === 0) {
          newErrors.images = "Upload at least one image.";
        }

        break;

      case 3:
        if (!formData.highlights || formData.highlights.length === 0) {
          newErrors.highlights = "Add at least one highlight.";
        }

        break;

      case 4:
        if (!formData.description?.trim()) {
          newErrors.description = "Description is required.";
        } else if (formData.description.length < 120) {
          newErrors.description = "Minimum 120 characters required.";
        }

        break;

      default:
        break;
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* ===========================================================
     Step navigation — same rules as original, direction tracked
     only for the slide animation (purely visual, no logic change)
  =========================================================== */

  const nextStep = () => {
    if (!validateStep()) return;

    setDirection(1);
    setStep((prev) => Math.min(prev + 1, STEP_META.length));
  };

  const previousStep = () => {
    setDirection(-1);
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const goTo = (target) => {
    if (target > step) return;
    setDirection(target > step ? 1 : -1);
    setStep(target);
  };

  /* ===========================================================
     Reset Form — unchanged
  =========================================================== */

  const resetForm = () => {
    setFormData(initialExperienceData);
    setErrors({});
    setStep(1);
    setDirection(1);
  };

  /* ===========================================================
     Submit — unchanged
  =========================================================== */

  const handleSubmit = async () => {
    if (!validateStep()) return;

    try {
      setLoading(true);

      let response;

      if (isEdit) {
        response = await updateExperience(experienceId, formData);

        toast.success(response?.message || "Experience updated successfully.");
      } else {
        response = await createExperience(formData);

        toast.success(response?.message || "Experience created successfully.");

        resetForm();
      }

      if (onSuccess) {
        onSuccess(response);
      }
    } catch (error) {
      console.error(error);

      toast.error(error?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  /* ===========================================================
     Step → component map — unchanged content, same components
  =========================================================== */

  const stepComponents = [
    <ExperienceBasicInfoSection
      formData={formData}
      setFormData={setFormData}
      handleChange={handleChange}
      errors={errors}
    />,
    <ExperienceImagesSection
      formData={formData}
      setFormData={setFormData}
      errors={errors}
    />,
    <ExperienceHighlightsSection
      formData={formData}
      setFormData={setFormData}
      errors={errors}
    />,
    <ExperienceDescriptionSection
      formData={formData}
      handleChange={handleChange}
      errors={errors}
    />,
  ];

  /* Slide animation variants — matches DestinationForm */
  const variants = {
    enter: (d) => ({ opacity: 0, x: d * 40 }),
    center: { opacity: 1, x: 0 },
    exit: (d) => ({ opacity: 0, x: d * -40 }),
  };

  return (
    <div className="space-y-6 max-w-[860px] pb-6">
      {/* ── Header ───────────────────────────────────────────── */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-stone-100">
          {isEdit ? "Edit Experience" : "Add Experience"}
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-stone-400">
          Fill in the details below to create a memorable travel experience.
        </p>
      </div>

      {/* ── Stepper bar ──────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white dark:bg-stone-900 border border-slate-100 dark:border-stone-800 rounded-2xl shadow-sm px-4 sm:px-6 py-5"
      >
        {/* Top row: fraction + pct */}
        <div className="flex items-center justify-between mb-5 gap-3">
          <div>
            <p className="text-xs font-semibold text-slate-400 dark:text-stone-500 uppercase tracking-wide">
              {isEdit ? "Editing experience" : "Creating experience"}
            </p>
            <p className="text-sm font-bold text-slate-700 dark:text-stone-200 mt-0.5">
              Step {step}{" "}
              <span className="text-slate-400 dark:text-stone-500 font-normal">
                of {total}
              </span>
            </p>
          </div>
          <span className="text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 px-3 py-1 rounded-full whitespace-nowrap">
            {Math.round((step / total) * 100)}% complete
          </span>
        </div>

        {/* Step dots with connector lines */}
        <div className="flex items-start justify-between px-2 overflow-x-auto">
          {STEP_META.map((_, i) => (
            <StepDot
              key={i}
              index={i}
              current={step}
              total={total}
              onClick={goTo}
            />
          ))}
        </div>

        {/* Overall progress bar */}
        <div className="mt-5 h-1.5 bg-slate-100 dark:bg-stone-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-orange-400 to-amber-500"
            animate={{ width: `${(step / total) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* ── Step card ────────────────────────────────────────── */}
      <div className="bg-white dark:bg-stone-900 border border-slate-100 dark:border-stone-800 rounded-2xl shadow-sm overflow-hidden">
        {/* Card header */}
        <div className="flex items-center gap-3 px-4 sm:px-6 py-4 border-b border-slate-100 dark:border-stone-800 bg-slate-50/60 dark:bg-stone-800/60">
          <span className="w-9 h-9 rounded-xl bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center shrink-0">
            <StepIcon size={17} className="text-orange-500 dark:text-orange-400" />
          </span>
          <div>
            <h2 className="text-sm font-bold text-slate-800 dark:text-stone-100">
              {meta.title}
            </h2>
            <p className="text-xs text-slate-400 dark:text-stone-500 mt-0.5">
              {meta.subtitle}
            </p>
          </div>

          {/* Mini step pills — mobile only */}
          <div className="ml-auto flex items-center gap-1.5 md:hidden">
            {STEP_META.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300
                  ${
                    i + 1 === step
                      ? "w-5 bg-orange-500"
                      : i + 1 < step
                        ? "w-2 bg-amber-400"
                        : "w-2 bg-slate-200 dark:bg-stone-700"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Animated step content */}
        <div className="p-4 sm:p-6 min-h-[300px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: "easeInOut" }}
            >
              {stepComponents[step - 1]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Navigation ───────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        {/* Cancel + Reset + Previous */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto order-2 sm:order-1 flex-wrap">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
            <Button
              type="button"
              variant="outline"
              disabled={loading}
              onClick={() => onSuccess && onSuccess()}
              className="h-10 px-4 text-sm font-semibold border-slate-200 dark:border-stone-700 text-slate-500 dark:text-stone-400
                hover:bg-slate-50 dark:hover:bg-stone-800 hover:text-slate-700 dark:hover:text-stone-200 rounded-xl gap-2"
            >
              <X size={16} />
              Cancel
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
            <Button
              type="button"
              variant="outline"
              disabled={loading}
              onClick={() => {
                const confirmed = window.confirm(
                  "Are you sure you want to reset the form?",
                );
                if (!confirmed) return;
                resetForm();
              }}
              className="h-10 px-4 text-sm font-semibold border-slate-200 dark:border-stone-700 text-slate-500 dark:text-stone-400
                hover:bg-slate-50 dark:hover:bg-stone-800 hover:text-slate-700 dark:hover:text-stone-200 rounded-xl gap-2"
            >
              <RotateCcw size={15} />
              Reset
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
            <Button
              type="button"
              variant="outline"
              onClick={previousStep}
              disabled={step === 1 || loading}
              className="h-10 px-5 text-sm font-semibold border-slate-200 dark:border-stone-700 text-slate-600 dark:text-stone-300
                hover:bg-slate-50 dark:hover:bg-stone-800 hover:text-slate-800 dark:hover:text-stone-100 rounded-xl gap-2 disabled:opacity-40"
            >
              <ChevronLeft size={16} />
              Previous
            </Button>
          </motion.div>
        </div>

        {/* Step count — centre */}
        <div className="flex items-center gap-1.5 order-1 sm:order-2">
          {STEP_META.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i + 1)}
              className={`rounded-full transition-all duration-300 focus:outline-none
                ${
                  i + 1 === step
                    ? "w-5 h-2 bg-orange-500"
                    : i + 1 < step
                      ? "w-2 h-2 bg-amber-400 hover:bg-amber-500"
                      : "w-2 h-2 bg-slate-200 dark:bg-stone-700"
                }`}
              aria-label={`Go to step ${i + 1}`}
            />
          ))}
        </div>

        {/* Next / Submit */}
        <div className="order-3 w-full sm:w-auto flex justify-end">
          {step < total ? (
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Button
                type="button"
                onClick={nextStep}
                className="h-10 px-5 text-sm font-semibold bg-orange-500 hover:bg-orange-600
                  text-white rounded-xl gap-2 shadow-sm shadow-orange-200 dark:shadow-none"
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
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="h-10 px-6 text-sm font-semibold bg-amber-600 hover:bg-amber-700
                  text-white rounded-xl gap-2 shadow-sm shadow-amber-200 dark:shadow-none disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    {isEdit ? "Updating…" : "Creating…"}
                  </>
                ) : (
                  <>
                    <Check size={15} />
                    {isEdit ? "Update Experience" : "Create Experience"}
                  </>
                )}
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* ── Validation hint ──────────────────────────────────── */}
      {Object.keys(errors).length > 0 && (
        <p className="text-xs font-medium text-red-500 text-center sm:text-left">
          Please fix the validation errors before continuing.
        </p>
      )}
    </div>
  );
};

export default ExperienceForm;