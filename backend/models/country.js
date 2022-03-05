'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Country = sequelize.define('Country', {
    idCountry : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true 
    },
    name: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    nicename: {
        type: DataTypes.STRING, 
        allowNull: false
      },
    iso: {
      type:DataTypes.STRING, 
      allowNull: false
    },
    iso3: {
        type:DataTypes.STRING, 
        allowNull: false
    }
    
  }, {});

 
  Country.associate = function (models) {
    // associations can be defined here
    Country.hasOne(models.Address, {
      foreignKey: 'idCountry'
    })
  };


  return Country;
};