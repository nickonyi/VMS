import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";
import { FullPageSpinner } from "../components/ui/Spinner";

function ProtectedRoute() {
  const { currentUser, ready } = useAuth();

  if (!ready) {
    return <FullPageSpinner label="Loading..." />;
  }

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

export default ProtectedRoute;
