// import { getData } from '../context/userContext'
// import axios from 'axios'
// import React, { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'

// const AuthSuccess = () => {
//     const { setUser } = getData()
//     const navigate = useNavigate()
//     useEffect(() => {

//         const handleAuth = async () => {
//             const params = new URLSearchParams(window.location.search)
//             console.log(params);
//             const accessToken = params.get("token")
//             console.log("Token", accessToken);

//             if (accessToken) {
//                 localStorage.setItem("accessToken", accessToken)
//                 try {
//                     const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/me`, {
//                         headers: {
//                             Authorization: `Bearer ${accessToken}`
//                         }
//                     })
//                     if (res.data.success) {
//                         setUser(res.data.user)  //save user in context api store
//                         navigate("/")
//                     }
//                 } catch (error) {
//                     console.error("Error fetching user:", error)
//                 }
//             }
//         }
//         handleAuth()
//     }, [navigate])
//     return (
//         <h2>
//             Logging in...
//         </h2>
//     )
// }

// // export default AuthSuccess
// import { getData } from "../context/userContext";
// import axios from "axios";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const AuthSuccess = () => {
//   const { setUser } = getData();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleAuth = async () => {
//       try {
//         const params = new URLSearchParams(
//           window.location.search
//         );

//         const accessToken = params.get("accessToken");
//         const refreshToken = params.get("refreshToken");

//         console.log("Google Access Token:", accessToken);

//         if (!accessToken) {
//           console.error("Google access token missing");

//           navigate("/login?error=google_failed");
//           return;
//         }

//         // Save tokens
//         localStorage.setItem(
//           "accessToken",
//           accessToken
//         );

//         if (refreshToken) {
//           localStorage.setItem(
//             "refreshToken",
//             refreshToken
//           );
//         }

//         // Get authenticated user
//         const res = await axios.get(
//           `${import.meta.env.VITE_BACKEND_URL}/api/auth/me`,
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//             },
//           }
//         );

//         if (res.data.success) {
//           setUser(res.data.user);

//           // Remove token from URL
//           window.history.replaceState(
//             {},
//             document.title,
//             "/auth-success"
//           );

//           navigate("/");
//         } else {
//           throw new Error("Authentication failed");
//         }
//       } catch (error) {
//         console.error(
//           "Google authentication error:",
//           error
//         );

//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");

//         navigate("/login?error=google_failed");
//       }
//     };

//     handleAuth();
//   }, [navigate, setUser]);

//   return <h2>Logging in...</h2>;
// };

// export default AuthSuccess;



import { getData } from "../context/userContext";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthSuccess = () => {
  const { setUser } = getData();
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const params = new URLSearchParams(
          window.location.search
        );

        const accessToken = params.get("accessToken");
        const refreshToken = params.get("refreshToken");

        console.log("Google Access Token:", accessToken);

        if (!accessToken) {
          console.error("Google access token missing");

          navigate("/login?error=google_failed");
          return;
        }

        localStorage.setItem(
          "accessToken",
          accessToken
        );

        if (refreshToken) {
          localStorage.setItem(
            "refreshToken",
            refreshToken
          );
        }

        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (res.data.success) {
          setUser(res.data.user);

          window.history.replaceState(
            {},
            document.title,
            "/auth-success"
          );

          navigate("/");
        }
      } catch (error) {
        console.error(
          "Google authentication error:",
          error
        );

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        navigate("/login?error=google_failed");
      }
    };

    handleAuth();
  }, [navigate, setUser]);

  return <h2>Logging in...</h2>;
};

export default AuthSuccess;