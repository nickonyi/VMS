import { useNavigate } from "react-router";
import { useToast } from "../../../components/ui/Toast";
import { useAuth } from "../../../context/AuthContext";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

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

  const handleSubmit = async (e) => {};
  return <div>NewPassPage</div>;
}

export default CreateVisitorPage;
