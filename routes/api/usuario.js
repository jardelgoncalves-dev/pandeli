const express = require("express");
const router = express.Router();

const controller_usuario = require("../../controllers/api/usuario");

router.get("/", controller_usuario.getAllUsuarios)
router.get("/:id", controller_usuario.getUsuario)
router.post("/", controller_usuario.addUsuario)
router.put("/:id", controller_usuario.updateUsuario)
router.put("/compra/:id", controller_usuario.addCompraUsuario)
router.put("/compra/update/:id/:id_compra", controller_usuario.editStatusCompra)
router.delete("/compra/delete/:id/:id_compra", controller_usuario.deleteCompra)

module.exports = router;