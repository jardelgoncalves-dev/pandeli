const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const expressSession = require("express-session");
const bodyParse = require("body-parser");
const expressValidator = require("express-validator");
const flash = require("connect-flash");
const upload = require("express-fileupload");

// Configuração e Conexão com o mongodb
mongoose.set('debug', true);
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost:2702/pandeli-db", { useNewUrlParser: true })

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
app.use(express.static("./public"));
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParse.urlencoded({extended:true}));
app.use(expressSession({
    secret:"ajsdj34r34jfasascqsdas0",
    resave:false,
    saveUninitialized:false
}));
app.use(expressValidator());
app.use(flash());
app.use(upload())


// Rotas
app.use("/", require("./routes/index"));
app.use("/cardapio", require("./routes/cardapio"));
app.use("/login", require("./routes/login"));
app.use("/carrinho", require("./routes/carrinho"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/cadastro", require("./routes/cadastro"));
app.use("/dashboard", require("./routes/pedidos"));
app.use("/dashboard", require("./routes/produtos"));
app.use("/dashboard", require("./routes/publicacoes"))
app.use("/sair", require("./routes/logout"));

// Rotas API
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/usuario", require("./routes/api/usuario"));
app.use("/api/produto", require("./routes/api/produto"));
app.use("/api/publicacao", require("./routes/api/publicacao"));

app.listen(process.env.PORT || app.get("port"), function(){
    console.log("Server on port", app.get("port"))
});