// Importamos componentes de React Router
// Navigate: permite redirigir programáticamente
// useLocation: obtiene información de la ruta actual
import { Navigate, useLocation } from "react-router-dom";

// Hook personalizado para acceder a la sesión del usuario
import { useAuth } from "./EstadoSesion";

/**
 * ProtegerRuta
 * ------------
 * Componente envoltorio (wrapper) para rutas privadas.
 * Su función es:
 * - Verificar si existe un usuario autenticado
 * - Si no existe, redirigir al login
 * - Si existe, permitir el acceso al componente protegido
 */
export default function ProtegerRuta({ children }) {
  // Obtenemos el usuario desde el contexto de autenticación
  const { user } = useAuth();

  // Obtenemos la ruta actual
  // Se usa para recordar a qué página intentaba acceder el usuario
  const location = useLocation();

  /**
   * Si NO hay usuario autenticado:
   * - Se bloquea el acceso
   * - Se redirige a /login
   * - Se guarda la ruta original en el state
   *   para volver automáticamente después del login
   */
  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  /**
   * Si HAY usuario autenticado:
   * - Se renderiza el componente hijo (children)
   * - Es decir, la página protegida
   */
  return children;
}