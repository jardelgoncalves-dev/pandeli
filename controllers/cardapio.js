module.exports = function(req, res){
    res.render("cardapio/cardapio", {logado:req.session.autorizado,usuario:req.session.usuario})
}