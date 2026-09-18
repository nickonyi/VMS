import { LoaderCircle } from "lucide-react";

function CreatingAccount() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Creating your account
        </h1>

        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          Please wait while we set up your account.
        </p>

        <div className="mt-8 flex justify-center">
          <LoaderCircle className="h-8 w-8 animate-spin text-emerald-500" />
        </div>
      </div>
    </div>
  );
}

export default CreatingAccount;
