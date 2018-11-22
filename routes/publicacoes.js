const express = require("express");
const router = express.Router();

const controller_publicacao = require("../controllers/publicacao");

router.get("/publicacoes", controller_publicacao)

module.exports = router;