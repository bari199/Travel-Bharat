import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { FileText, AlignLeft } from "lucide-react";

/* ============================================================
   Animation
============================================================ */

const containerVariants = {
  hidden: {
    opacity: 0,
    y: 12,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

/* ============================================================
   Component
============================================================ */

const ExperienceDescriptionSection = ({
  formData,
  handleChange,
  errors = {},
}) => {
  const textareaRef = useRef(null);

  /* ============================================================
   Auto Height
============================================================ */

  useEffect(() => {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = "auto";

    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, [formData.description]);

  const characterCount = formData.description?.length || 0;

  const minimumCharacters = 120;

  const progress = Math.min((characterCount / minimumCharacters) * 100, 100);

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show">
      <Card
        className="shadow-sm
border
border-blue-100
overflow-hidden
"
      >
        <div
          className="
h-1
bg-gradient-to-r
from-sky-500
to-indigo-500
"
        />

        <CardContent
          className="
space-y-6
p-6
"
        >
          <div
            className="
flex
items-center
gap-3
"
          >
            <div
              className="
w-10
h-10
rounded-xl
bg-sky-100
flex
items-center
justify-center
"
            >
              <FileText
                className="
w-5
h-5
text-sky-600
"
              />
            </div>

            <div>
              <h2
                className="
text-lg
font-semibold
"
              >
                Experience Description
              </h2>

              <p
                className="
text-sm
text-slate-500
"
              >
                Write a detailed description of this experience.
              </p>
            </div>
          </div>

          <div className="space-y-3" />

          <Label htmlFor="description" className="font-medium">
            Description
            <span
              className="
text-red-500
ml-1
"
            >
              *
            </span>
          </Label>

          <Textarea
            id="description"
            name="description"
            ref={textareaRef}
            value={formData.description}
            onChange={handleChange}
            placeholder="
Describe the complete travel experience, activities, timings, tips, what visitors can expect, and why this experience is special.
"
            rows={8}
            className={`
min-h-[220px]
resize-none
rounded-xl
leading-7

${errors.description ? "border-red-400 focus-visible:ring-red-300" : ""}

`}
          />

          {errors.description && (
            <p
              className="
text-sm
text-red-500
"
            >
              {errors.description}
            </p>
          )}

          {/* ============================================================
            Character Counter
        ============================================================ */}

          <div className="space-y-2">
            <div
              className="
              flex
              items-center
              justify-between
              text-sm
            "
            >
              <span className="text-slate-500">Description Progress</span>

              <span
                className={`
                font-medium

                ${
                  characterCount >= minimumCharacters
                    ? "text-green-600"
                    : "text-orange-500"
                }
              `}
              >
                {characterCount} / {minimumCharacters}
              </span>
            </div>

            <div
              className="
              h-2
              rounded-full
              bg-slate-100
              overflow-hidden
            "
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${progress}%`,
                }}
                transition={{
                  duration: 0.35,
                }}
                className={`
                h-full
                rounded-full

                ${
                  characterCount >= minimumCharacters
                    ? "bg-green-500"
                    : "bg-sky-500"
                }
              `}
              />
            </div>
          </div>

          {/* ============================================================
            Writing Tips
        ============================================================ */}

          <div
            className="
            rounded-xl
            border
            border-sky-100
            bg-sky-50
            p-5
          "
          >
            <div className="flex gap-3">
              <AlignLeft
                className="
                w-5
                h-5
                text-sky-600
                mt-0.5
              "
              />

              <div>
                <h4
                  className="
                  text-sm
                  font-semibold
                  text-slate-700
                "
                >
                  Writing Tips
                </h4>

                <ul
                  className="
                  mt-3
                  space-y-2
                  text-sm
                  text-slate-600
                  list-disc
                  ml-5
                "
                >
                  <li>Explain what visitors will experience.</li>

                  <li>Mention timings and duration.</li>

                  <li>Include travel tips if required.</li>

                  <li>Mention the best season or weather.</li>

                  <li>Describe why this experience is unique.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* ============================================================
            Footer
        ============================================================ */}

          <div
            className="
            border-t
            pt-4
            flex
            justify-between
            items-center
          "
          >
            <span
              className="
              text-sm
              text-slate-500
            "
            >
              Recommended length
            </span>

            <span
              className={`
              text-sm
              font-semibold

              ${
                characterCount >= minimumCharacters
                  ? "text-green-600"
                  : "text-orange-500"
              }
            `}
            >
              {characterCount >= minimumCharacters
                ? "Ready ✓"
                : `${minimumCharacters - characterCount} characters remaining`}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExperienceDescriptionSection;
