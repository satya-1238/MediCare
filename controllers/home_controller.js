module.exports.home=function(req,res){
    // return res.end('<h1>First Page <\h1> ');
    return res.render('home',{
        title:"home"
    });
}

// general format for controller fn
// module.exports.actionName=function(req,res)
// {

// }
