const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Publicacao = new Schema({
    titulo:String,
    data:String,
    conteudo:String,
    foto:String
});

module.exports = mongoose.model("Publicacao", Publicacao);
