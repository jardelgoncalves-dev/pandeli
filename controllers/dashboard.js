module.exports = function(req, res){
    if(req.session.autorizado){
        res.render("usuario/dashboard", {usuario:req.session.usuario})
    }else{
        res.redirect("/login")
    }
}