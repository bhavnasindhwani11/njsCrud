var debug = require('debug')('njscrud');

// If user is not logged in then other urls are not alowed to access using this validation 
const redirectLogin = (req,res,next)=>{
  if(!req.session.userId){
    res.redirect('/');
  }else{
    next();
  }
}
// If user is logged in then login and signup urls are not alowed to access using this validation
const redirectPost = (req,res,next)=>{
  debug(req.session);
  if(req.session.userId){
    res.redirect('/showPosts');
  }else{
    next();
  }
}

module.exports.redirectLogin = redirectLogin;
module.exports.redirectPost = redirectPost;
