module.exports = function(req, res){
    if(req.session.autorizado){
        res.render("usuario/pedidos", {usuario:req.session.usuario})
    }else{
        req.flash('error', 'É necessário efetuar o login!')
        res.redirect("/login")
    }
}