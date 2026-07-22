import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/axios";

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check Existing Login
  const checkAdminAuth = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        setAdmin(null);
        setLoading(false);
        return;
      }

      const response = await api.get("/admin/profile");

      if (response.data.success) {
        setAdmin(response.data.admin);
      } else {
        logout();
      }
    } catch (error) {
      console.log("Admin Auth Check Failed:", error.message);

      localStorage.removeItem("adminToken");

      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAdminAuth();
  }, []);

  // Login
  const loginAdmin = async (email, password) => {
    const response = await api.post("/admin/auth/login", {
      email,
      password,
    });

    if (response.data.success) {
      localStorage.setItem("adminToken", response.data.token);

      setAdmin(response.data.admin);

      return {
        success: true,
        message: response.data.message,
      };
    }

    return {
      success: false,
      message: response.data.message,
    };
  };

  // Logout

  const logout = async () => {
    try {
      await api.post("/admin/logout");
    } catch (error) {
      console.log(error);
    } finally {
      localStorage.removeItem("adminToken");
      setAdmin(null);
      navigate("/admin/login", {
        replace: true,
      });
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        loading,
        loginAdmin,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  return useContext(AdminAuthContext);
};
