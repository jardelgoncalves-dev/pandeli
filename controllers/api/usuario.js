const Usuario = require("../../model/usuarios");
const randomstring = require("randomstring");
const date = require('date-and-time');


// Add Usuário (consumido pelo cadastro)
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
                    message:"Usuário não encontrado"
                })
            }
            res.status(200).json({
                message:"Compra adicionada"
            })
        })
    }else{
        res.status(400).json({
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