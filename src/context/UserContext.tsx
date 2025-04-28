import { createContext, useState, useEffect, ReactNode, useContext } from "react";
import { jwtDecode } from "jwt-decode";

interface UserType {
  _id: string;
  isBusiness: boolean;
  isAdmin: boolean;
}

interface UserContextType {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const loadUserFromToken = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded = jwtDecode<UserType>(token);
          setUser(decoded);
        } catch (err) {
          console.error("שגיאה בפענוח הטוקן:", err);
          localStorage.removeItem("token");
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    loadUserFromToken();

    // נוסיף מאזין ל־storage כדי לעדכן אם מישהו מתנתק/מתחבר מחלון אחר
    window.addEventListener("storage", loadUserFromToken);
    return () => window.removeEventListener("storage", loadUserFromToken);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};