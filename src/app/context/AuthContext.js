"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token    = localStorage.getItem("access");
    const username = localStorage.getItem("username");
    const email    = localStorage.getItem("email");
    if (token) setUser({ token, username, email });
    setLoading(false);
  }, []);

  const login = (data) => {
    localStorage.setItem("access",   data.access);
    localStorage.setItem("refresh",  data.refresh);
    localStorage.setItem("username", data.user.username);
    localStorage.setItem("email",    data.user.email);
    setUser({ token: data.access, username: data.user.username, email: data.user.email });
    router.push("/dashboard");
  };

  const logout = () => {
    ["access", "refresh", "username", "email"].forEach((k) => localStorage.removeItem(k));
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
