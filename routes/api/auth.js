const express = require("express");
const router = express.Router();

const controller_auth = require("../../controllers/api/auth");

router.post("/", controller_auth)

module.exports = router;