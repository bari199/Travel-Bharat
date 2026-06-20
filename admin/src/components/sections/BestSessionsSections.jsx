import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Plus,
  Trash2,
  CalendarRange,
  Sun,
  CloudRain,
  Snowflake,
  Backpack,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

/* ============================================================
   Business logic below (updateMonths, addEssential,
   updateEssential, removeEssential) is unchanged from the
   original — only markup, structure, and styling are new.
============================================================ */

const seasons = ["summer", "monsoon", "winter"];

// Visual identity per season — purely presentational, layered
// on top of the shared orange theme used across the rest of the form.
const seasonStyles = {
  summer: {
    icon: Sun,
    label: "text-amber-700 dark:text-amber-400",
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
    border: "border-amber-100 dark:border-amber-900/30",
    bg: "bg-amber-50/40 dark:bg-amber-500/[0.03]",
    bar: "from-amber-400 via-orange-400 to-orange-500",
  },
  monsoon: {
    icon: CloudRain,
    label: "text-sky-700 dark:text-sky-400",
    badge: "bg-sky-100 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400",
    border: "border-sky-100 dark:border-sky-900/30",
    bg: "bg-sky-50/40 dark:bg-sky-500/[0.03]",
    bar: "from-sky-400 via-orange-400 to-orange-500",
  },
  winter: {
    icon: Snowflake,
    label: "text-orange-700 dark:text-orange-400",
    badge: "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400",
    border: "border-orange-100 dark:border-orange-900/30",
    bg: "bg-orange-50/40 dark:bg-orange-500/[0.03]",
    bar: "from-orange-400 via-orange-500 to-amber-500",
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: -8, height: 0 },
  show: {
    opacity: 1,
    y: 0,
    height: "auto",
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    height: 0,
    marginBottom: 0,
    transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] },
  },
};

function FieldLabel({ icon: Icon, children, className = "" }) {
  return (
    <Label
      className={`mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground ${className}`}
    >
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {children}
    </Label>
  );
}

const BestSessionsSections = ({ formData, setFormData }) => {
  const updateMonths = (season, value) => {
    setFormData((prev) => ({
      ...prev,
      seasonGuide: {
        ...prev.seasonGuide,
        [season]: {
          ...prev.seasonGuide?.[season],
          months: value,
        },
      },
    }));
  };

  const addEssential = (season) => {
    setFormData((prev) => ({
      ...prev,
      seasonGuide: {
        ...prev.seasonGuide,
        [season]: {
          ...prev.seasonGuide?.[season],
          essentials: [
            ...(prev.seasonGuide?.[season]?.essentials || []),
            "",
          ],
        },
      },
    }));
  };

  const updateEssential = (season, index, value) => {
    const updated = [
      ...(formData.seasonGuide?.[season]?.essentials || []),
    ];

    updated[index] = value;

    setFormData((prev) => ({
      ...prev,
      seasonGuide: {
        ...prev.seasonGuide,
        [season]: {
          ...prev.seasonGuide?.[season],
          essentials: updated,
        },
      },
    }));
  };

  const removeEssential = (season, index) => {
    const updated = (
      formData.seasonGuide?.[season]?.essentials || []
    ).filter((_, i) => i !== index);

    setFormData((prev) => ({
      ...prev,
      seasonGuide: {
        ...prev.seasonGuide,
        [season]: {
          ...prev.seasonGuide?.[season],
          essentials: updated,
        },
      },
    }));
  };

  return (
    <div className="space-y-6 rounded-xl border border-orange-100 bg-white p-4 shadow-sm sm:p-6 dark:border-orange-900/30 dark:bg-background">
      {/* Top accent bar — matches the signature treatment used elsewhere */}
      <div className="-mx-4 -mt-4 h-1 w-[calc(100%+2rem)] rounded-t-xl bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500 sm:-mx-6 sm:-mt-6 sm:w-[calc(100%+3rem)]" />

      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
          <CalendarRange className="h-4.5 w-4.5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold leading-tight text-foreground sm:text-xl">
            Season Guide
          </h2>
          <p className="text-sm text-muted-foreground">
            Set the ideal months and packing essentials for each season.
          </p>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {seasons.map((season) => {
          const style = seasonStyles[season];
          const Icon = style.icon;
          const essentials =
            formData.seasonGuide?.[season]?.essentials || [];

          return (
            <div
              key={season}
              className={`flex flex-col overflow-hidden rounded-xl border ${style.border} ${style.bg}`}
            >
              <div className={`h-1 w-full bg-gradient-to-r ${style.bar}`} />

              <div className="flex flex-1 flex-col gap-4 p-4">
                {/* Season header */}
                <div className="flex items-center gap-2.5">
                  <span
                    className={`flex h-8 w-8 flex-none items-center justify-center rounded-lg ${style.badge}`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className={`font-semibold capitalize ${style.label}`}>
                    {season}
                  </h3>
                </div>

                {/* Months */}
                <div>
                  <FieldLabel icon={CalendarRange}>Months</FieldLabel>
                  <Input
                    placeholder="e.g. Mar - Jun"
                    value={formData.seasonGuide?.[season]?.months || ""}
                    onChange={(e) => updateMonths(season, e.target.value)}
                    className="border-orange-100 bg-white focus-visible:border-orange-400 focus-visible:ring-orange-200 dark:border-orange-900/40 dark:bg-transparent"
                  />
                </div>

                {/* Essentials */}
                <div className="flex flex-1 flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <FieldLabel icon={Backpack} className="!mb-0">
                      Essentials
                    </FieldLabel>

                    <Button
                      type="button"
                      size="sm"
                      onClick={() => addEssential(season)}
                      className="bg-orange-600 text-white shadow-sm transition-colors hover:bg-orange-700 active:bg-orange-800"
                    >
                      <Plus className="mr-1.5 h-3.5 w-3.5" />
                      Add
                    </Button>
                  </div>

                  <motion.div layout className="space-y-2">
                    <AnimatePresence initial={false}>
                      {essentials.map((item, index) => (
                        <motion.div
                          key={index}
                          layout
                          variants={cardVariants}
                          initial="hidden"
                          animate="show"
                          exit="exit"
                          className="flex items-center gap-2 overflow-hidden"
                        >
                          <Input
                            value={item}
                            placeholder="Essential item"
                            onChange={(e) =>
                              updateEssential(season, index, e.target.value)
                            }
                            className="border-orange-100 bg-white text-sm focus-visible:border-orange-400 focus-visible:ring-orange-200 dark:border-orange-900/40 dark:bg-transparent"
                          />

                          <Button
                            type="button"
                            size="icon"
                            variant="destructive"
                            onClick={() => removeEssential(season, index)}
                            className="flex-none bg-orange-600/90 hover:bg-orange-700"
                            aria-label="Remove essential"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {essentials.length === 0 && (
                      <p className="rounded-md border border-dashed border-orange-200/80 bg-white/40 px-3 py-2.5 text-center text-xs text-muted-foreground dark:border-orange-900/30 dark:bg-transparent">
                        No essentials yet
                      </p>
                    )}
                  </motion.div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BestSessionsSections;