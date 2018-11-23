module.exports = function(req, res){
    if(req.session.autorizado){
        res.render("usuario/dashboard", {usuario:req.session.usuario, erros:req.flash("error")})
    }else{
        req.flash('error', 'É necessário efetuar o login!')
        res.redirect("/login")
    }
}