import { useMemo, useState } from "react";
import { ArrowLeft, Search, MapPin, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import { useProperties } from "../../hooks/useProperties";
import SignOutButton from "../../components/SignOutButton";

const DEMO_PROPERTIES = [
  {
    id: 1,
    name: "Greenview Apartments",
    location: "Nairobi",
    country: "Kenya",
  },
  {
    id: 2,
    name: "Riverside Residences",
    location: "Westlands, Nairobi",
    country: "Kenya",
  },
  {
    id: 3,
    name: "Parklands Heights",
    location: "Parklands, Nairobi",
    country: "Kenya",
  },
  {
    id: 4,
    name: "Garden City Residences",
    location: "Thika Road, Nairobi",
    country: "Kenya",
  },
];

function PropertySelectionPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const { properties, loading, error } = useProperties();

  console.log(properties);

  const filteredProperties = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return properties;
    }

    return properties.filter(
      (property) =>
        property.name.toLowerCase().includes(value) ||
        property.location?.toLowerCase().includes(value),
    );
  }, [search, properties]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900" />

          <p className="mt-4 text-sm text-slate-500">Loading properties...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="text-center">
          <h2 className="font-semibold text-slate-900">
            Unable to load properties
          </h2>

          <p className="mt-2 text-sm text-slate-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center">
      <div className="mx-auto w-full max-w-2xl px-5 py-6 sm:px-8">
        {/* Header */}
        <header className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <div>
            <p className="text-sm font-medium text-emerald-600">GateKeep</p>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Choose your property
            </h1>
          </div>
        </header>

        {/* Intro */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Where do you live?
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            Search for your residential property and request access.
          </p>
        </div>

        {/* Search */}
        <div className="relative mt-6 flex h-12 w-full  items-center flex-start rounded-xl border border-slate-200 bg-white">
          <div className="flex items-center gap-3">
            <Search className="h-7 w-7 pl-2 text-slate-400" />

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search properties..."
              className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Properties */}
        <div className="mt-6 space-y-3">
          {filteredProperties.map((property) => (
            <button
              key={property.id}
              type="button"
              onClick={() => navigate(`/resident/properties/${property.id}`)}
              className="group flex w-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-slate-300 hover:shadow-sm"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white">
                <MapPin className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="truncate font-semibold text-slate-900">
                  {property.name}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {property.location}, {property.country}
                </p>
              </div>

              <ChevronRight className="h-5 w-5 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-slate-600" />
            </button>
          ))}

          {filteredProperties.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center">
              <p className="font-medium text-slate-900">No properties found</p>

              <p className="mt-1 text-sm text-slate-500">
                Try searching with a different name or location.
              </p>
            </div>
          )}
        </div>
      </div>

      <SignOutButton />
    </div>
  );
}

export default PropertySelectionPage;
