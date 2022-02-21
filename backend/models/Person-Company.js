'use strict';
const {
  Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Person_Company = sequelize.define('Person_Company', {
    isPrimary : DataTypes.BOOLEAN,
    idPerson : DataTypes.INTEGER,
    idCompany : DataTypes.INTEGER
  }, {});
  
  Person_Company.associate = function (models) {
    // associations can be defined here
    Person_Company.belongsTo(models.Person, {
      foreignKey: 'idPerson',
      onDelete: 'CASCADE'
    })
    Person_Company.belongsTo(models.Company, {
      foreignKey: 'idCompany',
      onDelete: 'CASCADE'
    })
  };

  return Person_Company;
};