import mysql from "mysql2";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

//Rutas
app.get("/", (req, res) => {
  res.send("¡Hola, mundo!");
});

app.all("/*splat", (req, res) => {
  res.send("La ruta no existe");
});

//Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
