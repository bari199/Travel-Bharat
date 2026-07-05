import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Plane, Clock, Ticket, Star, RotateCcw } from "lucide-react";

/* ── Field config (mirrors BasicInfoSection's FIELDS pattern) ── */
const FIELDS = [
  {
    name: "bestTimeToVisit",
    label: "Best Time to Visit",
    placeholder: "e.g. October to March",
    icon: Clock,
    hint: "Recommended months or seasons for the best experience",
  },
  {
    name: "entryFee",
    label: "Entry Fee",
    placeholder: "e.g. ₹50 per person / Free entry",
    icon: Ticket,
    hint: 'Admission charges for adults — mention "Free" if no fee applies',
  },
];

/* ── Animated field wrapper ─────────────────────────────── */
const FormField = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

/* ── Icon input ─────────────────────────────────────────── */
const IconInput = ({ icon: Icon, error, ...props }) => (
  <div className="relative group">
    <Icon
      size={15}
      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-stone-500
        group-focus-within:text-orange-500 dark:group-focus-within:text-orange-400 transition-colors pointer-events-none"
    />
    <Input
      {...props}
      className={`pl-9 h-10 text-sm bg-white dark:bg-stone-900 border-slate-200 dark:border-stone-700 rounded-xl
        placeholder:text-slate-400 dark:placeholder:text-stone-500 text-slate-800 dark:text-stone-100
        focus:border-orange-400 dark:focus:border-orange-500 focus:ring-2 focus:ring-orange-100 dark:focus:ring-orange-500/20
        hover:border-slate-300 dark:hover:border-stone-600 transition-all duration-200
        ${error ? "border-rose-300 dark:border-rose-500/40 focus:border-rose-400 focus:ring-rose-100 dark:focus:ring-rose-500/20" : ""}
      `}
    />
  </div>
);

/* ════════════════════════════════════════════════════════════ */
const TravelInfoSection = ({ formData, handleChange, errors = {} }) => {
  const [touched, setTouched] = useState({});

  const handleBlur = (name) => setTouched((prev) => ({ ...prev, [name]: true }));

  const getFieldError = (field) => {
    if (errors[field.name]) return errors[field.name];
    if (field.required && touched[field.name] && !String(formData[field.name] || "").trim()) {
      return `${field.label} is required`;
    }
    return null;
  };

  /* ── Reset: clears only the fields this section owns, via the
     same handleChange the parent already provided ── */
  const handleReset = () => {
    FIELDS.forEach((field) => {
      handleChange({ target: { name: field.name, value: "" } });
    });
    handleChange({ target: { name: "featured", value: false } });
    setTouched({});
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-white dark:bg-stone-900 border border-slate-100 dark:border-stone-800 rounded-2xl shadow-sm overflow-hidden"
    >
      {/* ── Section header ── */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 dark:border-stone-800 bg-slate-50/60 dark:bg-stone-800/60">
        <span className="w-8 h-8 rounded-xl bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center shrink-0">
          <Plane size={16} className="text-orange-500 dark:text-orange-400" />
        </span>
        <div>
          <h2 className="text-sm font-bold text-slate-800 dark:text-stone-100">Travel Information</h2>
          <p className="text-xs text-slate-400 dark:text-stone-500 mt-0.5">Practical details for visitors</p>
        </div>
      </div>

      {/* ── Fields ── */}
      <div className="p-6 space-y-5">
        {FIELDS.map((field, i) => {
          const { name, label, placeholder, icon: Icon, hint } = field;
          const fieldError = getFieldError(field);
          return (
            <FormField key={name} delay={0.05 + i * 0.05}>
              <Label
                htmlFor={name}
                className="text-xs font-semibold text-slate-600 dark:text-stone-300 mb-1.5 flex items-center gap-1.5"
              >
                <Icon size={12} className="text-slate-400 dark:text-stone-500" />
                {label}
              </Label>
              <IconInput
                id={name}
                name={name}
                icon={Icon}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleChange}
                onBlur={() => handleBlur(name)}
                error={fieldError}
              />
              {fieldError ? (
                <p className="text-xs text-rose-500 mt-1.5 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-rose-400 inline-block" />
                  {fieldError}
                </p>
              ) : hint ? (
                <p className="text-xs text-slate-400 dark:text-stone-500 mt-1.5">{hint}</p>
              ) : null}
            </FormField>
          );
        })}

        {/* Divider */}
        <div className="border-t border-slate-100 dark:border-stone-800" />

        {/* Featured toggle */}
        <FormField delay={0.15}>
          <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-amber-50/60 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20">
            <div className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <Star size={15} className="text-amber-500 dark:text-amber-400 fill-amber-400 dark:fill-amber-500" />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-stone-100">Featured Destination</p>
                <p className="text-xs text-slate-500 dark:text-stone-400 mt-0.5 leading-relaxed">
                  Featured destinations appear in the homepage spotlight and top search results
                </p>
              </div>
            </div>

            {/* shadcn Switch — same business logic as the original checkbox */}
            <Switch
              id="featured"
              checked={!!formData.featured}
              onCheckedChange={(checked) =>
                handleChange({
                  target: {
                    name: "featured",
                    value: checked,
                  },
                })
              }
              className="data-[state=checked]:bg-amber-500 shrink-0 mt-1"
            />
          </div>
        </FormField>
      </div>

      {/* ── Reset ── */}
      <div className="flex justify-end px-4 sm:px-6 py-4 border-t border-slate-100 dark:border-stone-800 bg-slate-50/60 dark:bg-stone-800/60">
        <Button
          type="button"
          variant="outline"
          onClick={handleReset}
          className="h-9 px-4 text-xs font-semibold border-orange-200 dark:border-orange-500/30 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-500/10 hover:border-orange-300 dark:hover:border-orange-500/40 gap-1.5 w-full sm:w-auto"
        >
          <RotateCcw size={13} />
          Reset Section
        </Button>
      </div>
    </motion.div>
  );
};

export default TravelInfoSection;