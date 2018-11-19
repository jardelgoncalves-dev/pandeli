const express = require("express");
const router = express.Router()

const controller_produto_api = require("../../controllers/api/produto")

router.get("/", controller_produto_api.getAllProdutos)
router.get("/:id", controller_produto_api.getProduto)
router.post("/", controller_produto_api.addProduto)
router.put("/:id", controller_produto_api.updateProduto)
router.delete("/:id", controller_produto_api.deleteProduto)

module.exports = router;