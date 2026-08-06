import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../components/ui/Toast";
import { useState } from "react";

function VisitorDetailsScreen() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [pass, setPass] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  return <div>VisitorDetailsScreen</div>;
}

export default VisitorDetailsScreen;
