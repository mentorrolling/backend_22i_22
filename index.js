// const express = require("express"); //importamos express

// const app = express();

// app.get("/", function (req, res) {
//   res.send("Hola muchachos y muchachas!");
// });

// app.listen(8080);

const Server = require("./models/server");

const server = new Server();

server.listen();
