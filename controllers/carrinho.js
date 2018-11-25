const fetch = require('node-fetch');

module.exports.acesso = function(req, res){
    if (req.session.compras){
        if(req.session.autorizado){
            res.render("carrinho/carrinho", {
                compras:req.session.compras,
                usuario:req.session.usuario,
                logado:req.session.autorizado
            })

        }else {
            req.session.usuario = {nome:"", nivel_acesso:0}
            res.render("carrinho/carrinho", {
                compras:req.session.compras,
                usuario:req.session.usuario,
                logado:false
            })
        }
    }
    else{
        if(req.session.autorizado){
            res.render("carrinho/carrinho", {
                compras:req.session.compras,
                usuario:req.session.usuario,
                logado:req.session.autorizado
            })
        } else {
            req.session.usuario = {nome:"",nivel_acesso:0}
            req.session.compras = []
            res.render("carrinho/carrinho", {
                compras:req.session.compras,
                usuario:req.session.usuario,
                logado:req.session.autorizado
            })
        }
    }
}

module.exports.comprar = function(req, res){
    if (req.session.compras){
        if(!req.session.compras.includes(req.params.id_produto))
        req.session.compras.push(req.params.id_produto)
    } else {
        req.session.compras = []
        req.session.compras.push(req.params.id_produto)
    }
    res.status(200).json({
        stored:true
    })
}
