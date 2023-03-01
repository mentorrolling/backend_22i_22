const { Router } = require("express");

const router = Router();

router.get("/", function (req, res) {
  const { apiKey, limit } = req.query;

  res.json({
    mensaje: "Get Usuarios",
    apiKey,
    limit,
  });
});

router.post("/", function (req, res) {
  //recibir el cuerpo de la petición
  const body = req.body;

  res.json({
    mensaje: "Post Usuarios",
    body,
  });
});

router.put("/:id", function (req, res) {
  res.json({
    mensaje: "Put Usuarios",
  });
});

router.delete("/:id", function (req, res) {
  res.json({
    mensaje: "Delete Usuarios",
  });
});

module.exports = router;
