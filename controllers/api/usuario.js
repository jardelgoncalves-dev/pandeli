const Usuario = require("../../model/usuarios");
const randomstring = require("randomstring");
const date = require('date-and-time');


// Add Usuário (consumido pelo cadastro)
module.exports.addUsuario = function(req, res){
    console.log(req.body)
    if (req.body.password !== req.body.passwordConfirm){
        req.flash('error', "Senhas não equivalentes.")
        res.redirect("/cadastro")
    } else {
        
        Usuario.findOne({email:req.body.email})
        .then(function(already){
            if(already){
                req.flash('error', "Email já em uso.")
                res.redirect("/cadastro")
                

            }else if(isNaN(parseInt(req.body.numero)) && req.body.numero.toUpperCase() !== "S/N"){
                    req.flash('error', "Numero da casa inválido")
                    res.redirect("/cadastro")

            } else {
                const new_usuario = {
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
                const usuario = new Usuario(new_usuario)
                usuario.save()
                req.session.autorizado = true
                req.session.usuario = usuario
                res.redirect("/dashboard")
            }
        })
    }
}

// Retorna todos os usuários cadastrados na base de dados
module.exports.getAllUsuarios = function(req, res){
    Usuario.find()
    .then(function(usuarios){
        res.json(usuarios)
    })
}

// Retorna um único usuário (necessário passar um id como argumento)
module.exports.getUsuario = function(req, res){
    const usuario = Usuario.findById(req.params.id)
    .then(function(usuario){
        res.json(usuario)
    })
}

// Atualiza informações de um usuário
module.exports.updateUsuario = function(req, res){
    Usuario.updateOne({_id:req.params.id}, req.body, function(err, result){
        if(err){
            res.status(404).json({
                message:"Usuário não encontrado"
            })
        }
        res.status(200).json({
            message:"Informações alteradas com sucesso!!!"
        })
    })
}

module.exports.addCompraUsuario = function(req, res){
    /**
     * Estrutura/Model da compra
     * {
     *      produtos: [String, String],
     *      valor_total: Number
     * }
     */
    if(req.body.produtos && req.body.valor_total){
        let now = new Date();
        const compraEfetuada = {
            id:randomstring.generate({
                length: 6,
                charset: 'alphabetic'}),
            produtos:req.body.produtos,
            valor_total:parseFloat(req.body.valor_total),
            status:"Pendente",
            data_compra: date.format(now, 'YYYY/MM/DD HH:mm:ss')
        }

        Usuario.updateOne({_id:req.params.id},{$push:{compras:compraEfetuada}}, function(err, result){
            if(err){
                res.status(404).json({
                    stored:false,
                    message:"Usuário não encontrado"
                })
            }
            res.status(200).json({
                stored:true,
                message:"Compra adicionada"
            })
        })
    }else{
        res.status(400).json({
            stored:false,
            message:"Parâmetros invalidos"
        })
    }
}


module.exports.editStatusCompra = function(req, res){
    const usuario = Usuario.findById(req.params.id)
    .then(function(usuario){
        if(req.body.status){
            // Função para verificar se objeto (compra) verificado é o que está sendo procurado
            function getCompra(array){
                if (array.id === req.params.id_compra){
                    return array
                }
            }
            // Recupera a posição da compra no array (passando a função definida anteriormente)
            let pos = usuario.compras.findIndex(getCompra)
            // Altera o status da compra
            usuario.compras[pos].status = req.body.status
            // Atualiza
            Usuario.updateOne({_id:req.params.id}, usuario, function(err, result){
                if(err){
                    res.status(404).json({
                        message:"Ocorreu um erro ao tentar atualizar status da compra"
                    })
                }
                res.status(200).json({
                    message:"Status da compra atualizada"
                })
            })
        } else {
            res.status(404).json({
                message:"Parâmetro status é requerido"
            })
        }
    })
}

module.exports.deleteCompra = function(req, res){
    Usuario.findById(req.params.id)
    .then(function(usuario){
        function getCompra(array){
            if (array.id === req.params.id_compra){
                return array
            }
        }
        compra_update = []
        let pos = usuario.compras.findIndex(getCompra)
        for (let i=0;i < usuario.compras.length;i++){
            if (i !== pos){
                compra_update.push(usuario.compras[i])
            }
        }
        usuario.compras = compra_update

        Usuario.updateOne({_id:req.params.id}, usuario, function(err, result){
            if(err){
                res.status(404).json({
                    message:"Ocorreu um erro ao tentar remover a compra"
                })
            }
            res.status(200).json({
                message:"Compra removida"
            })
        })
    })
}


module.exports.deleteUsuario = function(req, res){
    // dado um id, remove usuário da base de dados
}