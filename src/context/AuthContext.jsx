import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";


const AuthContext = createContext();


export function AuthProvider({ children }) {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true); // verifies token on app load


useEffect(() => {
const token = localStorage.getItem("authToken");
if (token) {
// verify token and fetch user payload
api
.get("/auth/verify")
.then((res) => setUser(res.data))
.catch(() => {
localStorage.removeItem("authToken");
setUser(null);
})
.finally(() => setLoading(false));
} else {
setLoading(false);
}
}, []);


const signup = (email, password, name) => {
// signup endpoint returns created user (no token) so we call login afterwards to get token
return api
.post("/auth/signup", { email, password, name })
.then(() => login(email, password));
};


const login = (email, password) => {
return api
.post("/auth/login", { email, password })
.then((res) => {
const { authToken } = res.data;
localStorage.setItem("authToken", authToken);
// fetch payload
return api.get("/auth/verify").then((verifyRes) => {
setUser(verifyRes.data);
return verifyRes.data;
});
});
};


const logout = () => {
localStorage.removeItem("authToken");
setUser(null);
};


return (
<AuthContext.Provider value={{ user, loading, signup, login, logout }}>
{children}
</AuthContext.Provider>
);
}


export function useAuth() {
return useContext(AuthContext);
}