import { useEffect, useState } from "react";
import { getServicios, crearServicio, actualizarServicio } from "../Servicios/api";
import ServiceForm from "../Componentes/ServiceForm";
import Toast from "../Componentes/Toast";
import SearchBox from "../Componentes/SearchBox";
import ServiceCard from "../Componentes/ServiceCard"; 
import Loading from "../Componentes/Loading";
import './Inicio.css';
import Modal from "../Componentes/Modal";
import EditServiceForm from "../Componentes/EditServiceForm";

function Inicio() {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filtro, setFiltro] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [toast, setToast] = useState({ type: "", text: "" });
  const [editOpen, setEditOpen] = useState(false);
  const [seleccionado, setSeleccionado] = useState(null);
  const [actualizando, setActualizando] = useState(false);

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast({ type: "", text: "" }), 3000);
  };

  const cargar = () => {
    setLoading(true);
    getServicios()
      .then(setServicios)
      .catch(() => showToast("No se pudieron cargar los servicios."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    cargar();
  }, []);

  const guardarServicio = async (payload) => {
    try {
      setGuardando(true);
      await crearServicio(payload);
      showToast("success", "Servicio creado con exito.");
      await cargar();
      return true;
    } catch (e) {
      showToast("error", e.message || "Error creando servicio.");
      return false;
    }finally {
      setGuardando(false);
    }

  }

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
      setSeleccionado(null);
      cargar();
      return true;
    } catch (e) {
      showToast("error", e.message || "Error actualizando");
      return false;
    } finally {
      setActualizando(false);
    }
  };

  const q = filtro.toLowerCase();
  const filtrados = servicios.filter((s) =>
    (s.nombre || "").toLowerCase().includes(q) ||
    (s.descripcion || "").toLowerCase().includes(q)
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

      {filtrados.length === 0 && <p className="no-resultados">No hay resultados</p>}

      <div className="grid-servicios">
        {filtrados.map((s) => (
          <ServiceCard key={s.id} servicio={s} onEdit={abrirEdicion} />
        ))}

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
      
    </div>
  );
}

export default Inicio;