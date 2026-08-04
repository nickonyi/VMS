import App from "../App";
import RootLayout from "../screens/RootLayout";
import LoginPage from "../screens/LoginPage";
import ProtectedRoute from "../layout/ProtectedRoute";
import ResidentLayout from "../screens/residents/ResidentLayout";
import ResidentDashboard from "../screens/residents/Page";
import NewPassPage from "../screens/residents/new/NewPassPage";
import HistoryPage from "../screens/residents/history/HistoryPage";

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
              {
                path: "new",
                element: <NewPassPage />,
              },
              {
                path: "history",
                element: <HistoryPage />,
              },
            ],
          },
        ],
      },
    ],
  },
];

export default routes;
