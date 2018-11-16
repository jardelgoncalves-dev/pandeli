module.exports = function(req, res){
    if(req.session.autorizado){
        req.session.destroy()
    }
        res.render("account/login")
}
