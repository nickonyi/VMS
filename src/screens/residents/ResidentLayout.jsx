import { Outlet } from "react-router";
import { LayoutDashboard, Plus, History } from "lucide-react";
import { RouteGuard } from "../../components/RouteGuard";
import AppShell from "../../components/AppShell";

const nav = [
  { href: "/resident", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/resident/new", label: "New Pass", icon: Plus },
  { href: "/resident/history", label: "History", icon: History },
];

function ResidentLayout() {
  return (
    <RouteGuard role="resident">
      <AppShell nav={nav} roleLabel="Resident">
        <Outlet />
      </AppShell>
    </RouteGuard>
  );
}

export default ResidentLayout;
