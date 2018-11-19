module.exports.getPage = function(req, res){
    if(req.session.autorizado){
        res.render("usuario/produtos", {usuario:req.session.usuario})
    } else{
        res.redirect("/login")
    }
}