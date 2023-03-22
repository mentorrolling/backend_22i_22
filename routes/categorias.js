const { Router } = require("express");
const { check } = require("express-validator");

const {
  obtenerCategorias,
  obtenerCategoria,
  crearCategoria,
  actualizarCategoria,
  borrarCategoria,
} = require("../controllers/categorias");

const { categoriaExiste } = require("../helpers/db-validators");

const { validarJWT } = require("../middlewares/validar-jwt");
const { esAdminRole } = require("../middlewares/validar-roles");
const { validarCampos } = require("../middlewares/validar_campos");

const router = Router();

router.get("/", [validarJWT], obtenerCategorias);

router.get(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID válido").isMongoId(),
    //validar si existe una categoría con ese id
    check("id").custom(categoriaExiste),
    validarCampos,
  ],
  obtenerCategoria
);

router.post(
  "/",
  [
    validarJWT,
    esAdminRole,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    validarCampos,
  ],
  crearCategoria
);

router.put(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID válido").isMongoId(),
    //validar si existe una categoría con ese id,
    check("id").custom(categoriaExiste),
    check("nombre", "El nombre es obligatorio").notEmpty(),
    validarCampos,
  ],
  actualizarCategoria
);

router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID válido").isMongoId(),
    //validar si existe una categoría con ese id,
    check("id").custom(categoriaExiste),
    validarCampos,
  ],
  borrarCategoria
);

module.exports = router;
