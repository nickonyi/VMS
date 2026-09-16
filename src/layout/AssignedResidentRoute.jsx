import { Navigate, Outlet, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { useAccessStatus } from "../hooks/useAccessStatus";
import { useAuth } from "../context/AuthContext";

function AssignedResidentRoute() {
  const { ready, currentUser } = useAuth();
  const { checkAccess } = useAccessStatus();
  const location = useLocation();

  const [checkingAccess, setCheckingAccess] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    if (!ready || !currentUser) {
      return;
    }

    const check = async () => {
      setCheckingAccess(true);

      const result = await checkAccess();

      if (result.success) {
        setHasAccess(result.hasAccess);
      }

      setCheckingAccess(false);
    };

    check();
  }, [ready, currentUser, checkAccess]);

  if (!ready || checkingAccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-sm text-slate-500">Checking access...</p>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  if (!hasAccess) {
    return (
      <Navigate to="/resident/properties" replace state={{ from: location }} />
    );
  }

  return <Outlet />;
}

export default AssignedResidentRoute;
