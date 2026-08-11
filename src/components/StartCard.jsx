import { Card, CardContent } from "./ui/Card";

function StatCard({ icon, label, value, color }) {
  return (
    <Card>
      <CardContent className="p-5">
        <div
          className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${color} mb-3`}
        >
          {icon}
        </div>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
        <p className="text-sm text-slate-500 mt-0.5">{label}</p>
      </CardContent>
    </Card>
  );
}

export default StatCard;
