import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  AlumnosAgregar,
  AlumnosConsultar,
  AlumnoModificar,
  ContenidoA,
  HomeA,
  AlumnoEliminar,
} from "./screens";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeA />}>
            <Route index element={<ContenidoA />} />
            <Route path="agregar" element={<AlumnosAgregar />} />
            <Route path="consultar" element={<AlumnosConsultar />} />
            <Route path="modificar" element={<AlumnoModificar />} />
            <Route path="eliminar" element={<AlumnoEliminar />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
