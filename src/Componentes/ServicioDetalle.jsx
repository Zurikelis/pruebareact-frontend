import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getServicios } from "../Servicios/api";
import Loading from "../Componentes/Loading";

function ServicioDetalle() {
  const { id } = useParams();
  const [servicio, setServicio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    setServicio(null);

    getServicios()
      .then((data) => {
        if (!Array.isArray(data)) throw new Error("Respuesta inesperada de la API");
        const encontrado = data.find((x) => String(x.id) === String(id));
        if (!encontrado) {
          setError("Servicio no encontrado.");
        } else {
          setServicio(encontrado);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Error cargando el servicio.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loading />;

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <Link to="/">⬅ Volver</Link>
      </div>
    );
  }

  // Protección extra por si servicio es null
  if (!servicio) {
    return (
      <div>
        <p>Servicio no disponible.</p>
        <Link to="/">⬅ Volver</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Detalle del Servicio</h2>

      <p><strong>ID:</strong> {servicio.id}</p>
      <p><strong>Nombre:</strong> {servicio.nombre}</p>
      <p><strong>Descripción:</strong> {servicio.descripcion}</p>

      <Link to="/">⬅ Volver</Link>
    </div>
  );
}

export default ServicioDetalle;