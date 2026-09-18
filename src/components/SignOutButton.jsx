import { LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

function SignOutButton() {
  const { signout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signout();
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="flex mx-auto mb-4 items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
    >
      <LogOut className="h-6 w-6" />
      Sign out
    </button>
  );
}

export default SignOutButton;
