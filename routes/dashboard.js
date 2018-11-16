const express = require("express");
const router = express.Router();

const controller_dashboard = require("../controllers/dashboard");

router.get("/", controller_dashboard);

module.exports = router;