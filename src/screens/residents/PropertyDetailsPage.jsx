import { ArrowLeft, MapPin, ShieldCheck, LoaderCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { useProperties } from "../../hooks/useProperties";
import { usePropertyAccess } from "../../hooks/usePropertyAccess";

function PropertyDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { properties, loading: propertiesLoading } = useProperties();

  const {
    requestAccess,
    loading: requestingAccess,
    error,
  } = usePropertyAccess();

  const property = properties.find((property) => String(property.id) === id);

  const handleRequestAccess = async () => {
    const result = await requestAccess(id);

    if (!result.success) {
      return;
    }

    navigate("/resident/access-pending", {
      replace: true,
    });
  };

  if (propertiesLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <p className="text-sm text-slate-500">Loading property...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-xl font-bold text-slate-900">
            Property not found
          </h1>

          <button
            type="button"
            onClick={() => navigate("/resident/properties")}
            className="mt-4 font-medium text-emerald-600 hover:underline"
          >
            Back to properties
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col px-5 py-6 sm:px-8">
        <header className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/resident/properties")}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100"
            aria-label="Back to properties"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <h1 className="text-lg font-semibold text-slate-900">Property</h1>
        </header>

        <main className="flex flex-1 flex-col justify-center py-10">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-white">
            <MapPin className="h-7 w-7" />
          </div>

          <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">
            {property.name}
          </h2>

          <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
            <MapPin className="h-4 w-4" />

            {[property.location, property.country].filter(Boolean).join(", ")}
          </p>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />

              <div>
                <h3 className="font-semibold text-slate-900">Request access</h3>

                <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                  Request access to this property. You'll receive access once
                  your tenancy has been confirmed.
                </p>
              </div>
            </div>
          </div>

          {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
        </main>

        <div className="space-y-3 pb-4">
          <button
            type="button"
            onClick={handleRequestAccess}
            disabled={requestingAccess}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {requestingAccess ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Requesting access...
              </>
            ) : (
              "Request access"
            )}
          </button>

          <button
            type="button"
            onClick={() => navigate("/resident/properties")}
            disabled={requestingAccess}
            className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Choose another property
          </button>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetailsPage;
