import { Navigate } from "react-router-dom";
import type { ReactElement } from "react";

type ProtectedRouteProps = {
  children: ReactElement;
};

const isAuthenticated = true; // авторизация

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};
