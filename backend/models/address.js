'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    street: DataTypes.STRING,
    locality: DataTypes.STRING,
    postal_code: DataTypes.STRING
  }, {});

  Address.associate = function (models) {
    // associations can be defined here
    Address.hasMany(models.User, {
      foreignKey: 'addressId'
    })
  };

  return Address;
};