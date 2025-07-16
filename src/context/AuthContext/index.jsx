import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userData")) || null
  );

  const login = async (credentials) => {
    try {
      // Hardcoded valid credentials
      const validEmail = "user@gmail.com";
      const validPassword = "User@2025";

      if (
        credentials.email === validEmail &&
        credentials.password === validPassword
      ) {
        const authData = {
          id: 1,
          name: "Demo User",
          email: credentials.email,
          token: "fake-jwt-token",
        };
        localStorage.setItem("userData", JSON.stringify(authData));
        setUser(authData);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      // Clear user data
      localStorage.removeItem("userData");
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const fetUsers = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const users = await response.json();
      const listData = users?.map((item) => {
        return {
          id: item?.id,
          name: item?.name,
          email: item?.email,
          phone: item?.phone,
        };
      });
      localStorage.setItem("users", JSON.stringify(listData))
      return listData;
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, fetUsers }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
