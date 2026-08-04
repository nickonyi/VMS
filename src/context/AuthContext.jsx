import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { seedUsers, generateSeedPasses } from "../lib/mock-data";

const AuthContext = createContext(null);

const STORAGE_KEY = "vms:data:v1";
const SESSION_KEY = "vms:session:v1";

export function AuthProvider({ children }) {
  const [ready, setReady] = useState(false);
  const [users, setUsers] = useState(seedUsers);
  const [passes, setPasses] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const loadPersist = () => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (error) {}

    return { users: seedUsers, passes: generateSeedPasses() };
  };

  let idSeq = Date.now();

  const uid = (prefix) => {
    idSeq += 1;
    return `${prefix}-${idSeq.toString(36)}`;
  };

  useEffect(() => {
    const data = loadPersist();
    setUsers(data.users);
    setPasses(data.passes);

    try {
      const sessionId = window.localStorage.getItem(SESSION_KEY);

      if (sessionId) {
        const found = data.users.find((u) => u.id === sessionId) ?? null;
        setCurrentUser(found);
      }
    } catch (error) {
      console.log(error);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ users, passes }),
      );
    } catch {}
  }, [users, passes, ready]);

  const login = useCallback(
    (email, password, role) => {
      const user = users.find(
        (u) =>
          u.email.toLowerCase() === email.trim().toLowerCase() &&
          u.password === password &&
          u.role === role,
      );

      if (!user || !user.active) {
        return {
          success: false,
          error: "Invalid email or password.",
        };
      }

      setCurrentUser(user);

      try {
        window.localStorage.setItem(SESSION_KEY, user.id);
      } catch {}

      return {
        success: true,
        user,
      };
    },
    [users],
  );

  const value = useMemo(
    () => ({ ready, currentUser, users, passes, login }),
    [ready, currentUser, users, passes, login],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
};
