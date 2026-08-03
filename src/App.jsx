import { useState } from "react";
import { ToastProvider } from "./components/ui/Toast";
import { createBrowserRouter, RouterProvider } from "react-router";
import routes from "./routes/routes";
import "./App.css";

const router = createBrowserRouter(routes);

const App = () => {
  return (
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  );
};

export default App;
