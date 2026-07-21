import axios from "axios";

const api = axios.create({
  baseURL: import.meta.VITE_BACKEND_URL,
});


export default api;