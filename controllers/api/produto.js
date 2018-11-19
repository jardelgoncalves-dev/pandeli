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
    const produto = Produto.findById(req.params.id)
    .then(function(produto){
        res.status(200).json(produto)
    })
}

module.exports.updateProduto = function(req, res){
    Produto.updateOne({_id:req.params.id},req.body, function(err, result){
        if(err){
            res.status(404).json({
                message:"Recurso não encontrado"
            })
        }
        res.status(200).json({
            message:"Produto atualizado com sucesso"
        })
    })
}

module.exports.deleteProduto = function(req, res){
    Produto.deleteOne({_id:req.params.id}, function(err, result){
        if(err){
            res.status(404).json({
                message:"Ocorreu um erro ao remover o produto"
            })
        }
        res.status(200).json({
            message:"Produto deletado com sucesso"
        })
    })
}