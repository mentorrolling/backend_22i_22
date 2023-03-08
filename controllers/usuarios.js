const { response, request } = require("express");
// const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs"); //importar librería para encriptar contraseña

const Usuario = require("../models/usuario");

const usuariosGet = (req = request, res = response) => {
  const { apiKey, limit } = req.query;

  res.json({
    mensaje: "Get Usuarios del controlador",
    apiKey,
    limit,
  });
};

const usuariosPost = async (req = request, res = response) => {
  //validar los errores
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json(errors);
  // }

  //recibir el cuerpo de la petición
  const datos = req.body;
  const { nombre, correo, password, rol } = datos;
  const usuario = new Usuario({ nombre, correo, password, rol });
  //verificar el correo
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    return res.status(400).json({
      msg: "El correo ya existe",
    });
  }
  //encriptar la contraseña
  const salt = bcrypt.genSaltSync(10);
  // const hash = bcrypt.hashSync(password, salt);
  usuario.password = bcrypt.hashSync(password, salt);
  //guardar en la BD
  await usuario.save();

  res.json({
    usuario,
    message: "Usuario creado correctamente",
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
