const express = require("express");
const router = express.Router();

const controller_login = require("../controllers/login");

router.get("/", controller_login);


module.exports = router;