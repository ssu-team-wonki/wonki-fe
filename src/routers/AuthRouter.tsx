import { createContext, useContext, useCallback } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useSessionStorage } from "react-use";

import { User } from "../types/User";

const AuthContext = createContext<{
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
} | null>(null);

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useSessionStorage<User | null>("user", null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = useCallback(
    (data: User) => {
      setUser(data);
      navigate("/");
    },
    [setUser, navigate]
  );

  // call this function to sign out logged in user
  const logout = useCallback(() => {
    setUser(null);
    navigate("/login", { replace: true });
  }, [setUser, navigate]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const ProtectedRoute = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const { user } = useAuth() || {};

  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};
