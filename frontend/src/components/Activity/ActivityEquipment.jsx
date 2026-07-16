import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, PackageCheck } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const ActivityEquipment = ({ activity }) => {
  const equipment = activity?.equipmentProvided || [];

  if (!equipment.length) return null;

  return (
    <section>
      <h2 className="text-xl sm:text-2xl font-bold mb-6">Equipment Provided</h2>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
        {equipment.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.2, delay: index * 0.03 }}
          >
            <Card className="border-gray-200 hover:border-orange-300 transition-colors">
              <CardContent className="p-5">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                  <PackageCheck className="text-orange-500" />
                </div>

                <h3 className="font-semibold">{item}</h3>

                <div className="flex items-center gap-2 mt-3 text-sm text-green-600">
                  <ShieldCheck size={16} />
                  Included
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ActivityEquipment;