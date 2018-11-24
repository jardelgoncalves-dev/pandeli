const express = require("express");
const router = express.Router();

const controller_carrinho = require("../controllers/carrinho");

router.get("/", controller_carrinho.acesso)
router.post("/compra/:id_produto", controller_carrinho.comprar)

module.exports = router;