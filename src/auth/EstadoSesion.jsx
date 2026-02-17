// Importamos los hooks necesarios desde React
// createContext: crea un contexto global
// useContext: permite consumir el contexto
// useEffect: ejecuta lógica al montar el componente
// useState: maneja estado local
import { createContext, useContext, useEffect, useState } from "react";

// Creamos el contexto de autenticación
// Este contexto compartirá la sesión del usuario en toda la app
const AuthContext = createContext(null);

/**
 * AuthProvider
 * ------------
 * Componente proveedor del contexto de autenticación.
 * Envuelve la aplicación y expone información de sesión:
 * - usuario autenticado
 * - funciones de login y logout
 * - verificación de rol
 */
export function AuthProvider({ children }) {
  // Estado que almacena el usuario autenticado
  // null = no hay sesión iniciada
  const [user, setUser] = useState(null);

  /**
   * useEffect de inicialización
   * ---------------------------
   * Al cargar la aplicación:
   * - Se revisa si existe una sesión guardada en localStorage
   * - Si existe, se restaura automáticamente
   * Esto permite mantener la sesión activa al recargar la página
   */
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  /**
   * login
   * -----
   * Función académica de autenticación.
   * Reglas:
   * - La contraseña válida es "1234"
   * - El usuario "admin" obtiene rol administrador
   * - Cualquier otro usuario obtiene rol normal
   */
  function login(username, password) {
    // Validación simple de contraseña
    if (password !== "1234") {
      throw new Error("Credenciales inválidas");
    }

    // Se construye el objeto usuario
    const newUser = {
      name: username,
      role: username === "admin" ? "admin" : "user",
    };

    // Guardamos el usuario en el estado
    setUser(newUser);

    // Persistimos la sesión en localStorage
    localStorage.setItem("user", JSON.stringify(newUser));

    return newUser;
  }

  /**
   * logout
   * ------
   * Finaliza la sesión del usuario:
   * - Limpia el estado
   * - Elimina la información almacenada
   */
  function logout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  /**
   * isAdmin
   * -------
   * Variable derivada que indica si el usuario actual
   * tiene rol administrador
   */
  const isAdmin = user?.role === "admin";

  /**
   * El Provider expone al resto de la app:
   * - user: información del usuario autenticado
   * - login: función para iniciar sesión
   * - logout: función para cerrar sesión
   * - isAdmin: validación de rol
   */
  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * useAuth
 * -------
 * Hook personalizado para consumir el contexto de autenticación
 * desde cualquier componente de la aplicación.
 *
 * Ejemplo:
 * const { user, login, logout, isAdmin } = useAuth();
 */
export function useAuth() {
  return useContext(AuthContext);
}