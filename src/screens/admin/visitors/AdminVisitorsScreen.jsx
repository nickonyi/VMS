import { useState } from "react";
import { Search, QrCode, Ban } from "lucide-react";

import {
  useVisitorPasses,
  adminUpdatePass,
} from "@/hooks/admin/useVisitorsPasses";

import { useToast } from "@/components/ui/Toast";
import { Card, CardContent } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { EmptyState } from "@/components/ui/EmptyState";
import { Spinner } from "@/components/ui/Spinner";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

import { formatDate, formatTime, formatDateTime } from "@/lib/utils";

const filters = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "checked_in", label: "Checked In" },
  { value: "checked_out", label: "Checked Out" },
  { value: "expired", label: "Expired" },
  { value: "cancelled", label: "Cancelled" },
];

function AdminVisitorsScreen() {
  const { toast } = useToast();

  const {
    passes,
    pagination,
    status,
    search,
    loading,
    error,
    setStatus,
    setSearch,
    goToPage,
    reload,
  } = useVisitorPasses();

  const [revokeTarget, setRevokeTarget] = useState(null);
  const [revoking, setRevoking] = useState(false);

  const handleRevoke = async () => {
    if (!revokeTarget) return;

    setRevoking(true);

    try {
      await adminUpdatePass(revokeTarget.id, {
        status: "cancelled",
      });

      toast("Visitor pass revoked.", "success");

      setRevokeTarget(null);

      await reload();
    } catch (err) {
      toast(
        err instanceof Error ? err.message : "Failed to revoke pass.",
        "error",
      );
    } finally {
      setRevoking(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          All Visitor Records
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Search, filter, and manage every visitor pass in the system.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <Input
            placeholder="Search by guest name or unit..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setStatus(f.value)}
              className={`shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                status === f.value
                  ? "bg-slate-900 text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center py-12">
              <Spinner className="h-8 w-8" />
            </div>
          ) : passes.length === 0 ? (
            <EmptyState
              icon={<QrCode className="h-6 w-6" />}
              title="No visitor records found"
              description="Try adjusting your search or filters."
            />
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden overflow-x-auto lg:block">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-100 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                      <th className="px-5 py-3">Guest</th>
                      <th className="px-5 py-3">Unit</th>
                      <th className="px-5 py-3">Resident</th>
                      <th className="px-5 py-3">Visit Date</th>
                      <th className="px-5 py-3">Check-in</th>
                      <th className="px-5 py-3">Status</th>
                      <th className="px-5 py-3 text-right">Action</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {passes.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50">
                        <td className="px-5 py-4">
                          <p className="font-medium text-slate-900">
                            {p.guest_name}
                          </p>

                          <p className="text-xs text-slate-500">
                            {p.num_of_guests}{" "}
                            {p.num_of_guests === 1 ? "guest" : "guests"}
                          </p>
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {p.unit_number}
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {p.resident_name || "—"}
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {formatDate(p.visit_date)}
                          <br />
                          <span className="text-xs text-slate-400">
                            {formatTime(p.arrival_time)}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {p.checked_in_at
                            ? formatDateTime(p.checked_in_at)
                            : "—"}
                        </td>

                        <td className="px-5 py-4">
                          <StatusBadge status={p.effective_status} />
                        </td>

                        <td className="px-5 py-4 text-right">
                          {(p.effective_status === "pending" ||
                            p.effective_status === "checked_in") && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setRevokeTarget(p)}
                            >
                              <Ban className="h-4 w-4 text-red-500" />
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <ul className="divide-y divide-slate-100 lg:hidden">
                {passes.map((p) => (
                  <li key={p.id} className="px-5 py-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-medium text-slate-900">
                          {p.guest_name}
                        </p>

                        <p className="text-sm text-slate-500">
                          Unit {p.unit_number} · {p.resident_name || "—"}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-400">
                          {formatDate(p.visit_date)} ·{" "}
                          {formatTime(p.arrival_time)}
                        </p>
                      </div>

                      <StatusBadge status={p.effective_status} />
                    </div>

                    {(p.effective_status === "pending" ||
                      p.effective_status === "checked_in") && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-3 w-full"
                        onClick={() => setRevokeTarget(p)}
                      >
                        <Ban className="h-4 w-4 text-red-500" />
                        Revoke Pass
                      </Button>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}
        </CardContent>

        {pagination.totalPages > 0 && (
          <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              Page {pagination.page} of {pagination.totalPages}
              {" · "}
              {pagination.total} records
            </p>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.page <= 1 || loading}
                onClick={() => goToPage(pagination.page - 1)}
              >
                Previous
              </Button>

              <div className="flex gap-1 overflow-x-auto">
                {Array.from(
                  { length: pagination.totalPages },
                  (_, i) => i + 1,
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    disabled={loading}
                    className={`h-8 min-w-8 rounded-md px-2 text-sm ${
                      pagination.page === page
                        ? "bg-slate-900 text-white"
                        : "border border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                disabled={pagination.page >= pagination.totalPages || loading}
                onClick={() => goToPage(pagination.page + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </Card>

      <Modal
        open={!!revokeTarget}
        onClose={() => setRevokeTarget(null)}
        title="Revoke this visitor pass?"
        description={`${revokeTarget?.guest_name}'s pass for Unit ${revokeTarget?.unit_number} will be cancelled immediately and cannot be used at the gate.`}
      >
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setRevokeTarget(null)}>
            Dismiss
          </Button>

          <Button variant="danger" loading={revoking} onClick={handleRevoke}>
            <Ban className="h-4 w-4" />
            Revoke Pass
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default AdminVisitorsScreen;
