// main.jsx
// Este archivo es el punto de entrada de la app (Vite).
// Aquí se monta React en el <div id="root"></div> de index.html.

import React from "react";
import ReactDOM from "react-dom/client";

// BrowserRouter es el componente que habilita el enrutamiento SPA.
// Sin esto, <Routes>, <Route>, <Link>, useNavigate, useParams, etc. NO funcionarán.
import { BrowserRouter } from "react-router-dom";

// App es el componente raíz (donde pondremos nuestras rutas).
import App from "./App.jsx";

// Importamos estilos globales.
// Si usás Tailwind, aquí está el index.css con @tailwind base/components/utilities.
import "./index.css";

// Montar la aplicación dentro del elemento root
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Envolvemos TODO con BrowserRouter para habilitar navegación SPA */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);