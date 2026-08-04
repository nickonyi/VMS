import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Loader2 } from "lucide-react";

const HOME = {
  resident: "/resident",
  guard: "/guard",
  admin: "/admin",
};

export function RouteGuard({ role, children }) {
  const navigate = useNavigate();
  const { ready, currentUser } = useAuth();

  useEffect(() => {
    if (!ready) return;
    if (!currentUser) {
      navigate("/", { replace: true });
    } else if (currentUser.role !== role) {
      navigate(HOME[currentUser.role], { replace: true });
    }
  }, [ready, currentUser, role, navigate]);

  if (!ready || !currentUser || currentUser.role !== role) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return <>{children}</>;
}
