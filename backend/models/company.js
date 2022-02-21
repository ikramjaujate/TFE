'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    idCompany : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true 
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    VAT_num: DataTypes.INTEGER,
    mobile: DataTypes.STRING,
    idAddress: DataTypes.INTEGER
  }, {});
  
  /*Company.associate = function (models) {
    // associations can be defined here
    
  };*/
  Company.associate = function (models) {
    Company.belongsTo(models.Address, {
      foreignKey: 'idAddress',
      onDelete: 'CASCADE'
    })

    Company.hasMany(models.Person_Company, {
      foreignKey: 'idCompany'
    })

    Company.hasMany(models.Project, {
      foreignKey: 'idCompany'
    })

  };
  /*Company.associate = function (models) {
    // associations can be defined here
    
  };*/
  return Company;
};