import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Sparkles, Plus, X, CheckCircle2 } from "lucide-react";

/* ============================================================
   Business logic below is unchanged from the original —
   only markup, structure, and styling have been touched to
   match HighlightsSection's card layout / orange theme.
============================================================ */

/* ============================================================
   Animations — unchanged
============================================================ */

const containerVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const chipVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.7 },
};

/* ============================================================
   Component
============================================================ */

const ExperienceHighlightsSection = ({ formData, setFormData }) => {
  const [highlight, setHighlight] = useState("");

  /* ============================================================
     Add Highlight — unchanged
  ============================================================ */

  const addHighlight = () => {
    const value = highlight.trim();

    if (!value) return;

    if (formData.highlights.includes(value)) return;

    setFormData((prev) => ({
      ...prev,
      highlights: [...prev.highlights, value],
    }));

    setHighlight("");
  };

  /* ============================================================
     Delete Highlight — unchanged
  ============================================================ */

  const removeHighlight = (index) => {
    setFormData((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index),
    }));
  };

  /* ============================================================
     Render
  ============================================================ */

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show">
      <div className="space-y-5 rounded-xl border border-orange-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-6 dark:border-orange-900/30 dark:bg-background">
        {/* Top accent bar — matches the signature treatment used elsewhere */}
        <div className="-mx-4 -mt-4 mb-1 h-1 w-[calc(100%+2rem)] rounded-t-xl bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500 sm:-mx-6 sm:-mt-6 sm:w-[calc(100%+3rem)]" />

        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
              <Sparkles className="h-4.5 w-4.5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold leading-tight text-foreground">
                Experience Highlights
              </h2>
              <p className="text-sm text-muted-foreground">
                Add the best moments of this experience.
              </p>
            </div>
          </div>
        </div>

        {/* Input + Add button */}
        <div className="flex gap-3">
          <Input
            value={highlight}
            placeholder="Example: Sunrise View"
            onChange={(e) => setHighlight(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addHighlight();
              }
            }}
            className="border-orange-100 transition-colors focus-visible:border-orange-400 focus-visible:ring-orange-200 dark:border-orange-900/40 dark:focus-visible:ring-orange-500/20"
          />

          <Button
            type="button"
            onClick={addHighlight}
            className="flex-none bg-orange-600 text-white shadow-sm transition-colors hover:bg-orange-700 active:bg-orange-800"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add
          </Button>
        </div>

        {/* Chips / empty state */}
        <AnimatePresence mode="popLayout">
          {formData.highlights.length > 0 ? (
            <motion.div layout className="flex flex-wrap gap-3">
              {formData.highlights.map((item, index) => (
                <motion.div
                  key={`${item}-${index}`}
                  layout
                  variants={chipVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2
                    dark:border-orange-900/40 dark:bg-orange-500/10"
                >
                  <CheckCircle2 className="h-4 w-4 text-orange-600 dark:text-orange-400" />

                  <span className="text-sm font-medium text-slate-700 dark:text-stone-200">
                    {item}
                  </span>

                  <button
                    type="button"
                    onClick={() => removeHighlight(index)}
                    className="rounded-full p-1 transition hover:bg-red-100 dark:hover:bg-red-500/10"
                    aria-label={`Remove ${item}`}
                  >
                    <X className="h-4 w-4 text-red-500" />
                  </button>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-lg border border-dashed border-orange-200 bg-orange-50/50 p-4 text-center text-sm text-muted-foreground
                dark:border-orange-900/40 dark:bg-orange-500/5"
            >
              <Sparkles className="mx-auto mb-2 h-8 w-8 text-orange-300 dark:text-orange-500/40" />
              <h3 className="text-sm font-semibold text-slate-600 dark:text-stone-300">
                No Highlights Added
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Add important highlights for this experience.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-orange-100 pt-4 dark:border-orange-900/30">
          <span className="text-sm text-muted-foreground">
            Total Highlights
          </span>
          <span className="font-semibold text-orange-600 dark:text-orange-400">
            {formData.highlights.length}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ExperienceHighlightsSection;