const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";

    //Conectar con Base de datos
    this.conectarDB();
    //middlewares
    this.middlewares();

    //función para las rutas
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    //CORS
    this.app.use(cors());
    //Leer lo que envias el usuario por el cuerpo de la peticion
    this.app.use(express.json());

    //definir la carpeta pública
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usuariosPath, require("../routes/usuarios"));
    // this.app.get("/api/usuarios", function (req, res) {
    //   res.json({
    //     mensaje: "Soy una api de usuarios",
    //   });
    // });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server Online port:", this.port);
    });
  }
}

module.exports = Server; //export default Server (en frontend)
