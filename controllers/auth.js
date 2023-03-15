const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req = request, res = response) => {
  const { correo, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });

    //verificar si el correo existe
    if (!usuario) {
      return res.status(400).json({
        msg: "Correo o password incorrectos",
      });
    }

    //el usuario está activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Correo o password incorrectos | usuario inactivo",
      });
    }

    //verificar la contraseña
    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Correo o password incorrectos",
      });
    }
    //generar el token
    const token = await generarJWT(usuario.id);

    res.json({
      msg: "Login OK",
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  login,
};
