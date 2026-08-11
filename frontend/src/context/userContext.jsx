import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUserState] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");

      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Failed to restore user:", error);
      localStorage.removeItem("user");
      return null;
    }
  });

  const setUser = (newUser) => {
    setUserState(newUser);

    if (newUser) {
      localStorage.setItem(
        "user",
        JSON.stringify(newUser)
      );
    } else {
      localStorage.removeItem("user");
    }
  };

  // Handle logout/authentication invalidation
  useEffect(() => {
    const handleAuthLogout = () => {
      setUserState(null);
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    };

    window.addEventListener(
      "auth:logout",
      handleAuthLogout
    );

    return () => {
      window.removeEventListener(
        "auth:logout",
        handleAuthLogout
      );
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const getData = () => useContext(UserContext);