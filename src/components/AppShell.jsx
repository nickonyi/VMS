import {
  LayoutDashboard,
  QrCode,
  History,
  ScanLine,
  Users,
  BarChart3,
  ShieldCheck,
  LogOut,
  Menu,
  X,
  PlusCircle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { cn } from "../lib/utils";
import { Avatar } from "./ui/Avatar";

const navByRole = {
  resident: [
    {
      label: "Dashboard",
      path: "/resident",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      label: "New Pass",
      path: "/resident/new",
      icon: <PlusCircle className="h-5 w-5" />,
    },
    {
      label: "History",
      path: "/resident/history",
      icon: <History className="h-5 w-5" />,
    },
  ],
  guard: [
    { label: "Scan", path: "/guard", icon: <ScanLine className="h-5 w-5" /> },
    {
      label: "History",
      path: "/guard/history",
      icon: <History className="h-5 w-5" />,
    },
  ],
  admin: [
    {
      label: "Dashboard",
      path: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      label: "Visitors",
      path: "/admin/visitors",
      icon: <QrCode className="h-5 w-5" />,
    },
    {
      label: "Analytics",
      path: "/admin/analytics",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      label: "Users",
      path: "/admin/users",
      icon: <Users className="h-5 w-5" />,
    },
  ],
};

const roleLabels = {
  resident: "Resident",
  guard: "Security Guard",
  admin: "Administrator",
};

function AppShell({ children }) {
  const { currentUser, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  if (!currentUser) return null;

  console.log(currentUser);

  const items = navByRole[currentUser.role] ?? [];

  const handleNav = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const sidebar = (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-slate-200">
        <div className="h-9 w-9 rounded-xl bg-slate-900 flex items-center justify-center">
          <ShieldCheck className="h-5 w-5 text-emerald-400" />
        </div>
        <span className="text-lg font-semibold tracking-tight text-slate-900">
          GateKeep
        </span>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-thin">
        {items.map((item) => {
          const active =
            pathname === item.path ||
            (item.path !== `/${currentUser.role}` &&
              pathname.startsWith(item.path));

          return (
            <button
              key={item.path}
              onClick={() => handleNav(item.path)}
              className={cn(
                "w-full flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
              )}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-slate-200">
        <div className="flex items-center gap-3 px-2 py-2">
          <Avatar name={currentUser.name} size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 truncate">
              {currentUser.name}
            </p>
            <p className="text-xs text-slate-500 truncate">
              {roleLabels[currentUser.role]}
              {currentUser.unit ? ` · ${currentUser.unit}` : ""}
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          className="mt-2 w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 border-r border-slate-200 bg-white">
        {sidebar}
      </aside>

      {/* Main content */}
      <main className="lg:pl-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          {children}
        </div>
      </main>
    </div>
  );
}

export default AppShell;
