import { LoaderCircle, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAccessStatus } from "../../../hooks/useAccessStatus";

function AccessPendingPage() {
  const [message, setMessage] = useState(null);
  const { checkAccess, checking, error } = useAccessStatus();
  const navigate = useNavigate();

  const handleCheckAccess = async () => {
    const result = await checkAccess();

    if (!result.success) {
      setMessage(result.error);
      return;
    }

    if (result.hasAccess) {
      navigate("/resident", { replace: true });
      return;
    }

    setMessage("Not confirmed yet, check back soon.");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Access pending
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-500">
          Your request has been sent to the property. You’ll get access once
          your tenancy has been confirmed.
        </p>
        <button
          type="button"
          onClick={handleCheckAccess}
          disabled={checking}
          className="mt-8 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {" "}
          {checking ? (
            <>
              {" "}
              <LoaderCircle className="h-4 w-4 animate-spin" /> Checking...{" "}
            </>
          ) : (
            "Check for access"
          )}{" "}
        </button>{" "}
        {message && <p className="mt-4 text-sm text-slate-400"> {message} </p>}
        <button
          type="button"
          onClick={() => navigate("/resident/properties")}
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Request a different property
        </button>
      </div>
    </div>
  );
}

export default AccessPendingPage;
