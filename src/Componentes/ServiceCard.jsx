import React from "react";
import { Link } from "react-router-dom";
import "../Paginas/Inicio.css"; 

function ServiceCard({ servicio, onEdit }) {
  if (!servicio) return null;

  return (
    <div className="card-inventario">
      {/* Esquina superior: Nombre y Lápiz de edición */}
      <div className="card-header-inv">
        <h3>{servicio.nombre}</h3>
        <button 
          className="btn-edit-inv" 
          onClick={() => onEdit && onEdit(servicio)}
          title="Editar servicio"
        >
          ✎
        </button>
      </div>

      {/* Cuerpo: Solo la descripción con buen espacio */}
      <div className="card-body-inv">
        <p className="card-text-desc">
          {servicio.descripcion}
        </p>
      </div>

      {/* Botón de acción inferior */}
      <div className="card-footer-inv">
        <Link to={`/servicios/${servicio.id}`} className="btn-detalle-inv">
          Ver detalle
        </Link>
      </div>
    </div>
  );
}

export default ServiceCard;