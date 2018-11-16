const express = require("express");
const router = express.Router();

const controller_logout = require("../controllers/logout");

router.get("/", controller_logout);
module.exports = router;