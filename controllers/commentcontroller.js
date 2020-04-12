var Post = require('../models/Post');
var User = require('../models/User');
var moment = require('moment');
var Comment = require('../models/Comment');
var debug = require('debug')('njscrud');
Post.hasMany(Comment,{foreignKey:"post_id"});
Comment.belongsTo(Post,{targetKey: "id"});
var comment = {
    add: (req,res) => {
        Comment.create({post_id: req.body.postId, user_id: req.session.userId,comment_desc:req.body.comment,status:1})
        .then(comment => {
            res.redirect('/comments/'+req.body.postId);
        })
        .catch(err => {
            debug(err);
        })
    },
    show: (req,res) => {
        Comment.findAll({where: {post_id: req.params.postId,status:1},include:['post','user']})
        .then(comments => {
            res.render('comments/show',{comments: comments, postId: req.params.postId,title: "Show Comments",showCommentOptions: req.session.userId});
        })
        .catch(err => {
            debug(err);
        })
    },
    edit: (req,res) => {
        Comment.findOne({where: {id:req.body.id}})
        .then(comment => {
            var now = moment();//for finding current date timesstamp
            var officialnow = new Date(now);
            comment.update({comment_desc: req.body.comment,modified: officialnow})
            .then(comment => {
                res.redirect('/showPosts');
            })
            .catch(er => {
                debug(er);
            })
        })
        .catch(err => {
            debug(err);
        })
    },
    delete: (req,res) => {
        Comment.destroy({where: {id: req.params.id}})
        .then(comment => {
            res.redirect('/showPosts');
        })
        .catch(err => {
            debug(err);
        });
    }
}

module.exports = comment;