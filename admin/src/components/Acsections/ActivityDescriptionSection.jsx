import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AlignLeft, FileText } from "lucide-react";
import { motion } from "framer-motion";



function FieldLabel({ icon: Icon, children }) {
  return (
    <Label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
      {Icon && <Icon className="h-3.5 w-3.5 text-orange-400" />}
      {children}
    </Label>
  );
}

const ActivityDescriptionSection = ({ formData, setFormData }) => {
  return (
    <div className="space-y-6 rounded-xl border border-orange-100 bg-white p-4 shadow-sm sm:p-6 dark:border-orange-900/30 dark:bg-background">
      {/* Top accent bar — matches the signature treatment used elsewhere */}
      <div className="-mx-4 -mt-4 h-1 w-[calc(100%+2rem)] rounded-t-xl bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500 sm:-mx-6 sm:-mt-6 sm:w-[calc(100%+3rem)]" />

      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
          <FileText className="h-4.5 w-4.5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold leading-tight text-foreground sm:text-xl">
            Description
          </h2>
          <p className="text-sm text-muted-foreground">
            Write a quick summary, then the full story below.
          </p>
        </div>
      </div>

      {/* Short description */}
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <FieldLabel icon={AlignLeft}>Short Description</FieldLabel>
          <span className="text-xs text-muted-foreground">
            {formData.shortDescription?.length || 0} characters
          </span>
        </div>

        <motion.div whileFocus={{ scale: 1.002 }}>
          <Input
            placeholder="Write a short summary..."
            value={formData.shortDescription}
            onChange={(e) =>
              setFormData({
                ...formData,

                shortDescription: e.target.value,
              })
            }
            className="border-orange-100 focus-visible:border-orange-400 focus-visible:ring-orange-200 dark:border-orange-900/40 dark:bg-transparent"
          />
        </motion.div>
      </div>

      {/* Full description */}
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <FieldLabel icon={FileText}>Full Description</FieldLabel>
          <span className="text-xs text-muted-foreground">
            {formData.description?.length || 0} characters
          </span>
        </div>

        <motion.textarea
          whileFocus={{ scale: 1.002 }}
          rows={10}
          value={formData.description}
          onChange={(e) =>
            setFormData({
              ...formData,

              description: e.target.value,
            })
          }
          className="w-full resize-y rounded-lg border border-orange-100 p-3 text-sm leading-relaxed transition-colors placeholder:text-muted-foreground/70 focus-visible:border-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-200 dark:border-orange-900/40 dark:bg-transparent dark:focus-visible:ring-orange-500/20"
          placeholder="Write the complete activity description — what travelers can expect, what makes it memorable"
        />
      </div>
    </div>
  );
};

export default ActivityDescriptionSection;