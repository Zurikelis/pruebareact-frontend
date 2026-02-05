import React from "react";
import { Link } from "react-router-dom";

function ServiceCard(props) {
  // Desestructuramos con valor por defecto
  const { datos = {}, alEditar } = props;

  // Si no hay datos aún, mostramos marcador o null (evita crash)
  if (!datos || Object.keys(datos).length === 0) {
    return (
      <div className="tarjeta-mobiliario tarjeta-cargando">
        <p>Cargando servicio…</p>
      </div>
    );
  }

  const estadoClase = (datos.estado || "").toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="tarjeta-mobiliario">
      <div className="tarjeta-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link to={`/servicios/${datos.id}`} className="link-detalle">
          <h3 className="tarjeta-titulo">{datos.codigo} 🔍</h3>
        </Link>

        <button
          className="btn-editar-icono"
          onClick={() => alEditar && alEditar(datos)}
          title="Editar registro"
        >
          ✏️
        </button>
      </div>

      <div className="tarjeta-contenido">
        <p><strong>Tipo:</strong> {datos.tipo}</p>
        <p><strong>Descripción:</strong> {datos.descripcion}</p>
        <p><strong>Ubicación:</strong> {datos.ubicacion}</p>
        <p><strong>Estado:</strong>
          <span className={`estado-${estadoClase}`}>
            {datos.estado}
          </span>
        </p>
      </div>

      <div style={{ marginTop: "10px", textAlign: "right" }}>
        <Link to={`/servicios/${datos.id}`} className="btn-ver-detalle">
          Ver detalle →
        </Link>
      </div>
    </div>
  );
}

export default ServiceCard;