var express = require('express');
var router = express.Router();
var posts = require('../controllers/postsController');
var Post = require('../models/Post');
var auth = require('../middlewares/auth');


/* GET home page. */
//router.get('/',user.show);
router.get('/showPosts',auth.redirectLogin,posts.show);
router.post('/posts',auth.redirectLogin,posts.add);
router.get('/addPosts',auth.redirectLogin,function(req,res,err){
  res.render('posts/add',{title: "Add Post", post: null});
});
router.get('/editPost/:id',auth.redirectLogin,function(req,res,err){
  Post.findOne({where:{id:req.params.id}})
  .then(post => {
    res.render('posts/add',{title: "Edit Post", post:post.dataValues});
  })
  .catch(err => {
    debug(err);
  });
});
router.get('/deletePost/:id',auth.redirectLogin,posts.del);

module.exports = router;
