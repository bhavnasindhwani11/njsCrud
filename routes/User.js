var express = require('express');
var router = express.Router();
var user = require('../controllers/usersController');
var auth = require('../middlewares/auth');

router.get('/',auth.redirectPost,(req,res)=>{
  res.render('login',{title:'Login',Status:0});
});
router.get('/login',auth.redirectPost,(req,res)=>{
    res.render('login',{title:'Login',Status:0});
});
router.post('/signup',auth.redirectPost,user.add);
router.post('/login',auth.redirectPost,user.login);

router.get('/signup',auth.redirectPost,function(req,res){
    res.render('signup',{title:'Signup',Status:1});
});
router.get('/logout',auth.redirectLogin,function(req,res){
  if(req.session.userId){
    req.session.destroy(function(err){
      if(err){
        return next(err);
      }else{
        return res.auth('/');
      }
    });
  }
});

module.exports = router;
  