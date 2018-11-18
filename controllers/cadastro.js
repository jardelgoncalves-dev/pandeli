const fetch = require('node-fetch');
module.exports.get = function(req, res){
    if(req.session.autorizado){
        req.session.destroy();     
    }
    let estados = [
        "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", 
        "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", 
        "RO", "RR", "SC", "SP", "SE", "TO"
    ]
    res.render("account/cadastro", {erros:req.flash("error"), estados:estados})
}

module.exports.post = function(req, res){
    if (req.body.password !== req.body.passwordConfirm){
        req.flash('error', "Senhas não equivalentes.")
        res.redirect("/cadastro")

    } else {
        const usuario = {
            nome:req.body.nome,
            sobrenome:req.body.sobrenome,
            email:req.body.email,
            password:req.body.password,
            cpf:req.body.cpf,
            endereco:{
                rua:req.body.rua,
                numero:req.body.numero,
                bairro:req.body.bairro,
                cidade:req.body.cidade,
                uf:req.body.uf,
                cep:req.body.cep
            },
            nivel_acesso:1
        }
        fetch("http://localhost:3000/api/usuario", {
            method:"POST",
            body:JSON.stringify(usuario),
            headers:{
                "Accept":"application/json",
                "Content-type":"application/json"
            }
        })
        .then(function(res) {
            return res.json()
        })
        .then(function(data){
            if(data.stored){
                req.session.autorizado = true
                req.session.usuario = data.usuario
                res.redirect("/dashboard")
            }else{
                req.flash('error', data.message)
                res.redirect("/cadastro")
            }
        })
    }
}