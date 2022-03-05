'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    idAddress : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true 
    },
    street: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    locality: {
      type:DataTypes.STRING, 
      allowNull: false
    },
    postal_code: {
      type:DataTypes.STRING, 
      allowNull: false
    },
    idCountry : { 
      type: DataTypes.INTEGER, 
      allowNull: false
    }
  }, {});

 
  Address.associate = function (models) {
    // associations can be defined here
    Address.hasOne(models.Company, {
      foreignKey: 'idAddress'
    })
    Address.hasOne(models.Person, {
      foreignKey: 'idAddress'
    })
    Address.belongsTo(models.Country, {
      foreignKey: 'idCountry',
      onDelete: 'CASCADE'
    })
  };


  return Address;
};