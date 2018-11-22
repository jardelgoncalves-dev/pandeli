const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Produtos = new Schema({
    nome:String,
    preco:Number,
    unidade:String,
    ingredientes:String,
    foto:String
},{
    versionKey: false
})

module.exports = mongoose.model("Produtos", Produtos);