import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App.tsx";
import { AuthPage } from "../pages/AuthPage.tsx";
import { ProductsPage } from "../pages/ProductsPage.tsx";
import { ProtectedRoute } from "./ProtectedRoute.tsx";

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
