const Sequelize = require('sequelize');
var debug = require('debug')('njscrud');
const myConnection = new Sequelize('nodeDB', 'clovedbu', 'clovedbp', {
    host: 'localhost',
    dialect: 'mysql'
  });
try {
    myConnection.authenticate();
    debug('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
module.exports = myConnection;