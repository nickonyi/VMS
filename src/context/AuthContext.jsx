import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as authApi from "../api/authApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [ready, setReady] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const SESSION_KEY = "vms:user";

  useEffect(() => {
    const init = async () => {
      try {
        const data = await authApi.getCurrentUser();

        if (data.user.status !== "active") {
          await authApi.signout();
          localStorage.removeItem(SESSION_KEY);
          setCurrentUser(null);
          return;
        }

        setCurrentUser(data.user);
        localStorage.setItem(SESSION_KEY, JSON.stringify(data.user));
      } catch {
        localStorage.removeItem(SESSION_KEY);
        setCurrentUser(null);
      } finally {
        setReady(true);
      }
    };

    init();
  }, []);

  const signin = useCallback(async (email, password) => {
    try {
      const data = await authApi.signin(email, password);

      if (data.user.status !== "active") {
        return {
          success: false,
          error: "Your account is not active.",
          status: data.user.status,
        };
      }

      setCurrentUser(data.user);

      localStorage.setItem(SESSION_KEY, JSON.stringify(data.user));

      return {
        success: true,
        user: data.user,
      };
    } catch (err) {
      return {
        success: false,
        error: err.message,
      };
    }
  }, []);

  const signout = useCallback(async () => {
    await authApi.signout();
    localStorage.removeItem(SESSION_KEY);
    setCurrentUser(null);
  }, []);

  const value = useMemo(
    () => ({ ready, currentUser, signin, signout }),
    [ready, currentUser, signin, signout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
};
