const { Router } = require("express");

const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar_campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { esAdminRole } = require("../middlewares/validar-roles");
//validar si el curso existe🤔
const { cursoExiste } = require("../helpers/db-validators");

const {
  obtenerCursos,
  obtenerCurso,
  crearCurso,
  actualizarCurso,
  borrarCurso,
} = require("../controllers/cursos");

const router = Router();

router.get("/", obtenerCursos);
router.get(
  "/:id",
  [
    check("id", "El id no es válido").isMongoId(),
    //validar si el curso existe🤔
    check("id").custom(cursoExiste),
    validarCampos,
  ],
  obtenerCurso
);

router.post(
  "/",
  [
    validarJWT,
    esAdminRole,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    validarCampos,
  ],
  crearCurso
);

router.put(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "El id no es válido").isMongoId(),
    //validar si el curso existe🤔
    check("id").custom(cursoExiste),
    validarCampos,
  ],
  actualizarCurso
);

router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "El id no es válido").isMongoId(),
    //validar si el curso existe
    check("id").custom(cursoExiste),
    validarCampos,
  ],
  borrarCurso
);

module.exports = router;
