import App from "../App";
import RootLayout from "../screens/RootLayout";
import LoginPage from "../screens/LoginPage";
import ProtectedRoute from "../layout/ProtectedRoute";
import ResidentLayout from "../screens/residents/ResidentLayout";
import ResidentDashboard from "../screens/residents/ResidentDashBoardPage";
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
import VisitorDetailsScreen from "../screens/residents/pass/VisitorDetailsScreen";
import GuardVerifyScreen from "../screens/guard/verify/GuardVerifyScreen";
import PropertySelectionPage from "../screens/residents/PropertySelectionPage";
import PropertyDetailsPage from "../screens/residents/PropertyDetailsPage";
import AccessPendingPage from "../screens/residents/property/AccessPendingPage";
import AssignedResidentRoute from "../layout/AssignedResidentRoute";

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
          // Resident onboarding
          {
            path: "/resident/properties",
            element: <PropertySelectionPage />,
          },
          {
            path: "/resident/properties/:id",
            element: <PropertyDetailsPage />,
          },
          {
            path: "/resident/access-pending",
            element: <AccessPendingPage />,
          },

          // Resident application
          {
            element: <AssignedResidentRoute />,
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
                    path: "pass/:passId",
                    element: <VisitorDetailsScreen />,
                  },
                  {
                    path: "history",
                    element: <HistoryPage />,
                  },
                ],
              },
            ],
          },

          // Guard
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
                element: <GuardVerifyScreen />,
              },
              {
                path: "history",
                element: <GuardHistoryPage />,
              },
            ],
          },

          // Admin
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
