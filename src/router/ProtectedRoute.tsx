import { Navigate } from "react-router-dom";
import type { ReactElement } from "react";

type ProtectedRouteProps = {
  children: ReactElement;
};

export const isAuthenticated = false; // авторизация

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};
