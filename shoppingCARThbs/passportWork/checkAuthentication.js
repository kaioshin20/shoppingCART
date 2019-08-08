function checkLoggedIn(req,res,next){
    if(req.user){
        return next()
    }
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/users/login')
}

exports=module.exports={
checkLoggedIn
}