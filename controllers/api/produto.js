const Produto = require("../../model/produtos");
module.exports.addProduto = function(req, res){
    const produto = new Produto(req.body)
    produto.save()
    res.status(200).json({
        message:"Produto cadastrado com sucesso"
    })
}

module.exports.getAllProdutos = function(req, res){
    Produto.find()
    .then(function(usuarios){
        res.status(200).json(usuarios)
    })
}

module.exports.getProduto = function(req, res){
    // dado um id, retorna um produto
}

module.exports.updateProduto = function(req, res){
    // dado um id, atualiza informações do produto
}

module.exports.deleteProduto = function(req, res){
    // dado um id, remove o produto
}