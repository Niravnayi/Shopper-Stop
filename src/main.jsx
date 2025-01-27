import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import { AuthLayout } from "./layouts/AuthLayout.jsx";
import { Login } from "./pages/Login.jsx";
import { Register } from "./pages/Register.jsx";
import MainLayout from "./layouts/mainLayout.jsx";
import Men from "./pages/Men.jsx";
import Women from "./pages/Women.jsx";
import Kids from "./pages/Kids.jsx";
import Beauty from "./pages/Beauty.jsx";
import Gifts from "./pages/Gifts.jsx";
import Womensjewellery from "./pages/Womensjewellery.jsx";
import Brands from "./pages/Brands.jsx";
import { store } from "./Redux/store";
import { Provider } from "react-redux";
import AdminPanel from "./pages/MenAdminPanel.jsx";
import { ClerkProvider } from "@clerk/clerk-react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Outlet />,

        children: [
          {
            path: "/",
            element: <MainLayout />,
            children: [
              {
                index: true,

                element: <Home />,
              },
              {
                path: "men",
                element: <Men />,
              },
              {
                path: "women",
                element: <Women />,
              },
              {
                path: "women/jewellery",
                element: <Womensjewellery />,
              },
              {
                path: "kids",
                element: <Kids />,
              },
              {
                path: "beauty",
                element: <Beauty />,
              },
              {
                path: "gifts",
                element: <Gifts />,
              },
              {
                path: "brands",
                element: <Brands />,
              },
              {
                path: "AdminPanel",
                element: <AdminPanel />,
              },
            ],
          },
        ],
      },
      {
        path: "auth",
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
        ],
      },
    ],
  },
  {
    path: "forgot-password",
    // element: <ForgotPassword />,
  },
  {
    path: "*",
    element: (
      <div className="text-4xl font-bold text-red-600">Page not found</div>
    ),
  },
]);

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
createRoot(document.getElementById("root")).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </ClerkProvider>
);
