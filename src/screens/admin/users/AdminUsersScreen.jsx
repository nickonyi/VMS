import { useMemo, useState } from "react";
import {
  Search,
  UserPlus,
  ShieldCheck,
  Home,
  User as UserIcon,
  Power,
  Pencil,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/Toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Spinner } from "@/components/ui/Spinner";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatDate } from "@/lib/utils";

const roleConfig = {
  resident: {
    label: "Resident",
    icon: <Home className="h-3.5 w-3.5" />,
    color: "bg-blue-100 text-blue-700",
  },
  guard: {
    label: "Guard",
    icon: <ShieldCheck className="h-3.5 w-3.5" />,
    color: "bg-teal-100 text-teal-700",
  },
  admin: {
    label: "Admin",
    icon: <UserIcon className="h-3.5 w-3.5" />,
    color: "bg-slate-900 text-white",
  },
};

function AdminUsersScreen() {
  const { toast } = useToast();
  //const { profiles, loading, reload } = useProfiles();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [editing, setEditing] = useState(null);
  const [creating, setCreating] = useState(false);
  return <div>AdminUsersScreen</div>;
}

export default AdminUsersScreen;
