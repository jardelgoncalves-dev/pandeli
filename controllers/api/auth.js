const Usuario = require("../../model/usuarios");

module.exports = function(req, res){
    const usuario = Usuario.findOne(req.body)
    .then(function(usuario){
        if (usuario){
            req.session.autorizado = true
            req.session.usuario = usuario
        }
    
        if(req.session.autorizado){
            res.redirect("/dashboard")
        }else{
            req.flash('error', 'Email ou Senha inválida!')
            res.redirect("/login")
        }
    })
}