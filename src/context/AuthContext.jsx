// AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Solo intenta acceder a localStorage en el cliente
    if (typeof window !== 'undefined') {
      try {
        const userData = localStorage.getItem('usuario');
        if (userData) {
          setUsuario(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Error accediendo a localStorage:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const login = (userData) => {
    setUsuario(userData);
    if (typeof window !== 'undefined') {
      localStorage.setItem('usuario', JSON.stringify(userData));
    }
  };

  const logout = () => {
    setUsuario(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('usuario');
    }
  };

  const value = {
    usuario,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}