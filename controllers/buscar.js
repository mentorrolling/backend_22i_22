const { response, request } = require("express");

//importar los modelos
const Usuario = require("../models/usuario");
const Categoria = require("../models/categoria");
const Curso = require("../models/curso");

//definimos las colecciones permitidas
const coleccionesPermitidas = ["usuarios", "categorias", "cursos"];

//buscar usuarios
const buscarUsuarios = async (termino, res = response) => {
  const regex = new RegExp(termino, "i");

  const usuarios = await Usuario.find({
    $or: [{ nombre: regex }, { correo: regex }],
    $and: [{ estado: true }],
  });

  res.json({
    results: usuarios,
  });
};

//buscar categorias
const buscarCategorias = async (termino, res = response) => {
  const regex = new RegExp(termino, "i");

  const categorias = await Categoria.find({
    nombre: regex,
    estado: true,
  });

  res.json({
    results: categorias,
  });
};

//buscar cursos
const buscarCursos = async (termino, res = response) => {
  const regex = new RegExp(termino, "i");

  const cursos = await Curso.find({
    $or: [{ nombre: regex }, { descripcion: regex }],
    $and: [{ estado: true }],
  });

  res.json({
    results: cursos,
  });
};

//función principal de búsqueda----------------------------
const buscar = (req = request, res = response) => {
  const { coleccion, termino } = req.params;

  //validemos la colección
  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`,
    });
  }

  //de acuerdo a la coleccion buscar por el termino
  switch (coleccion) {
    case "usuarios":
      buscarUsuarios(termino, res);
      break;
    case "categorias":
      buscarCategorias(termino, res);
      break;
    case "cursos":
      buscarCursos(termino, res);
      break;
    default:
      res.status(500).json({
        msg: "Hubo un error al hacer la búsqueda",
      });
      break;
  }
};

module.exports = {
  buscar,
};
