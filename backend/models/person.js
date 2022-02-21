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
    firstName : DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    VAT_num: DataTypes.INTEGER,
    mobile: DataTypes.STRING,
    idAddress : DataTypes.INTEGER
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