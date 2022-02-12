'use strict';
const {
  Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName : DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    VAT_num: DataTypes.INTEGER,
    mobile: DataTypes.STRING,
    addressId : DataTypes.INTEGER
  }, {});
  
  User.associate = function (models) {
    // associations can be defined here
    User.belongsTo(models.Address, {
      foreignKey: 'addressId',
      onDelete: 'CASCADE'
    })
  };
  return User;
};