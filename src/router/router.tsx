import { createBrowserRouter, Navigate } from "react-router-dom";

import { ProtectedRoute } from "./ProtectedRoute.tsx";
import App from "../app/App.tsx";
import { AuthPage } from "@/pages/AuthPage/AuthPage.tsx";
import { ProductsPage } from "@/pages/ProductsPage/ProductsPage.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="products" replace />,
      },
      {
        path: "/auth",
        element: <AuthPage />,
      },
      {
        path: "/products",
        element: (
          <ProtectedRoute>
            <ProductsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/*",
        element: <div style={{ color: "red" }}>Страница не найдена</div>,
      },
    ],
  },
]);
