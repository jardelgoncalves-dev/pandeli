module.exports.getPage = function(req, res){
    if(req.session.autorizado && req.session.usuario.nivel_acesso === 2){
        res.render("usuario/produtos", {usuario:req.session.usuario})
        
    } else if (req.session.autorizado && req.session.usuario.nivel_acesso === 1){
        req.flash('error', 'Acesso não permitido!')
        res.redirect("/dashboard")

    } else{
        req.flash('error', 'É necessário efetuar o login!')
        res.redirect("/login")
    }
}