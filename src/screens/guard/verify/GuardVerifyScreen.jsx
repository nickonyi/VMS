import {
  ArrowLeft,
  CheckCircle2,
  LogIn,
  LogOut,
  AlertTriangle,
  XCircle,
  Clock,
  User,
  Home,
  Calendar,
  Users,
  Car,
  Phone,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../components/ui/Toast";
import { effectiveStatus } from "../../../lib/effectiveStatus";
import { Button } from "../../../components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/Card";
import { StatusBadge } from "../../../components/ui/StatusBadge";
import { formatDate, formatTime, formatDateTime } from "../../../lib/utils";
import { Spinner } from "../../../components/ui/Spinner";
import DetailRow from "../../../components/ui/DetailRow";
import { checkInPass, checkOutPass } from "../../../api/guardApi";
import { usePassByManualCode } from "../../../hooks/guard/useGuardVisits";
import { useNavigate, useSearchParams } from "react-router";
import { useState } from "react";

function GuardVerifyScreen() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("t");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { pass, loading, error, reload } = usePassByManualCode(code);
  const [processing, setProcessing] = useState(false);
  const [justCheckedIn, setJustCheckedIn] = useState(false);

  const handleCheckIn = async () => {
    if (!pass) return;

    setProcessing(true);

    try {
      const res = await checkInPass(pass.id);
      setJustCheckedIn(true);

      toast(`${pass.guest_name} checked in successfully.`, "success");

      await reload();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Check-in failed.", "error");
    } finally {
      setProcessing(false);
    }
  };
  const handleCheckOut = async () => {
    if (!pass) return;

    setProcessing(true);

    try {
      await checkOutPass(pass.id);

      toast(`${pass.guest_name} checked out successfully.`, "success");

      await reload();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Check-out failed.", "error");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-xl mx-auto flex flex-col items-center justify-center py-20 gap-3">
        <Spinner className="h-8 w-8" />
        <p className="text-sm text-slate-500">Verifying visitor pass...</p>
      </div>
    );
  }

  if (error || !pass) {
    return (
      <div className="max-w-xl mx-auto">
        <ResultBanner
          type="error"
          title="Invalid QR Code"
          message="This QR code is not recognized as a valid visitor pass. Please ask the visitor to obtain a new pass from their host."
          onBack={() => navigate("/guard")}
        />
      </div>
    );
  }

  const status = effectiveStatus(pass);

  const residentName = pass.resident_name
    ? pass.resident_name
    : "Unknown resident";

  let banner = {};
  let action = null;

  if (status === "pending") {
    banner = {
      type: "success",
      title: "Pass Valid",
      message: "This visitor pass is valid and ready for check-in.",
    };
    action = (
      <Button
        size="lg"
        variant="success"
        className="w-full"
        loading={processing}
        onClick={handleCheckIn}
      >
        <LogIn className="h-5 w-5" /> Check In Visitor
      </Button>
    );
  } else if (status === "checked_in") {
    const date = pass.checked_in_at ?? pass.created_at;

    if (justCheckedIn) {
      banner = {
        type: "success",
        title: "Check-In Successful",
        message: `${pass.guest_name} was successfully checked in at ${formatDateTime(date)}.`,
      };
    } else {
      banner = {
        type: "warning",
        title: "Already Checked In",
        message: `This visitor was checked in at ${formatDateTime(date)}.`,
      };
    }

    action = (
      <Button
        size="lg"
        className="w-full"
        loading={processing}
        onClick={handleCheckOut}
      >
        <LogOut className="h-5 w-5" /> Check Out Visitor
      </Button>
    );
  } else if (status === "checked_out") {
    banner = {
      type: "error",
      title: "Visit Completed",
      message:
        "This visitor has already been checked out. No further action is needed.",
    };
  } else if (status === "expired") {
    banner = {
      type: "error",
      title: "Pass Expired",
      message: "This visitor pass has expired and can no longer be used.",
    };
  } else if (status === "cancelled") {
    banner = {
      type: "error",
      title: "Pass Cancelled",
      message:
        "The resident has cancelled this visitor pass. Entry is not permitted.",
    };
  }

  return (
    <div className="max-w-xl mx-auto space-y-5">
      <button
        onClick={() => navigate("/guard")}
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700"
      >
        <ArrowLeft className="h-4 w-4" /> Back to scanner
      </button>

      {banner && (
        <ResultBanner
          type={banner.type}
          title={banner.title}
          message={banner.message}
        />
      )}

      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Visitor Details</CardTitle>
          <StatusBadge status={status} />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
            <div className="h-14 w-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-lg font-semibold">
              {pass.guest_name
                .split(" ")
                .map((p) => p[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-900">
                {pass.guest_name}
              </p>
              <p className="text-sm text-slate-500">
                {pass.number_of_guests}{" "}
                {pass.number_of_guests === 1 ? "guest" : "guests"}
              </p>
            </div>
          </div>

          <DetailRow
            icon={<Home className="h-4 w-4" />}
            label="Apartment"
            value={`Unit ${pass.unit_number}`}
          />
          <DetailRow
            icon={<User className="h-4 w-4" />}
            label="Resident"
            value={residentName}
          />
          <DetailRow
            icon={<Calendar className="h-4 w-4" />}
            label="Visit date"
            value={formatDate(pass.visit_date)}
          />
          <DetailRow
            icon={<Clock className="h-4 w-4" />}
            label="Arrival time"
            value={formatTime(pass.arrival_time)}
          />
          <DetailRow
            icon={<Clock className="h-4 w-4" />}
            label="Expiry time"
            value={formatTime(pass.expiry_time)}
          />
          {pass.guest_phone && (
            <DetailRow
              icon={<Phone className="h-4 w-4" />}
              label="Phone"
              value={pass.guest_phone}
            />
          )}
          {pass.vehicle_reg && (
            <DetailRow
              icon={<Car className="h-4 w-4" />}
              label="Vehicle"
              value={pass.vehicle_reg}
            />
          )}
          {pass.purpose && (
            <DetailRow
              icon={<FileText className="h-4 w-4" />}
              label="Purpose"
              value={pass.purpose}
            />
          )}

          {pass.checked_in_at && (
            <div className="pt-3 mt-1 border-t border-slate-100 space-y-2">
              <DetailRow
                icon={<CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                label="Checked in"
                value={formatDateTime(pass.checked_in_at)}
              />
              {pass.checked_out_at && (
                <DetailRow
                  icon={<LogOut className="h-4 w-4 text-slate-500" />}
                  label="Checked out"
                  value={formatDateTime(pass.checked_out_at)}
                />
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {action && <div className="pt-1">{action}</div>}

      <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2">
        <ShieldCheck className="h-3.5 w-3.5" /> Verified by GateKeep
      </div>
    </div>
  );
}

function ResultBanner({ type, title, message, onBack }) {
  const config = {
    success: {
      bg: "bg-emerald-50 border-emerald-200",
      icon: <CheckCircle2 className="h-6 w-6 text-emerald-600" />,
      text: "text-emerald-900",
    },
    warning: {
      bg: "bg-amber-50 border-amber-200",
      icon: <AlertTriangle className="h-6 w-6 text-amber-600" />,
      text: "text-amber-900",
    },
    error: {
      bg: "bg-red-50 border-red-200",
      icon: <XCircle className="h-6 w-6 text-red-600" />,
      text: "text-red-900",
    },
  }[type];

  return (
    <div className={`rounded-2xl border p-5 ${config.bg}`}>
      <div className="flex items-start gap-3">
        <div className="shrink-0">{config.icon}</div>
        <div className="flex-1">
          <h3 className={`font-semibold ${config.text}`}>{title}</h3>
          <p className="mt-1 text-sm text-slate-700">{message}</p>
          {onBack && (
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={onBack}
            >
              <ArrowLeft className="h-4 w-4" /> Back to scanner
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default GuardVerifyScreen;
