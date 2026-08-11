import { formatTime } from "../lib/utils";

function PeakHours({ passes, now }) {
  const today = now.toISOString().split("T")[0];
  const hourCounts = new Array(24).fill(0);
  passes.forEach((v) => {
    if (v.visit_date === today && v.checked_in_at) {
      const h = new Date(v.checked_in_at).getHours();
      hourCounts[h]++;
    }
  });
  const max = Math.max(...hourCounts, 1);
  const peakHour = hourCounts.indexOf(max);

  if (max === 0) {
    return (
      <p className="text-sm text-slate-500 py-8 text-center">
        No check-ins recorded today yet.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-600">
        Peak visiting hour:{" "}
        <span className="font-semibold text-slate-900">
          {formatTime(String(peakHour).padStart(2, "0"))}
        </span>
      </p>
      <div className="flex items-end gap-1 h-32">
        {hourCounts.map((c, i) => (
          <div
            key={i}
            className="flex-1 flex flex-col items-center justify-end gap-1"
          >
            <div
              className="w-full rounded-t bg-slate-900 transition-all"
              style={{
                height: `${(c / max) * 100}%`,
                minHeight: c > 0 ? "4px" : "0",
              }}
              title={`${formatTime(`2000-01-01T${String(i).padStart(2, "0")}:00`)}: ${c}`}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between text-[10px] text-slate-400">
        <span>12 AM</span>
        <span>6 AM</span>
        <span>12 PM</span>
        <span>6 PM</span>
        <span>11 PM</span>
      </div>
    </div>
  );
}

export default PeakHours;
