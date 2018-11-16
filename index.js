const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const expressSession = require("express-session");
const bodyParse = require("body-parser");

// Configuração e Conexão com o mongodb
mongoose.set('debug', true);
mongoose.connect("mongodb://localhost:2702/pandeli-db", { useNewUrlParser: true })
    .then(function(){
        console.log("Banco de dados Conectado")
    })
    .catch(function(){
        console.error(err)
    });

// Configurações
app.set("view engine", "ejs");
app.set("views", "./public/views");
app.set("port", 3000)

// Middlewares 
app.use(express.static(__dirname + "/public"));
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParse.urlencoded({extended:true}));
app.use(expressSession({
    secret:"ajsdj34r34jfasascqsdas0",
    resave:false,
    saveUninitialized:false
}));


// Rotas
app.use("/", require("./routes/index"));
app.use("/cardapio", require("./routes/cardapio"));
app.use("/login", require("./routes/login"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/sair", require("./routes/logout"));

app.listen(app.get("port"), function(){
    console.log("Server on port", app.get("port"))
});