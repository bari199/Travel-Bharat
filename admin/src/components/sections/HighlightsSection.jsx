import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

/* ============================================================
   Business logic below is unchanged from the original —
   only markup, structure, and styling have been touched.
============================================================ */

const HighlightsSection = ({ formData, setFormData }) => {
  const addHighlight = () => {
    setFormData({
      ...formData,
      highlights: [...formData.highlights, ""],
    });
  };

  const removeHighlight = (index) => {
    const updated = formData.highlights.filter((_, i) => i !== index);

    setFormData({
      ...formData,
      highlights: updated,
    });
  };

  const updateHighlight = (index, value) => {
    const updated = [...formData.highlights];

    updated[index] = value;

    setFormData({
      ...formData,
      highlights: updated,
    });
  };

  return (
    <div className="space-y-5 rounded-xl border border-orange-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-6 dark:border-orange-900/30 dark:bg-background">
      {/* Top accent bar — matches the signature treatment used elsewhere */}
      <div className="-mx-4 -mt-4 mb-1 h-1 w-[calc(100%+2rem)] rounded-t-xl bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500 sm:-mx-6 sm:-mt-6 sm:w-[calc(100%+3rem)]" />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
            <Sparkles className="h-4.5 w-4.5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold leading-tight text-foreground">
              Highlights
            </h2>
            <p className="text-sm text-muted-foreground">
              Call out the standout moments of this experience.
            </p>
          </div>
        </div>

        <Button
          type="button"
          onClick={addHighlight}
          className="w-full bg-orange-600 text-white shadow-sm transition-colors hover:bg-orange-700 active:bg-orange-800 sm:w-auto"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Highlight
        </Button>
      </div>

      <motion.div layout className="space-y-2.5">
        <AnimatePresence initial={false}>
          {formData.highlights.map((highlight, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="group flex items-center gap-2 overflow-hidden"
            >
              <div className="flex h-9 w-7 flex-none items-center justify-center text-xs font-medium text-orange-400">
                {index + 1}
              </div>

              <Input
                placeholder={`Highlight ${index + 1}`}
                value={highlight}
                onChange={(e) => updateHighlight(index, e.target.value)}
                className="border-orange-100 transition-colors focus-visible:border-orange-400 focus-visible:ring-orange-200 dark:border-orange-900/40 dark:focus-visible:ring-orange-500/20"
              />

              {formData.highlights.length > 1 && (
                <Button
                  type="button"
                  size="icon"
                  variant="destructive"
                  onClick={() => removeHighlight(index)}
                  className="flex-none bg-orange-600/90 opacity-70 transition-opacity hover:bg-orange-700 hover:opacity-100 focus-visible:opacity-100 group-hover:opacity-100"
                  aria-label={`Remove highlight ${index + 1}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {formData.highlights.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-lg border border-dashed border-orange-200 bg-orange-50/50 p-4 text-center text-sm text-muted-foreground dark:border-orange-900/40 dark:bg-orange-500/5"
          >
            No highlights yet — add one to get started.
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default HighlightsSection;