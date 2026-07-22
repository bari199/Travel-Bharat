import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "@/services/axios";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUserState] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loading, setLoading] = useState(true);

  const setUser = (newUser) => {
    setUserState(newUser);

    if (newUser) {
      localStorage.setItem(
        "user",
        JSON.stringify(newUser)
      );
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    }
  };

  const fetchProfile = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await api.get("/api/profile");

      if (data.success) {
        setUserState(data.user);

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      }
    } catch (error) {
      console.error(
        "PROFILE FETCH ERROR:",
        error
      );

      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");

      setUserState(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
        refreshUser: fetchProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const getData = () =>
  useContext(UserContext);