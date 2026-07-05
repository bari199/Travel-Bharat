import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Plus,
  Trash2,
  Backpack,
  ShieldCheck,
  Tent,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

/* ============================================================
   Business logic below (addItem, removeItem, updateItem) is
   unchanged from the original — only markup, structure, and
   styling are new.
============================================================ */

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

/* ── One reusable animated list block, reused for all four lists ── */
function ListBlock({ icon: Icon, title, description, field, items, addItem, removeItem, updateItem }) {
  return (
    <div className="overflow-hidden rounded-xl border border-orange-100 bg-orange-50/30 dark:border-orange-900/30 dark:bg-orange-500/[0.03]">
      <div className="space-y-4 p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
              <Icon className="h-4 w-4" />
            </span>
            <div>
              <Label className="text-sm font-semibold text-foreground">
                {title}
              </Label>
              {description && (
                <p className="text-xs text-muted-foreground">{description}</p>
              )}
            </div>
          </div>

          <Button
            type="button"
            size="sm"
            onClick={() => addItem(field)}
            className="w-full bg-orange-600 text-white shadow-sm transition-colors hover:bg-orange-700 active:bg-orange-800 sm:w-auto"
          >
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Add
          </Button>
        </div>

        <motion.div layout className="space-y-2">
          <AnimatePresence initial={false}>
            {items.map((item, index) => (
              <motion.div
                key={index}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="flex items-center gap-2 overflow-hidden"
              >
                <span className="flex h-9 w-7 flex-none items-center justify-center text-xs font-medium text-orange-400">
                  {index + 1}
                </span>

                <Input
                  placeholder={`Enter ${title.toLowerCase().replace(/s$/, "")}`}
                  value={item}
                  onChange={(e) => updateItem(field, index, e.target.value)}
                  className="border-orange-100 bg-white text-sm focus-visible:border-orange-400 focus-visible:ring-orange-200 dark:border-orange-900/40 dark:bg-transparent"
                />

                <Button
                  type="button"
                  size="icon"
                  variant="destructive"
                  onClick={() => removeItem(field, index)}
                  className="flex-none bg-orange-600/90 hover:bg-orange-700"
                  aria-label={`Remove ${title.toLowerCase()} ${index + 1}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>

          {items.length === 0 && (
            <p className="rounded-md border border-dashed border-orange-200/80 bg-white/40 px-3 py-2.5 text-center text-xs text-muted-foreground dark:border-orange-900/30 dark:bg-transparent">
              No items yet
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}

const ActivityListsSection = ({ formData, setFormData }) => {
  /* ============================================
      Add Item
  ============================================ */

  const addItem = (field) => {
    setFormData({
      ...formData,

      [field]: [...formData[field], ""],
    });
  };

  /* ============================================
      Remove Item
  ============================================ */

  const removeItem = (field, index) => {
    setFormData({
      ...formData,

      [field]: formData[field].filter((_, i) => i !== index),
    });
  };

  /* ============================================
      Update Item
  ============================================ */

  const updateItem = (field, index, value) => {
    const updatedItems = [...formData[field]];

    updatedItems[index] = value;

    setFormData({
      ...formData,

      [field]: updatedItems,
    });
  };

  return (
    <div className="space-y-6 rounded-xl border border-orange-100 bg-white p-4 shadow-sm sm:p-6 dark:border-orange-900/30 dark:bg-background">
      {/* Top accent bar — matches the signature treatment used elsewhere */}
      <div className="-mx-4 -mt-4 h-1 w-[calc(100%+2rem)] rounded-t-xl bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500 sm:-mx-6 sm:-mt-6 sm:w-[calc(100%+3rem)]" />

      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
          <Sparkles className="h-4.5 w-4.5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold leading-tight text-foreground sm:text-xl">
            Activity Lists
          </h2>
          <p className="text-sm text-muted-foreground">
            Things to carry, equipment, safety tips, and highlights.
          </p>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <ListBlock
          icon={Backpack}
          title="Things To Carry"
          field="thingsToCarry"
          items={formData.thingsToCarry}
          addItem={addItem}
          removeItem={removeItem}
          updateItem={updateItem}
        />

        <ListBlock
          icon={Tent}
          title="Equipment Provided"
          field="equipmentProvided"
          items={formData.equipmentProvided}
          addItem={addItem}
          removeItem={removeItem}
          updateItem={updateItem}
        />

        <ListBlock
          icon={ShieldCheck}
          title="Safety Tips"
          field="safetyTips"
          items={formData.safetyTips}
          addItem={addItem}
          removeItem={removeItem}
          updateItem={updateItem}
        />

        <ListBlock
          icon={Sparkles}
          title="Highlights"
          field="highlights"
          items={formData.highlights}
          addItem={addItem}
          removeItem={removeItem}
          updateItem={updateItem}
        />
      </div>
    </div>
  );
};

export default ActivityListsSection;