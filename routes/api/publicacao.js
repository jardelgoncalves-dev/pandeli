const express = require("express");
const router = express.Router()

const controller_publicacao_api = require("../../controllers/api/publicacao");

router.get("/", controller_publicacao_api.getAllPub)
router.get("/:id", controller_publicacao_api.getPub)
router.post("/", controller_publicacao_api.addPub)
router.put("/:id", controller_publicacao_api.updatePub)
router.delete("/:id", controller_publicacao_api.deletePub)

module.exports = router;