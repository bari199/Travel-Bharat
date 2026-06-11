import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-6 bg-muted/30 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;