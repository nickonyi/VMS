import App from "../App";
import RootLayout from "../layout/RootLayout";
import LoginPage from "../screens/LoginPage";
import ProtectedRoute from "../layout/ProtectedRoute";
import ResidentLayout from "../screens/residents/ResidentLayout";

const routes = [
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <LoginPage />,
      },

      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/resident",
            element: <ResidentLayout />,
            children: [
              {
                index: true,
                element: <ResidentDashboard />,
              },
            ],
          },
        ],
      },
    ],
  },
];

export default routes;
