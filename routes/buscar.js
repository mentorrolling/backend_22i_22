const { Router } = require("express");
//el controlador buscar 🤔
const { buscar } = require("../controllers/buscar");

const router = Router();

router.get("/:coleccion/:termino", buscar);

module.exports = router;
