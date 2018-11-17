const Usuario = require("../../model/usuarios");

module.exports.addUsuario = function(req, res){
    var erros = []
    const already = Usuario.findOne({email:req.body.email})
    .then(function(already){
        if(already){
            erros.push("Email já uso!")
            res.json({
                status:false,
                mensage:erros
            })
            

        }else{
            if (req.body.password !== req.body.passwordConfirm){
                erros.push("Senhas não equivalentes.!")
                res.json({
                    status:false,
                    mensage:erros
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
                    status:true,
                    usuario:usuario
                })
            }
        }
    })
}

module.exports.getAllUsuarios = function(req, res){
    // retornar todos os usuarios
}

module.exports.updateUsuario = function(req, res){
    // dado um id, atualiza informaçoes do usuario
}

module.exports.addCompraUsuario = function(req, res){
    // dado um id (usuario), atualizar usuario inserindo no array compras, as compras efetuadas
}

module.exports.deleteUsuario = function(req, res){
    // dado um id, remove usuário da base de dados
}