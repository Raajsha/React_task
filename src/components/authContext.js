import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getStoredTokens = () => {
    const access = localStorage.getItem('accessToken');
    const refresh = localStorage.getItem('refreshToken');
    return { access, refresh };
  };

  const [tokens, setTokens] = useState(getStoredTokens());

  const login = async (username, password) => {
    try {
      const response = await axios.post('https://auth-backend-138t.onrender.com/api/v1/users/login', { "username": username, "password" : password });
      const { access, refresh } = response.data.tokens;

      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);

      setTokens({ access, refresh });
      await fetchUser(access);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const fetchUser = async (accessToken) => {
    try {
      const response = await axios.get("https://auth-backend-138t.onrender.com/api/v1/users/refresh-token", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Fetching user failed", error);
    }
  };

  const logout = () => {
    setUser(null);
    setTokens(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  useEffect(() => {
    if (tokens.access) fetchUser(tokens.access);
  }, [tokens]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;