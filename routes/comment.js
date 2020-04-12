var express = require('express');
var router = express.Router();
var redirect = require('../middlewares/auth');
var comment = require('../controllers/commentcontroller');
var Comment = require('../models/Comment');

router.post('/addComment',redirect.redirectLogin,comment.add);
router.get('/comments/:postId',redirect.redirectLogin,comment.show);
router.get('/deleteComment/:id',redirect.redirectLogin,comment.delete);
router.get('/editComment/:id',redirect.redirectLogin,function(req,res,err){
    Comment.findOne({where:{id:req.params.id}})
    .then(comment => {
        res.render('comments/edit',{title: "Edit comment", comment: comment});
    })
    .catch(err => {
        debug(err);
    })
});
router.post('/updateComment',redirect.redirectLogin,comment.edit);
module.exports = router;