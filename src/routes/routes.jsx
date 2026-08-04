import App from "../App";
import RootLayout from "../screens/RootLayout";
import LoginPage from "../screens/LoginPage";
import ProtectedRoute from "../layout/ProtectedRoute";
import ResidentLayout from "../screens/residents/ResidentLayout";
import ResidentDashboard from "../screens/residents/Page";

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
