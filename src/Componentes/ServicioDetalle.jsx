import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getServicios } from "../Servicios/api";
import LoadingSpinner from "./Loading"; 

function ServicioDetalle() {
  const { id } = useParams();
  const [servicio, setServicio] = useState(null);
  const [cargandoDatos, setCargandoDatos] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setCargandoDatos(true);
    getServicios()
      .then((data) => {
        const encontrado = data.find((x) => String(x.id) === String(id));
        if (!encontrado) {
          setError("Servicio no encontrado.");
        } else {
          setServicio(encontrado);
        }
      })
      .catch(() => setError("Error al conectar con el servidor."))
      .finally(() => setCargandoDatos(false));
  }, [id]);

  if (cargandoDatos) return <LoadingSpinner />;

  if (error) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p style={{ color: "red" }}>{error}</p>
        <Link to="/">⬅ Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Detalle del Servicio</h2>
      <div style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px" }}>
        <p><strong>ID:</strong> {servicio.id}</p>
        <p><strong>Nombre:</strong> {servicio.nombre}</p>
        <p><strong>Descripción:</strong> {servicio.descripcion}</p>
      </div>
      <br />
      <Link to="/" style={{ textDecoration: "none", color: "#007bff" }}>⬅ Volver a la lista</Link>
    </div>
  );
}

export default ServicioDetalle;