const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.usuariosPath = "/api/usuarios";

    //middlewares
    this.middlewares();
    //función para las rutas
    this.routes();
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
    this.app.listen(8080, () => {
      console.log("Server Online port 8080");
    });
  }
}

module.exports = Server; //export default Server (en frontend)
