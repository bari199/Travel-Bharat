import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPinned, Tag, Map, Building2,
  Layers, Navigation, Ruler, RotateCcw,
} from "lucide-react";

/* ── Category options matching Travel Bharat regions ── */
const CATEGORIES = [
  "Beach", "Mountain", "Heritage", "Forest",
  "Desert", "Wildlife", "Religious", "Hill Station",
  "Waterfall", "Lake", "Adventure", "Cultural",
];

/* ── Category color dots ── */
const CATEGORY_COLORS = {
  Beach:        "bg-sky-400",
  Mountain:     "bg-indigo-400",
  Heritage:     "bg-amber-400",
  Forest:       "bg-emerald-400",
  Desert:       "bg-orange-400",
  Wildlife:     "bg-lime-500",
  Spiritual:    "bg-purple-400",
  "Hill Station":"bg-cyan-400",
  Waterfall:    "bg-blue-400",
  Lake:         "bg-teal-400",
  Adventure:    "bg-rose-400",
  Cultural:     "bg-pink-400",
};

/* ── Field config ── */
const FIELDS = [
  {
    name: "name",
    label: "Destination Name",
    placeholder: "e.g. Manali",
    icon: MapPinned,
    hint: "The primary display name of the destination",
    required: true,
    colSpan: 2,
  },
  {
    name: "title",
    label: "Page Title",
    placeholder: "e.g. Manali — Gateway to the Himalayas",
    icon: Tag,
    hint: "SEO-friendly title shown in search results",
    required: true,
    colSpan: 2,
  },
  {
    name: "state",
    label: "State",
    placeholder: "e.g. Himachal Pradesh",
    icon: Map,
    required: true,
  },
  {
    name: "city",
    label: "City / Town",
    placeholder: "e.g. Manali",
    icon: Building2,
    required: true,
  },
  {
    name: "location",
    label: "Location / Address",
    placeholder: "e.g. Old Manali, Kullu District",
    icon: Navigation,
    hint: "Specific address or landmark description",
  },
  {
    name: "area",
    label: "Area / Zone",
    placeholder: "e.g. Kullu Valley",
    icon: Ruler,
    hint: "Broader geographical zone or taluka",
  },
];

/* ── Animated field wrapper ── */
const FormField = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

