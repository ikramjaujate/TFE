'use strict';
const {
  Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define('Person', {
    idPerson : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true 
    },
    firstName : { 
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: { 
      type: DataTypes.STRING, 
      allowNull: false
    },
    email: { 
      type: DataTypes.STRING, 
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    VAT_num: {
      type:DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    mobile: { 
      type: DataTypes.STRING, 
      allowNull: false
    },
    phone: { 
      type: DataTypes.STRING, 
      allowNull: true
    },
    idAddress : { 
      type: DataTypes.INTEGER, 
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN, 
      allowNull: false
    }

  }, {});
  
  Person.associate = function (models) {
    Person.belongsTo(models.Address, {
      foreignKey: 'idAddress',
      onDelete: 'CASCADE'
    })
    
    Person.hasMany(models.Person_Company, {
      foreignKey: 'idPerson'
    })
    Person.hasMany(models.Project, {
      foreignKey: 'idPerson'
    })
  };
  
  return Person;
};