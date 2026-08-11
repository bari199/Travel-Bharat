// // import axios from "axios";

// // const api = axios.create({
// //   baseURL: "http://localhost:8000/api",
// // });

// // api.interceptors.request.use(
// //   (config) => {
// //     const token =
// //       localStorage.getItem("token");

// //     if (token) {
// //       config.headers.Authorization =
// //         `Bearer ${token}`;
// //     }

// //     return config;
// //   }
// // );

// // export default api;





// import axios from "axios";

// const api = axios.create({
//   baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
//   withCredentials: true,
// });

// api.interceptors.request.use((config) => {
//   const token =
//     localStorage.getItem("accessToken");

//   if (token) {
//     config.headers.Authorization =
//       `Bearer ${token}`;
//   }

//   return config;
// });

// export default api;



// import axios from "axios";

// const api = axios.create({
//   baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
//   withCredentials: true,
// });

// // Attach access token
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("accessToken");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// // Handle expired / invalid access token
// api.interceptors.response.use(
//   (response) => response,

//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("user");

//       // Send user to home/login
//       window.location.href = "/";
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;







import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
  withCredentials: true,
});

// Attach access token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Handle authentication errors
api.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      console.warn("Unauthorized request");

      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");

      // Notify React authentication context
      window.dispatchEvent(new Event("auth:logout"));
    }

    return Promise.reject(error);
  }
);

export default api;