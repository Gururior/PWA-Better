import { createContext, useContext, useEffect, useReducer } from "react";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import app from "../../../../../components/config/firebase";

interface ContextDefinition {
  loading: boolean;
  user: any;
  message: string;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const SessionContext = createContext({} as ContextDefinition);

interface SessionState {
  loading: boolean;
  user: any;
  message: string;
}

type SessionActionType =
  | { type: "Set loading"; payload: boolean }
  | { type: "Set user"; payload: any }
  | { type: "Set message"; payload: string };

// Verificar si estamos en el entorno del navegador antes de acceder a localStorage
const getInitialUser = () => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  return null;
};

const initialState: SessionState = {
  loading: false,
  user: getInitialUser(), // Cargar usuario de localStorage si está disponible
  message: "",
};

function sessionReducer(state: SessionState, action: SessionActionType) {
  switch (action.type) {
    case "Set loading":
      return { ...state, loading: action.payload };
    case "Set user":
      if (action.payload && typeof window !== 'undefined') {
        localStorage.setItem("user", JSON.stringify(action.payload)); // Guardar en localStorage
      } else if (typeof window !== 'undefined') {
        localStorage.removeItem("user"); // Eliminar de localStorage si no hay usuario
      }
      return { ...state, user: action.payload, loading: false };
    case "Set message":
      return { ...state, message: action.payload };
    default:
      return state;
  }
}

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(sessionReducer, initialState);
  const auth = getAuth(app);

  const login = (email: string, password: string) => {
    if (!navigator.onLine) {
      dispatch({ type: "Set message", payload: "No hay conexión a Internet. No se puede autenticar." });
      return;
    }

    dispatch({ type: "Set loading", payload: true });

    signInWithEmailAndPassword(auth, email.toLowerCase(), password)
      .then((userCredential) => {
        dispatch({ type: "Set user", payload: userCredential.user });
        dispatch({ type: "Set message", payload: "Usuario autenticado." });
      })
      .catch((error) => {
        dispatch({ type: "Set loading", payload: false });
        dispatch({ type: "Set message", payload: "Error de autenticación: " + error.message });
      });
  };

  const logout = () => {
    if (!navigator.onLine) {
      dispatch({ type: "Set message", payload: "No hay conexión a Internet. No se puede cerrar la sesión." });
      return;
    }

    signOut(auth)
      .then(() => {
        dispatch({ type: "Set user", payload: null });
        dispatch({ type: "Set message", payload: "Sesión cerrada exitosamente." });
      })
      .catch((error) => {
        dispatch({ type: "Set message", payload: "Error al cerrar sesión: " + error.message });
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: "Set user", payload: user });
      } else {
        const localUser = getInitialUser(); // Obtener usuario almacenado
        if (localUser) {
          dispatch({ type: "Set user", payload: localUser });
        } else {
          dispatch({ type: "Set user", payload: null });
        }
      }
    });

    return unsubscribe;
  }, [auth]);

  return (
    <SessionContext.Provider value={{ ...state, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};

function useSessionState() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSessionState() debe ser usado dentro de un SessionProvider");
  }
  return context;
}

export { SessionProvider, useSessionState };


