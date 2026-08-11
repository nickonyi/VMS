import { useMemo, useState } from "react";
import { Search, QrCode, Ban } from "lucide-react";
import { useVisitorPasses } from "@/hooks/admin/useVisitorsPasses";
import { adminUpdatePass } from "@/hooks/admin/useVisitorsPasses";
import { effectiveStatus } from "@/lib/effectiveStatus";
import { useToast } from "@/components/ui/Toast";
import { Card, CardContent } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { EmptyState } from "@/components/ui/EmptyState";
import { Spinner } from "@/components/ui/Spinner";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

const filters = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "checked_in", label: "Checked In" },
  { value: "checked_out", label: "Checked Out" },
  { value: "expired", label: "Expired" },
  { value: "cancelled", label: "Cancelled" },
];

function AdminVisitorsScreen() {
  return <div>AdminVisitorsScreen</div>;
}

export default AdminVisitorsScreen;
