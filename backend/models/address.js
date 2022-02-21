'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    idAddress : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true 
    },
    street: DataTypes.STRING,
    locality: DataTypes.STRING,
    postal_code: DataTypes.STRING
  }, {});

 
  Address.associate = function (models) {
    // associations can be defined here
    Address.hasOne(models.Company, {
      foreignKey: 'idAddress'
    })
    Address.hasOne(models.Person, {
      foreignKey: 'idAddress'
    })
  };


  return Address;
};