import { useNavigate } from "react-router";
import { useAuth } from "../../../context/AuthContext";
import { History, Search } from "lucide-react";
import { Input } from "../../../components/ui/Input";
import { useResidentPasses } from "../../../hooks/useVisitorPasses";
import { useMemo, useState } from "react";
import { effectiveStatus } from "../../../lib/effectiveStatus";
import { Spinner } from "../../../components/ui/Spinner";
import { formatDate, formatTime, formatDateTime } from "../../../lib/utils";
import { StatusBadge } from "../../../components/ui/StatusBadge";
import { EmptyState } from "../../../components/ui/EmptyState";
import { filters } from "../../../lib/utils";
import { Card, CardContent } from "../../../components/ui/Card";

function HistoryPage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { passes, loading } = useResidentPasses();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(() => {
    return passes
      .map((p) => ({ ...p, eff: effectiveStatus(p) }))
      .filter((p) => filter === "all" || p.eff === filter)
      .filter(
        (p) =>
          !search ||
          p.guest_name.toLowerCase().includes(search.toLocaleLowerCase()) ||
          p.unit_number
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase()),
      );
  }, [passes, filter, search]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Visitor History</h1>
        <p className="mt-1 text-sm text-slate-500">
          All your visitor passes, past and present.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by guest name or unit..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-thin pb-1">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`shrink-0 cursor-pointer rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                filter === f.value
                  ? "bg-slate-900 text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <Card>
        <CardContent className="p-0 cursor-pointer">
          {loading ? (
            <div className="flex justify-center py-12">
              <Spinner className="h-8 w-8" />
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={<History className="h-6 w-6" />}
              title="No visitor passes found"
              description={
                search || filter !== "all"
                  ? "Try adjusting your search or filters."
                  : "Create your first visitor pass to get started."
              }
            />
          ) : (
            <ul className="divide-y divide-slate-100 cursor-pointer">
              {filtered.map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => navigate(`/resident/pass/${p.id}`)}
                    className="w-full flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors text-left"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 truncate">
                        {p.guest_name}
                      </p>
                      <p className="text-sm text-slate-500 truncate">
                        {formatDate(p.visit_date)} ·{" "}
                        {formatTime(p.arrival_time)} · Unit {p.unit_number}
                      </p>
                    </div>
                    <StatusBadge status={p.eff} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default HistoryPage;
