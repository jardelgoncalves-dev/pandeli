const fetch = require('node-fetch');
module.exports.get = function(req, res){
    var erros = []
    if(req.session.autorizado){
        req.session.destroy();     
    }
    res.render("account/cadastro", {erros:erros})
}

module.exports.post = function(req, res){
    fetch("http://localhost:3000/api/usuario", {
        method:"POST",
        body:JSON.stringify(req.body),
        headers:{
            "Accept":"application/json",
            "Content-type":"application/json"
        }
    })
    .then(function(res) {
        return res.json()
    })
    .then(function(data){
        if(data.status){
            req.session.autorizado = true
            req.session.usuario = data.usuario
            res.redirect("/dashboard")
        }else{
            res.render("account/cadastro", {erros:data.mensage})
        }
    })
}