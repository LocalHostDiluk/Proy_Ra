import React from "react";
import { Button } from "react-bootstrap";

function ContenidoA() {
  return (
    <>
      <Button variant="primary">Agregar</Button>
      <Button variant="secondary">Modificar</Button>
      <Button variant="success">Consultar</Button>
      <Button variant="warning">Eliminar</Button>
    </>
  );
}

export default ContenidoA;
