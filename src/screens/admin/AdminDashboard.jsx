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

function AdminDashboard() {
  const navigate = useNavigate();
  const { passes, loading } = useVisitorPasses();
  const { currentUser } = useAuth();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => {
      setNow(new Date());
    }, 60000);

    return () => clearInterval(t);
  }, []);

  return <div>AdminDashboard</div>;
}

export default AdminDashboard;
