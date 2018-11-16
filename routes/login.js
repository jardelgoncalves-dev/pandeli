const express = require("express");
const router = express.Router();

const controller_login = require("../controllers/login");

router.get("/", controller_login.login);
router.post("/auth",controller_login.auth);


module.exports = router;