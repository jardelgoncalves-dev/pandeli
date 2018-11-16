const Usuario = require("../../model/usuarios");
const { check } = require('express-validator/check');

module.exports.addUsuario = function(req, res){
    var erros = []
    const already = Usuario.findOne({email:req.body.email})
    .then(function(already){
        if(already){
            erros.push("Email já utilizado!")
            res.json({
                status:"email já utilziado"
            })
        }else{
            if (req.body.password !== req.body.passwordConfirm){
                erros.push("Senha incorreta")
                res.json({
                    status:"Senha incorreta"
                })
            } else{
                const user = {
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
                    nivel_Acesso:1
                }
                const usuario = new Usuario(user)
                usuario.save()
                res.json({
                    status:"Usuário Cadastrado"
                })
            }
        }
    })
}