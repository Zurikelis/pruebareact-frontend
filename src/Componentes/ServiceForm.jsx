import { useState } from "react";

function ServiceForm({ onGuardar, loading }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!nombre.trim() || !descripcion.trim()) {
      setMsg("Completa ambos campos.");
      return;
    }
    if (nombre.trim().length < 3) {
      setMsg("El nombre es muy corto.");
      return;
    }

    const ok = await onGuardar({
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
    });

    if (ok) {
      setNombre("");
      setDescripcion("");
    }
  };

  return (
    <form onSubmit={submit} className="form-container-horizontal">
      <div className="form-row">
        <input
          className="form-input-elegant"
          type="text"
          placeholder="Nombre del servicio"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          disabled={loading}
        />

        <input
          className="form-input-elegant description-input"
          type="text"
          placeholder="Descripción breve"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          disabled={loading}
        />

        <button type="submit" disabled={loading} className="btn-guardar-elegant">
          {loading ? "..." : "Crear"}
        </button>
      </div>

      {msg && <p className="form-error-msg">{msg}</p>}
    </form>
  );
}

export default ServiceForm;