import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, role,preferences) => {
    setUser({ email, role,preferences, });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user,role:user?.role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
