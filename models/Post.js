const Sequelize = require('sequelize');
const db = require('../config/database');
const User = require('./User');
const Post = db.define('post',{
    id:{
        type:Sequelize.INTEGER(11),
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    user_id:{
        type:Sequelize.INTEGER(11),
        allowNull:false,
        field:"user_id",
        references:{
            model: User,
            key:'id'
        }
    },
    title:{
        type: Sequelize.STRING(255),
        allowNull:false,

    },
    description:{
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
module.exports = Post;