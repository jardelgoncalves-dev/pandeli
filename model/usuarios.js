const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Usuarios = new Schema({
    nome:String,
    sobrenome:String,
    email:String,
    password:String,
    cpf:String,
    endereco:{
        rua:String,
        numero:String,
        bairro:String,
        cidade:String,
        uf:String,
        cep:String
    },
    compras:[],
    nivel_acesso:Number
},{
    versionKey: false
})

module.exports = mongoose.model("Usuarios", Usuarios);
