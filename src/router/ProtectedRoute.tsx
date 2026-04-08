import { useNavigate } from "react-router-dom";
import type { ReactElement } from "react";
import { useGetCurrentUserQuery } from "../shared/api/authApi.ts";

type ProtectedRouteProps = {
  children: ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoading, error } = useGetCurrentUserQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    navigate("/auth");
  }

  return children;
};
