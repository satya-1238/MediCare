
module.exports.SignIn=function(req,res)
{
   
    return res.render('users_sign_in',{
        title:"Medicare-SignIn"
    })
}

module.exports.Issue=function(req,res)
{
    
    return res.redirect('back');
}