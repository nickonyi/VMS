import { useMemo } from "react";
import { effectiveStatus } from "../../../lib/effectiveStatus";
import { BarChart3, TrendingUp, Clock, Users } from "lucide-react";
import { useVisitorPasses } from "../../../hooks/admin/useVisitorsPasses";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../components/ui/Card";
import { Spinner } from "../../../components/ui/Spinner";
import { formatTime } from "../../../lib/utils";

function AdminAnalyticsScreen() {
  const { visits, loading } = useVisitorPasses();

  const data = useMemo(() => {
    const withStatus = visits.map((v) => ({ ...v, eff: effectiveStatus(v) }));
    const today = new Date().toISOString().split("T")[0];

    const statusBreakdown = {
      pending: 0,
      checked_in: 0,
      checked_out: 0,
      expired: 0,
      cancelled: 0,
    };
    withStatus.forEach((p) => {
      statusBreakdown[p.eff]++;
    });

    return { statusBreakdown };
  }, []);

  console.log(data);

  return <div>AdminAnalyticsScreen</div>;
}

export default AdminAnalyticsScreen;
