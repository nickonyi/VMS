import { Outlet } from "react-router";
import { RouteGuard } from "../../components/RouteGuard";
import AppShell from "../../components/AppShell";

function GuardLayout() {
  return (
    <RouteGuard role="guard">
      <AppShell>
        <Outlet />
      </AppShell>
    </RouteGuard>
  );
}

export default GuardLayout;
