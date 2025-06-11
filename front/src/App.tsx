import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AlumnosAgregar, ContenidoA, HomeA } from "./screens";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeA />}>
            <Route index element={<ContenidoA />} />
            <Route path="agregar" element={<AlumnosAgregar />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
