const Usuario = require("../../model/usuarios");

module.exports.addUsuario = function(req, res){
    const already = Usuario.findOne({email:req.body.email})
    .then(function(already){
        if(already){
            res.json({
                stored:false,
                message:"Email já em uso."
            })
            

        }else{
            if(isNaN(parseInt(req.body.endereco.numero)) && req.body.endereco.numero.toUpperCase() !== "S/N"){
                res.json({
                    stored:false,
                    message:"Numero da casa inválido"
                })
            } else {
                const usuario = new Usuario(req.body)
                usuario.save()
                res.json({
                    stored:true,
                    message:"Usuário cadastrado com sucesso.",
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