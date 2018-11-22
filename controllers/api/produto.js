const Produto = require("../../model/produtos");
const shortHash = require('short-hash');
const fs = require("fs");


module.exports.addProduto = function(req, res){
    if(req.files){
        let file = req.files.images
        let now = new Date();
        let hash = shortHash(now+req.files.images.name)
        file.mv("./public/dist/img/product/" +hash + ".png")

        const new_prod = {
            nome:req.body.nome,
            unidade:req.body.unidade,
            ingredientes:req.body.ingredientes,
            preco:req.body.preco,
            foto:hash+".png"
        }
        const produto = new Produto(new_prod)
        produto.save()
        res.status(200).json({
            message:"Produto cadastrado com sucesso"
        })
    } else {
        res.status(404).json({
            message:"É necessário enviar uma imagem!!!"
        })
    }
    
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
    const product = Produto.findById(req.params.id)
    .then(function(product){
        fs.unlink('./public/dist/img/product/'+ product.foto, (err) => {
            if (err) throw err;
            console.log("Arquivo ", product.foto, " deletado")
        });

        Produto.deleteOne({_id:product._id}, function(err, result){
            if(err){
                res.status(404).json({
                    message:"Ocorreu um erro ao remover o produto"
                })
            }
            res.status(200).json({
                message:"Produto deletado com sucesso"
            })
        })

    });
}