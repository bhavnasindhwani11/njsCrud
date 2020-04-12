var Postdb = require('../models/Post');
var debug = require('debug')('njscrud');
//Post Belongs To User Association 
var post = {
    show : (req, res) => {
        Postdb.findAll({where: {status: 1}, include: ['user']} )
        .then(posts => {
            debug(req.session.userId);
            debug(Object.keys(posts).length);
            let len = Object.keys(posts).length; // finding length
            debug(posts[0].dataValues.user_id.username);
            res.render('posts/show',{ title:'Posts',Status:3,length: len,posts:posts,showOptions:req.session.userId});
            // res.render('posts',{title:'Show All Posts', Status: 3,posts: true});
        })
        .catch(err => {
            debug(err);
        });
        //var data = '';
        // Userdb.findAll()
        // .then(
        //     users => {
        //         debug(users);
        //         res.sendStatus(200);
        // })
        // .catch(
        //     err => debug(err)
        // );   
    },
    add : (req, res) => {
        if(req.body.id){
        Postdb.findOne({where: {id: req.body.id}})
        .then(post => {
            if(post){
                var d = new Date();
                d.setHours(d.getHours() + 5);
                d.setMinutes(d.getMinutes() + 30);
                post.update({title:req.body.title,description: req.body.description,modified:d})
                .then(post => {
                    res.redirect('/showPosts');
                })
                .catch(err => {
                    debug(err);
                });
            }
        })
        .catch(err => {
            debug(err);
        });
        }else{
            var requestData = req.body;
            // Userdb.createPost({title:requestData.title,description:requestData.description,status:1})
            // .then(post => {
            //     res.redirect('/showPosts');
            // })
            // .catch(err => {
            //     debug(err);
            // });
            
            Postdb.create({user_id: req.session.userId,title:requestData.title, description: requestData.description,status:1})
            .then(
                posts=>{
                    res.redirect('/showPosts');
            })
            .catch(err=>{
                debug(err)
            });
        }
        
    },
    del: (req,res) => {
        Postdb.destroy({where: {id: req.params.id}})
        .then(tt => {
            res.redirect('/showPosts');
        })
        .catch(err => {
            debug(err);
        });
    }
};
module.exports = post;