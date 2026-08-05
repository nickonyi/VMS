import { RouteGuard } from "../../components/RouteGuard";
import { Outlet } from "react-router";
import AppShell from "../../components/AppShell";

function AdminLayout() {
  return (
    <RouteGuard role="admin">
      <AppShell>
        <Outlet />
      </AppShell>
    </RouteGuard>
  );
}

export default AdminLayout;
