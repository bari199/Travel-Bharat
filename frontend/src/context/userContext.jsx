// import { createContext, useContext, useEffect, useState } from "react";
// import api from "@/lib/api";

// export const UserContext = createContext(null);

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchProfile = async () => {
//     try {
//       const token = localStorage.getItem("accessToken");

//       if (!token) {
//         setLoading(false);
//         return;
//       }

//       const res = await api.get("/user/profile");

//       setUser(res.data.user);
//     } catch (error) {
//       console.log(error);

//       localStorage.removeItem("accessToken");
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   return (
//     <UserContext.Provider
//       value={{
//         user,
//         setUser,
//         loading,
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const getData = () => useContext(UserContext);


import {
  createContext,
  useContext,
  useState,
} from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUserState] = useState(() => {
    const savedUser =
      localStorage.getItem("user");

    return savedUser
      ? JSON.parse(savedUser)
      : null;
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

export const getData = () =>
  useContext(UserContext);