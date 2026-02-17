import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
//import { sileo } from "sileo";
import { useAuth } from "../auth/EstadoSesion";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/dashboard";

function handleSubmit(e) {
  e.preventDefault();

  try {
    login(username.trim(), password);
    navigate(from, { replace: true });
  } catch (err) {
    // Mostramos el error en pantalla (sin librerías)
    setError(err.message);
  }
}


  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white border rounded-2xl p-6 shadow-sm">
        <h2 className="text-2xl font-extrabold">Login</h2>
        <p className="text-sm text-gray-600 mt-1">
          Prueba: <b>admin</b> / <b>1234</b>
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          <div>
            <label className="text-sm font-semibold">Usuario</label>
            <input
              className="mt-1 w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-900"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin o tu nombre"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Contraseña</label>
            <input
              className="mt-1 w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-900"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="1234"
            />
          </div>

          <button className="w-full bg-gray-900 text-white rounded-lg py-2 font-semibold hover:bg-black transition">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}