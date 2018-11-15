const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.set("views", __dirname + "/public/views");