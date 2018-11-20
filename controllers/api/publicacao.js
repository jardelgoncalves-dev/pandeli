const Publicacao = require("../../model/publicacao");
const date = require('date-and-time');

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
    let now = new Date();
    const pub = {
        titulo:req.body.titulo,
        conteudo:req.body.conteudo,
        foto:req.body.foto,
        data:date.format(now, 'YYYY/MM/DD HH:mm:ss')
    }
    const publicacao = new Publicacao(pub)
    publicacao.save()
    res.status(200).json({
        message:"Publicação cadastrada com sucesso"
    })
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
}