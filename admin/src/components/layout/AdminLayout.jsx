import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { motion, AnimatePresence } from "framer-motion";

/* ============================================================
   Business logic below — the collapsed state and onToggle
   wiring — is unchanged from the original. Only the page
   background token has been swapped from a cool slate to a
   warm stone tone to match the orange/amber brand used
   throughout the rest of the app.
============================================================ */

const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-stone-50">
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} />

      {/* Main area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar
          collapsed={collapsed}
          onToggle={() => setCollapsed((v) => !v)}
        />

        <AnimatePresence mode="wait">
          <motion.main
            key="main-content"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex-1 overflow-y-auto p-6"
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminLayout;