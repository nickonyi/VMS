import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

function ResidentDashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  return <div>ResidentDashboard</div>;
}

export default ResidentDashboard;
