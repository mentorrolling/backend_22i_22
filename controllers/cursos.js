const { response, request } = require("express");
const Curso = require("../models/curso");

//Get para traer todos los cursos paginados--------------------
const obtenerCursos = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, cursos] = await Promise.all([
    Curso.countDocuments(query),
    Curso.find(query).skip(Number(desde)).limit(Number(limite)),
    //Como traigo los datos de los usuarios y las categorias?🤔
  ]);

  res.json({
    total,
    cursos,
  });
};

//obtener un curso por su ID
const obtenerCurso = async (req = request, res = response) => {
  const { id } = req.params;

  const curso = await Curso.findById(id);
  //Como traigo los datos de los usuarios y las categorias?🤔

  res.json({
    curso,
  });
};

//Crear Curso--------------------------------------
const crearCurso = async (req, res = response) => {
  const { precio, categoria, descripcion } = req.body;
  const nombre = req.body.nombre.toUpperCase();
  const cursoDB = await Curso.findOne({ nombre });

  //validar si el curso existe
  if (cursoDB) {
    return res.status(400).json({
      msg: `El curso ${cursoDB.nombre} ya existe`,
    });
  }
  //Generar la data a guardar
  const data = {
    nombre,
    categoria,
    precio,
    descripcion,
    usuario: req.usuario._id,
  };

  const curso = new Curso(data);

  //grabar en la base de datos
  await curso.save();

  res.status(201).json(curso);
};

//actualizarCurso (validar nombre)
const actualizarCurso = async (req, res) => {
  const { id } = req.params;
  const { precio, categoria, descripcion, destacado } = req.body;

  const usuario = req.usuario._id;

  let data = {
    precio,
    descripcion,
    categoria,
    destacado,
    usuario,
  };

  //si viene el nombre lo guardamos con mayúscula
  if (req.body.nombre) {
    data.nombre = req.body.nombre.toUpperCase();
  }

  const curso = await Curso.findByIdAndUpdate(id, data, { new: true });

  res.status(201).json(curso);
};

//Borrar curso--------------------------------------------------
const borrarCurso = async (req, res) => {
  const { id } = req.params;

  const cursoBorrado = await Curso.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json({
    cursoBorrado,
  });
};

module.exports = {
  obtenerCursos,
  obtenerCurso,
  crearCurso,
  actualizarCurso,
  borrarCurso,
};
