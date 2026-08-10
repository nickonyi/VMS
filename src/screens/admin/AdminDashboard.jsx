import { useEffect, useMemo, useState } from "react";
import {
  Users,
  QrCode,
  CheckCircle2,
  Clock,
  LogIn,
  LogOut,
  TrendingUp,
} from "lucide-react";
import { effectiveStatus } from "../../lib/effectiveStatus";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { Spinner } from "../../components/ui/Spinner";
import { formatDate, formatTime, formatDateTime } from "../../lib/utils";
import { useNavigate } from "react-router";
import { useVisitorPasses } from "../../hooks/admin/useVisitorsPasses";
import { useAuth } from "../../context/AuthContext";
import { useDashboardStats } from "../../hooks/admin/useDashboardStats";

function AdminDashboard() {
  const navigate = useNavigate();
  const { stats, loading } = useDashboardStats();
  const { passes } = useVisitorPasses();
  const { currentUser } = useAuth();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => {
      setNow(new Date());
    }, 60000);

    return () => clearInterval(t);
  }, []);

  const recent = useMemo(
    () => passes.slice(0, 6).map((p) => ({ ...p, eff: effectiveStatus(p) })),
    [passes],
  );

  console.log(stats);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          Overview of visitor activity and community users.
        </p>
      </div>
    </div>
  );
}

export default AdminDashboard;
