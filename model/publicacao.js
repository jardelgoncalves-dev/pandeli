const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let now = new Date();
const Publicacao = new Schema({
    titulo:String,
    data:String,
    conteudo:String,
    foto:String
});

module.exports = mongoose.model("Publicacao", Publicacao);