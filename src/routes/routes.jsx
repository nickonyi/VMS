import App from "../App";
import RootLayout from "../screens/RootLayout";
import LoginPage from "../screens/LoginPage";
import ProtectedRoute from "../layout/ProtectedRoute";
import ResidentLayout from "../screens/residents/ResidentLayout";
import ResidentDashboard from "../screens/residents/Page";
import HistoryPage from "../screens/residents/history/HistoryPage";
import CreateVisitorPage from "../screens/residents/new/CreateVisitorPage";
import GuardLayout from "../screens/guard/GuardLayout";
import GuardHistoryPage from "../screens/guard/history/GuardHistoryPage";
import GuardScanScreen from "../screens/guard/scan/GuardScanScreen";
import AdminLayout from "../screens/admin/AdminLayout";
import AdminDashboard from "../screens/admin/AdminDashboard";
import AdminVisitorsScreen from "../screens/admin/visitors/AdminVisitorsScreen";
import AdminUsersScreen from "../screens/admin/users/AdminUsersScreen";
import AdminAnalyticsScreen from "../screens/admin/analytics/AdminAnalyticsScreen";

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
                element: <CreateVisitorPage />,
              },
              {
                path: "history",
                element: <HistoryPage />,
              },
            ],
          },
          {
            path: "/guard",
            element: <GuardLayout />,
            children: [
              {
                index: true,
                element: <GuardScanScreen />,
              },
              {
                path: "verify",
                element: <CreateVisitorPage />,
              },
              {
                path: "history",
                element: <GuardHistoryPage />,
              },
            ],
          },
          {
            path: "/admin",
            element: <AdminLayout />,
            children: [
              {
                index: true,
                element: <AdminDashboard />,
              },
              {
                path: "visitors",
                element: <AdminVisitorsScreen />,
              },
              {
                path: "users",
                element: <AdminUsersScreen />,
              },
              {
                path: "analytics",
                element: <AdminAnalyticsScreen />,
              },
            ],
          },
        ],
      },
    ],
  },
];

export default routes;
