import mysql from "mysql2";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 5000;

const db = mysql.createPool({
  host: "189.197.187.187",
  user: "umoodle",
  password: "Umoodl@2024$",
  database: "alumnos",
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});
app.use(bodyParser.json());
app.use(cors());

//Rutas
app.get("/", (req, res) => {
  res.send("¡Hola, mundoo!");
});

// Ruta para obtener todos los alumnos
app.get("/alumno", (req, res) => {
  const sql = "SELECT * FROM alumnos";
  db.query(sql, (err, result, fields) => {
    if (!err) {
      res.send({
        status: 200,
        result,
      });
    } else {
      res.send({
        status: 100,
        err,
      });
    }
  });
});

// Ruta para obtener un alumno por matrícula
app.get("/alumno/traer/:matricula", (req, res) => {
  const { matricula } = req.params;
  const sqlGet = "SELECT * FROM alumnos WHERE matricula = ?";
  db.query(sqlGet, [matricula], (err, result) => {
    if (!err) {
      res.send({
        status: 200,
        result,
      });
    } else {
      res.send({
        status: 100,
        errNo: err.errno,
        mensaje: err.message,
        codigo: err.code,
      });
    }
  });
});

//Ruta para traer alumnos por nombre
app.get("/alumnos/traer/:nombre", (req, res) => {
  const nombre = req.params.nombre.trim();
  const sqlGet = "SELECT * FROM alumnos WHERE nombre LIKE ?";
  db.query(sqlGet, [`%${nombre}%`], (err, result) => {
    if (!err) {
      res.send({
        status: 200,
        result,
      });
    } else {
      res.send({
        status: 100,
        err,
      });
    }
  });
});

// Ruta para agregar un nuevo alumno
app.post("/alumno/agregar", (req, res) => {
  const {
    matricula,
    aPaterno,
    aMaterno,
    nombre,
    sexo,
    dCalle,
    dNumero,
    dColonia,
    dCodigoPostal,
    aTelefono,
    aCorreo,
    aFacebook,
    aInstagram,
    aTipoSangre,
    nombreContacto,
    telefonoContacto,
    contraseña,
    foto = null, // Asignar null por defecto si no se proporciona
  } = req.body;

  const sql = `INSERT INTO alumnos (matricula, aPaterno, aMaterno, nombre, sexo, dCalle, dNumero, dColonia, dCodigoPostal, aTelefono, aCorreo, aFacebook, aInstagram, tipoSangre, nombreContacto, telefonoContacto, contrasenha, foto) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

  db.query(
    sql,
    [
      matricula,
      aPaterno,
      aMaterno,
      nombre,
      sexo,
      dCalle,
      dNumero,
      dColonia,
      dCodigoPostal,
      aTelefono,
      aCorreo,
      aFacebook,
      aInstagram,
      aTipoSangre,
      nombreContacto,
      telefonoContacto,
      contraseña,
      foto,
    ],
    (err, result) => {
      if (err) {
        console.error("Error al insertar el alumno:", err);
        res.send({
          status: 100,
          errNo: err.errno,
          mensaje: err.message,
          codigo: err.code,
        });
      } else {
        res.send({
          status: 200,
          result,
        });
      }
    }
  );
});

app.post("/alumno/modificar", (req, res) => {
  const {
    matricula,
    aPaterno,
    aMaterno,
    nombre,
    sexo,
    dCalle,
    dNumero,
    dColonia,
    dCodigoPostal,
    aTelefono,
    aCorreo,
    aFacebook,
    aInstagram,
    aTipoSangre,
    nombreContacto,
    telefonoContacto,
    contraseña,
  } = req.body;

  const sql = `UPDATE alumnos SET aPaterno = ?, aMaterno = ?, nombre = ?, sexo = ?, dCalle = ?, dNumero = ?, dColonia = ?, dCodigoPostal = ?, aTelefono = ?, aCorreo = ?, aFacebook = ?, aInstagram = ?, aTipoSangre = ?, nombreContacto = ?, telefonoContacto = ?, contraseña = ? WHERE matricula = ?`;
  db.query(
    sql,
    [
      aPaterno,
      aMaterno,
      nombre,
      sexo,
      dCalle,
      dNumero,
      dColonia,
      dCodigoPostal,
      aTelefono,
      aCorreo,
      aFacebook,
      aInstagram,
      aTipoSangre,
      nombreContacto,
      telefonoContacto,
      contraseña,
      matricula,
    ],
    (err, result) => {
      if (err) {
        res.send({
          status: 100,
          errNo: err.errno,
          mensaje: err.message,
          codigo: err.code,
        });
      } else {
        res.send({
          status: 200,
          result,
        });
      }
    }
  );
});

// Ruta para eliminar un alumno por matrícula
app.delete("/alumno/eliminar", (req, res) => {
  const { matricula } = req.body;
  const sql = "DELETE FROM alumnos WHERE matricula = ?";
  db.query(sql, [matricula], (err, result) => {
    if (!err) {
      res.send({
        status: 200,
        result,
      });
    } else {
      res.send({
        status: 100,
        errNo: err.errno,
        mensaje: err.message,
        codigo: err.code,
      });
    }
  });
});

app.all("/*splat", (req, res) => {
  res.send("La ruta no existe");
});

//Iniciar servidor
app.listen(port, () => {
  db.getConnection((err, connection) => {
    if (err) {
      console.error("❌ Error al obtener conexión del pool:", err.message);
    } else {
      console.log("✅ Conexión establecida exitosamente.");
      connection.release(); // ¡Siempre libera la conexión!
    }
  });

  console.log(`Servidor escuchando en http://localhost:${port}`);
});
