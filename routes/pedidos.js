const express = require("express");
const router = express.Router();

const controller_pedidos = require("../controllers/pedidos");

router.get("/pedidos", controller_pedidos);

module.exports = router;