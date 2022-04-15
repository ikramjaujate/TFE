'use strict';
const {
  Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const userLogin = sequelize.define('userLogin', {
    idUserLogin : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true 
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM('dev', 'admin', 'sec')
  }, {});

  userLogin.associate = function (models) {
    // associations can be defined here
    userLogin.hasOne(models.Materials_Update, {
      foreignKey: 'idUserLogin'
    })
  };
  
  return userLogin;
};