module.exports = function(req, res){
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