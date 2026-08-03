import React from "react";
import { ShieldCheck } from "lucide-react";

function AuthScreen() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50">
      <div className="relative lg:w-1/2 bg-slate-900 text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(99,102,241,0.4) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(16,185,129,0.3) 0%, transparent 50%)",
          }}
        />
        <div className="relative">
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center ring-1 ring-white/20">
              <ShieldCheck className="h-6 w-6 text-emerald-400" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              GateKeep
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthScreen;
