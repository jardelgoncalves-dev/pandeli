const express = require("express");
const router = express.Router();

const controller_registra = require("../../controllers/api/usuario");

router.post("/", controller_registra.addUsuario)

module.exports = router;