/* ── Styled input with icon ── */
const IconInput = ({ icon: Icon, error, ...props }) => (
  <div className="relative group">
    <Icon
      size={15}
      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-stone-500 group-focus-within:text-orange-500 dark:group-focus-within:text-orange-400 transition-colors pointer-events-none"
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
const BasicInfoSection = ({ formData, handleChange, errors = {} }) => {
  const [touched, setTouched] = useState({});

  const handleBlur = (name) => setTouched((prev) => ({ ...prev, [name]: true }));

  const getFieldError = (field) => {
    if (errors[field.name]) return errors[field.name];
    if (field.required && touched[field.name] && !String(formData[field.name] || "").trim()) {
      return `${field.label} is required`;
    }
    return null;
  };

  const categoryError =
    errors.category || (touched.category && !formData.category ? "Category is required" : null);

  /* Adapter so Select onChange matches handleChange signature */
  const handleSelectChange = (value) => {
    handleChange({ target: { name: "category", value } });
    setTouched((prev) => ({ ...prev, category: true }));
  };

  /* ── Reset: clears only the fields this section owns, via the
     same handleChange the parent already provided ── */
  const handleReset = () => {
    FIELDS.forEach((field) => {
      handleChange({ target: { name: field.name, value: "" } });
    });
    handleChange({ target: { name: "category", value: "" } });
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
      <div className="flex flex-wrap items-center gap-3 px-4 sm:px-6 py-4 border-b border-slate-100 dark:border-stone-800 bg-slate-50/60 dark:bg-stone-800/60">
        <span className="w-8 h-8 rounded-xl bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center shrink-0">
          <MapPinned size={16} className="text-orange-500 dark:text-orange-400" />
        </span>
        <div>
          <h2 className="text-sm font-bold text-slate-800 dark:text-stone-100">Added Here Basic Information</h2>
          <p className="text-xs text-slate-400 dark:text-stone-500 mt-0.5">Core details about the destination</p>
        </div>
        <span className="ml-auto text-xs text-slate-400 dark:text-stone-500 whitespace-nowrap">
          <span className="text-rose-400">*</span> Required fields
        </span>
      </div>

      {/* ── Form body ── */}
      <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-5">
        {FIELDS.map((field, i) => {
          const { name, label, placeholder, icon, hint, required, colSpan } = field;
          const fieldError = getFieldError(field);
          return (
            <FormField key={name} delay={i * 0.05}>
              <div className={colSpan === 2 ? "sm:col-span-2" : ""}>
                <Label
                  htmlFor={name}
                  className="text-xs font-semibold text-slate-600 dark:text-stone-300 mb-1.5 flex items-center gap-1"
                >
                  {label}
                  {required && <span className="text-rose-400 text-[10px]">*</span>}
                </Label>
                <IconInput
                  id={name}
                  name={name}
                  icon={icon}
                  placeholder={placeholder}
                  value={formData[name] || ""}
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
              </div>
            </FormField>
          );
        })}

        {/* ── Category — full-width Select ── */}
        <FormField delay={FIELDS.length * 0.05}>
          <div className="sm:col-span-2">
            <Label
              htmlFor="category"
              className="text-xs font-semibold text-slate-600 dark:text-stone-300 mb-1.5 flex items-center gap-1"
            >
              <Layers size={12} className="text-slate-400 dark:text-stone-500" />
              Category
              <span className="text-rose-400 text-[10px]">*</span>
            </Label>
            <Select
              value={formData.category || ""}
              onValueChange={handleSelectChange}
            >
              <SelectTrigger
                id="category"
                onBlur={() => handleBlur("category")}
                className={`h-10 text-sm bg-white dark:bg-stone-900 border-slate-200 dark:border-stone-700 rounded-xl
                  focus:border-orange-400 dark:focus:border-orange-500 focus:ring-2 focus:ring-orange-100 dark:focus:ring-orange-500/20
                  hover:border-slate-300 dark:hover:border-stone-600 transition-all duration-200
                  text-slate-700 dark:text-stone-200 data-[placeholder]:text-slate-400 dark:data-[placeholder]:text-stone-500
                  ${categoryError ? "border-rose-300 dark:border-rose-500/40" : ""}
                `}
              >
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="rounded-xl bg-white dark:bg-stone-900 border-slate-100 dark:border-stone-800 shadow-lg">
                {CATEGORIES.map((cat) => (
                  <SelectItem
                    key={cat}
                    value={cat}
                    className="text-sm rounded-lg cursor-pointer text-slate-700 dark:text-stone-200 focus:bg-orange-50 dark:focus:bg-orange-500/10 focus:text-orange-700 dark:focus:text-orange-400"
                  >
                    <span className="flex items-center gap-2.5">
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${CATEGORY_COLORS[cat] ?? "bg-slate-400"}`}
                      />
                      {cat}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {categoryError && (
              <p className="text-xs text-rose-500 mt-1.5 flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-rose-400 inline-block" />
                {categoryError}
              </p>
            )}
          </div>
        </FormField>
      </div>

      {/* ── Progress hint ── */}
      {(() => {
        const filled = [...FIELDS.map((f) => f.name), "category"]
          .filter((k) => formData[k]?.trim()).length;
        const total = FIELDS.length + 1;
        const pct = Math.round((filled / total) * 100);
        return (
          <div className="px-4 sm:px-6 pb-5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-slate-400 dark:text-stone-500">Section progress</span>
              <span className="text-xs font-semibold text-slate-500 dark:text-stone-400">{filled}/{total} filled</span>
            </div>
            <div className="h-1.5 bg-slate-100 dark:bg-stone-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-orange-400 to-amber-400"
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        );
      })()}

      {/* ── Reset ── */}
      <div className="flex justify-end px-4 sm:px-6 py-4 border-t border-slate-100 dark:border-stone-800 bg-slate-50/60 dark:bg-stone-800/60">
        <Button
          type="button"
          variant="outline"
          onClick={handleReset}
          className="h-9 px-4 text-xs font-semibold border-orange-200 dark:border-orange-500/30 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:border-orange-300 dark:hover:border-orange-500/40 gap-1.5 w-full sm:w-auto"
        >
          <RotateCcw size={13} />
          Reset Section
        </Button>
      </div>
    </motion.div>
  );
};

export default BasicInfoSection;