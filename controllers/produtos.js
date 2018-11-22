module.exports.getPage = function(req, res){
    if(req.session.autorizado){
        res.render("usuario/produtos", {usuario:req.session.usuario})
    } else{
        req.flash('error', 'É necessário efetuar o login!')
        res.redirect("/login")
    }
}