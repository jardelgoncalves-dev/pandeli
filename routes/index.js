const express = require("express");
const router = express.Router();

const controller_index = require("../controllers/index");
router.get("/",controller_index);


module.exports = router;