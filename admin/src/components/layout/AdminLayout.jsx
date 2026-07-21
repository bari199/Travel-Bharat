import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-stone-50 dark:bg-stone-950">
      <Sidebar collapsed={collapsed} />

      <motion.div
        initial={false}
        animate={{ marginLeft: collapsed ? 60 : 240 }}
        transition={{ duration: 0.1, ease: [0.1, 0, 0.1, 0] }}
        className="flex flex-col flex-1 min-w-0 h-screen overflow-hidden"
      >
        <Navbar
          collapsed={collapsed}
          onToggle={() => setCollapsed((v) => !v)}
        />

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </motion.div>
    </div>
  );
};

export default AdminLayout;