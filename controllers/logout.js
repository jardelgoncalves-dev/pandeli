module.exports = function(req, res){
    if (req.session.autorizado){
        req.session.destroy(function(){
            res.redirect("/login")
        })
    }
}