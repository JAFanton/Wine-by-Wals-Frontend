import axios from "axios";


const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5005";


const api = axios.create({
baseURL,
headers: {
"Content-Type": "application/json",
},
});

// Attach token if present in localStorage
api.interceptors.request.use((config) => {
const token = localStorage.getItem("authToken");
if (token) config.headers.Authorization = `Bearer ${token}`;
return config;
});


export default api;