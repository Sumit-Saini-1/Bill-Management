const isLogin= function(req,res,next){
    if (!req.session.isLoggedIn) {
        res.redirect("/login");
        return;
    } 
    next();
}


module.exports={
    isLogin
}