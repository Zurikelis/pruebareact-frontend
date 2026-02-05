import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./Paginas/Inicio";
import ServicioDetalle from "./Componentes/ServicioDetalle";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/Servicios/:id" element={<ServicioDetalle />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;