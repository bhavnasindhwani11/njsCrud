const Sequelize  = require('sequelize');
const db = require('../config/database');

const Comment = db.define('comment',{
    id:{
        type:Sequelize.INTEGER(11),
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    post_id:{
        type:Sequelize.INTEGER(11),
        allowNull:false,
    },
    user_id:{
        type:Sequelize.INTEGER(11),
        allowNull:false,
    },
    comment_desc:{
        type:Sequelize.STRING(300),
        allowNull:false,
    },
    created:{
        type:Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    modified:{
        type:Sequelize.DATE
    },
    status:{
        type:Sequelize.INTEGER(2)
    }
},{timestamps: false,underscored:true});
module.exports = Comment;