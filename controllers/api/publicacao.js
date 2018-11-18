module.exports.getPub = function(req, res){
    // dado um ir, retorna a publicacao
}

module.exports.getAllPub = function(req, res){
    // retorna todas as publicações da base de dados
}

module.exports.addPub = function(req, res){
    // dado um objeto (req.body), sava o objeto na sabe de dados e a imagem em um diretório
    /**
     * ESQUEMA/MODEL da requisição
     * {
     *      titulo: String,
     *      conteudo: String,
     *      filename: String
     * }
     */
}

module.exports.updatePub = function(req, res){
    // dado um id, atualiza os dados da publicação (recebido pelo req.body)
}

module.exports.delete = function(req, res){
    // dado um id, remove a publicação
}