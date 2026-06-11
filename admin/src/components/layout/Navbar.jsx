import { Bell } from "lucide-react";

const Navbar = () => {
  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6">
      <h2 className="font-semibold text-lg">
        Admin Dashboard
      </h2>

      <div className="flex items-center gap-4">
        <Bell size={20} />

        <div className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center">
          A
        </div>
      </div>
    </header>
  );
};

export default Navbar;