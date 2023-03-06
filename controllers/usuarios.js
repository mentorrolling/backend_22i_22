const { response, request } = require("express");

const usuariosGet = (req = request, res = response) => {
  const { apiKey, limit } = req.query;

  res.json({
    mensaje: "Get Usuarios del controlador",
    apiKey,
    limit,
  });
};

const usuariosPost = (req = request, res = response) => {
  //recibir el cuerpo de la petición
  const { nombre, correo } = req.body;

  res.json({
    mensaje: "Post Usuarios",
    nombre,
    correo,
  });
};

const usuariosPut = (req = request, res = response) => {
  res.json({
    mensaje: "Put Usuarios",
  });
};

const usuariosDelete = (req = request, res = response) => {
  res.json({
    mensaje: "Delete Usuarios",
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
};
