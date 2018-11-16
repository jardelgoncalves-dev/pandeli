module.exports = function(req, res){
    res.render("home/index",{logado:req.session.autorizado,usuario:req.session.usuario})
}