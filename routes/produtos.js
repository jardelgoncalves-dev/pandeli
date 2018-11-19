const express = require("express");
const router = express.Router();

const controller_produtos = require("../controllers/produtos");

router.get("/produtos", controller_produtos.getPage)

module.exports = router;