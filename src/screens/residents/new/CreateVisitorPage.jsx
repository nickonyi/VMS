import { useNavigate } from "react-router";
import { useToast } from "../../../components/ui/Toast";
import { useAuth } from "../../../context/AuthContext";
import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/Card";
import { Input, Textarea } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import { createPass } from "../../../api/passApi";
import { combineDateAndTime } from "../../../lib/utils";

function CreateVisitorPage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const today = new Date().toISOString().split("T")[0];
  const [form, setForm] = useState({
    guest_name: "",
    guest_phone: "",
    number_of_guests: "1",
    unit: currentUser?.unit ?? "",
    visit_date: today,
    arrival_time: "10:00",
    expiry_time: "18:00",
    vehicle_reg: "",
    purpose: "",
  });

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;
    setError(null);
    setSaving(true);
    try {
      console.log(form);

      const payload = {
        guestName: form.guest_name,
        guestPhone: form.guest_phone,
        numberOfGuests: Number(form.number_of_guests),
        vehicleReg: form.vehicle_reg,
        purpose: form.purpose,
        expectedArrivalAt: combineDateAndTime(
          form.visit_date,
          form.arrival_time,
        ),
        expiresAt: combineDateAndTime(form.visit_date, form.expiry_time),
      };

      const pass = await createPass(payload);

      toast("Visitor pass created successfully.", "success");
      navigate(`/resident/pass/${pass.pass.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create pass.");
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <button
          onClick={() => navigate("/resident")}
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-3"
        >
          <ArrowLeft className="h-4 w-4" /> Back to dashboard
        </button>
        <h1 className="text-2xl font-bold text-slate-900">New Visitor Pass</h1>
        <p className="mt-1 text-sm text-slate-500">
          Fill in the guest details below. A QR code will be generated
          automatically.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Guest details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Guest name"
              name="guest_name"
              placeholder="John Smith"
              value={form.guest_name}
              onChange={(e) => update("guest_name", e.target.value)}
              required
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Phone number (optional)"
                name="guest_phone"
                type="tel"
                placeholder="+1 555 000 1234"
                value={form.guest_phone}
                onChange={(e) => update("guest_phone", e.target.value)}
              />
              <Input
                label="Number of guests"
                name="number_of_guests"
                type="number"
                min={1}
                value={form.number_of_guests}
                onChange={(e) => update("number_of_guests", e.target.value)}
                required
              />
            </div>
            <Input
              label="Apartment / Unit"
              name="unit"
              placeholder="e.g. A-204"
              value={form.unit}
              onChange={(e) => update("unit", e.target.value)}
              required
            />
          </CardContent>
        </Card>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Visit schedule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Visit date"
              name="visit_date"
              type="date"
              value={form.visit_date}
              onChange={(e) => update("visit_date", e.target.value)}
              required
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Expected arrival"
                name="arrival_time"
                type="time"
                value={form.arrival_time}
                onChange={(e) => update("arrival_time", e.target.value)}
                required
              />
              <Input
                label="Expiry time"
                name="expiry_time"
                type="time"
                value={form.expiry_time}
                onChange={(e) => update("expiry_time", e.target.value)}
                required
              />
            </div>
            <Input
              label="Vehicle registration (optional)"
              name="vehicle_reg"
              placeholder="ABC-1234"
              value={form.vehicle_reg}
              onChange={(e) => update("vehicle_reg", e.target.value)}
            />
            <Textarea
              label="Visit purpose (optional)"
              name="purpose"
              placeholder="e.g. Family visit, delivery, maintenance"
              value={form.purpose}
              onChange={(e) => update("purpose", e.target.value)}
            />
          </CardContent>
        </Card>

        {error && (
          <div className="mt-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="mt-6 flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/resident")}
          >
            Cancel
          </Button>
          <Button type="submit" loading={saving}>
            <Save className="h-4 w-4" /> Create Pass
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateVisitorPage;
