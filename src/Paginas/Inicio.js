import React, { useState, useEffect } from "react";
import { getServicios, crearServicio, actualizarServicio } from "../Servicios/api";
import ServiceForm from "../Componentes/ServiceForm";
import Toast from "../Componentes/Toast";
import SearchBox from "../Componentes/SearchBox";
import ServiceCard from "../Componentes/ServiceCard"; 
import Loading from "../Componentes/Loading";
import Modal from "../Componentes/Modal";
import EditServiceForm from "../Componentes/EditServiceForm";
import './Inicio.css';

function Inicio() {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [actualizando, setActualizando] = useState(false);
  const [toast, setToast] = useState({ type: "", text: "" });
  const [editOpen, setEditOpen] = useState(false);
  const [seleccionado, setSeleccionado] = useState(null);

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast({ type: "", text: "" }), 3000);
  };

  const cargar = () => {
    setLoading(true);
    getServicios()
      .then((res) => {
        setServicios(res);
      })
      .catch(() => showToast("error", "Error de conexión con el servidor."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    cargar();
  }, []);

  const guardarServicio = async (payload) => {
    try {
      setGuardando(true);
      await crearServicio(payload);
      showToast("success", "Servicio creado con éxito.");
      cargar(); // Refresca la lista tras crear
      return true;
    } catch (e) {
      showToast("error", "Error al crear servicio.");
      return false;
    } finally {
      setGuardando(false);
    }
  };

  const abrirEdicion = (servicio) => {
    setSeleccionado(servicio);
    setEditOpen(true);
  };

  const guardarCambios = async (payload) => {
    try {
      setActualizando(true);
      await actualizarServicio(seleccionado.id, payload);
      showToast("success", "Servicio actualizado");
      setEditOpen(false);
      cargar(); // Refresca la lista tras editar
      return true;
    } catch (e) {
      showToast("error", "Error al actualizar");
      return false;
    } finally {
      setActualizando(false);
    }
  };

  // Filtrado por Nombre o Descripción
  const filtrados = servicios.filter((s) =>
    (s.nombre || "").toLowerCase().includes(filtro.toLowerCase()) ||
    (s.descripcion || "").toLowerCase().includes(filtro.toLowerCase())
  );

  if (loading) return <Loading />;

  return (
    <div className="home-container"> 
      <h2 className="titulo-principal">Servicios TI</h2>

      <Toast
        type={toast.type}
        text={toast.text}
        onClose={() => setToast({ type: "", text: "" })}
      />

      <div className="controles-superiores">
          <ServiceForm onGuardar={guardarServicio} loading={guardando} />
          <SearchBox value={filtro} onChange={setFiltro} />
      </div>

      {filtrados.length === 0 ? (
        <p className="no-resultados">No se encontraron servicios.</p>
      ) : (
        <div className="grid-servicios">
          {filtrados.map((s) => (
            <ServiceCard 
              key={s.id} 
              servicio={s} // Propiedad 'servicio' (matchea con el Componente)
              onEdit={abrirEdicion} // Función 'onEdit' (matchea con el Componente)
            />
          ))}
        </div>
      )}

      <Modal
        open={editOpen}
        title="Editar Servicio"
        onClose={() => setEditOpen(false)}
      >
        <EditServiceForm
          servicio={seleccionado}
          onGuardar={guardarCambios}
          loading={actualizando}
        />
      </Modal>
    </div>
  );
}

export default Inicio;