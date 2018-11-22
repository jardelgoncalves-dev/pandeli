const Publicacao = require("../../model/publicacao");
const date = require('date-and-time');
const shortHash = require('short-hash');
const fs = require("fs");

module.exports.getPub = function(req, res){
    const publicacao = Publicacao.findById(req.params.id)
    .then(function(publicacao){
        res.status(200).json(publicacao)
    })
}

module.exports.getAllPub = function(req, res){
    Publicacao.find()
    .then(function(publicacoes){
        res.status(200).json(publicacoes)
    })
}

module.exports.addPub = function(req, res){
    if(req.files){
        let file = req.files.images
        let now = new Date();
        let hash = shortHash(now+req.files.images.name)
        file.mv("./public/dist/img/pub/" +hash + ".png")

        const pub = {
            titulo:req.body.titulo,
            conteudo:req.body.conteudo,
            foto:hash+".png",
            data:date.format(now, 'DD/MM/YYYY HH:mm:ss')
        }
        const publicacao = new Publicacao(pub)
        publicacao.save()
        res.status(200).json({
            message:"Publicação cadastrada com sucesso"
        })
    }else {
        res.status(404).json({
            message:"É necessário enviar uma imagem!!!"
        })
    }
}

module.exports.updatePub = function(req, res){
    Publicacao.updateOne({_id:req.params.id},req.body, function(err, result){
        if(err){
            res.status(404).json({
                message:"Ocorreu um erro ao tentar atualizar a publicação"
            })
        }
        res.status(200).json({
            message:"Atualização realizada com sucesso"
        })
    })
}

module.exports.deletePub = function(req, res){
    const pub = Publicacao.findById(req.params.id)
    .then(function(pub){
        fs.unlink('./public/dist/img/pub/'+ pub.foto, (err) => {
            if (err) throw err;
            console.log("Arquivo ", pub.foto, " deletado")
        });

        Publicacao.deleteOne({_id:req.params.id}, function(err, result){
            if(err){
                res.status(404).json({
                    message:"Erro ao tentar remover publicação"
                })
            }
            res.status(200).json({
                message:"Publicação deletada com sucesso"
            })
        })
    })
}