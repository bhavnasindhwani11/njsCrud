const Sequelize  = require('sequelize');
const db = require('../config/database');

const User = db.define('user',{
    id:{
        type:Sequelize.INTEGER(11),
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
        comment: 'system id for user'
    },
    username:{
        type:Sequelize.STRING(300),
        allowNull:false,
        unique:true,
    },
    email:{
        type:Sequelize.STRING(300),
        allowNull:false,
        unique:true,
    },
    password:{
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
},{timestamps: false});
module.exports = User;