const express = require("express");
const router = express.Router();

const controller_cadastro = require("../controllers/cadastro");

router.get("/", controller_cadastro);
module.exports = router;