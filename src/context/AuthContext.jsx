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
  const [passes, setPasses] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const SESSION_KEY = "vms:user";

  useEffect(() => {
    const init = async () => {
      try {
        const data = await authApi.getCurrentUser();

        setCurrentUser(data.user);
      } catch {
        setCurrentUser(null);
      }

      setReady(true);
    };

    init();
  }, []);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(SESSION_KEY);

      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.log(err);
    }

    setReady(true);
  }, []);

  const signin = useCallback(async (email, password, role) => {
    try {
      const data = await authApi.signin(email, password);
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
