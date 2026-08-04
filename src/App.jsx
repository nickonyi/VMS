import { useState } from "react";
import { ToastProvider } from "./components/ui/Toast";
import { createBrowserRouter, RouterProvider } from "react-router";
import routes from "./routes/routes";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";

const router = createBrowserRouter(routes);

const App = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ToastProvider>
  );
};

export default App;
