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
    idAddress: DataTypes.INTEGER,
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    VAT_num: {
      type:DataTypes.STRING,  
      allowNull: false,
      unique: true
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    }
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