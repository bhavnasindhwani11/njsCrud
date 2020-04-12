var Userdb = require('../models/User');
var Postdb = require('../models/Post');
var crypto = require('crypto');
var debug = require('debug')('njscrud');
var Comment = require('../models/Comment');
// var session = require('express-session');
Userdb.hasMany(Postdb,{foreignKey:"user_id"});
Postdb.belongsTo(Userdb,{targetKey: "id"});
Userdb.hasMany(Comment,{foreignKey: "user_id"});
Comment.belongsTo(Userdb,{targetKey: "id"});
//Postdb.hasMany(Userdb);
var user = {
    show : (req, res) => {
        //var data = '';
        Userdb.findAll()
        .then(
            users => {
                debug(users);
                res.sendStatus(200);
        })
        .catch(
            err => debug(err)
        );   
    },
    login : (req, res) => {
        var requestData = req.body;
        var hash = crypto.createHmac('sha512', '1234567890'); // last param is salt
        hash.update(requestData.password);
        var value = hash.digest('hex');
        Userdb.findAll({
            include: Postdb,
            attributes: ['id'],
            where: {
                username:requestData.username,
                password:value
            }
        })
        .then(
            users => {
                if (users != '') {
                    var userData = JSON.parse(JSON.stringify(users));
                    req.session.userId = userData[0].id;
                    res.redirect('/showPosts');
                    //res.render('posts',{title:'Posts',Status:0,Data:JSON.stringify(users)});
                } else {
                    res.render('login',{title:'Login',Status:0,Reason:"Login Failed! User name or Password must be incorrect"});                
                }
        })
        .catch(
            err => debug(err)
        );   
    },
    add : (req, res) => {
        var requestData = req.body;
        Userdb.findAll({
            attributes: ['id'],
            where: {
                username:requestData.username
            }
        })
        .then(
            users=>{
                if (users != '') {
                    res.render('signup',{title:'Signup',Status:0,Reason:"Username already exists"});
                } else {
                    var hash = crypto.createHmac('sha512', '1234567890'); // last param is salt
                    hash.update(requestData.password);
                    var value = hash.digest('hex');
                    Userdb.create({ username: requestData.username, email: requestData.email,status:1, password:value});
                    res.render('login',{title:'Login',Status:0,Reason:"Signup Successfull"});
                }
            }
        )
        .catch(
            err => debug(err)
        );
    },
};
module.exports = user;