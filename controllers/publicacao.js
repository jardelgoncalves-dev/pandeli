module.exports = function(req, res){
    if(req.session.autorizado){
        res.render("usuario/publicacoes", {usuario:req.session.usuario})
    } else { 
        req.flash('error', 'É necessário efetuar o login!')
        res.redirect("/login")
    }
}