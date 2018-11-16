const express = require("express");
const router = express.Router();

const controller_cardapio = require("../controllers/cardapio");

router.get("/", controller_cardapio);

module.exports = router;