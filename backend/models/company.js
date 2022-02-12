'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    VAT_num: DataTypes.INTEGER,
    mobile: DataTypes.STRING,
    addressId: DataTypes.INTEGER
  }, {});
  
  Company.associate = function (models) {
    // associations can be defined here
    Company.belongsTo(models.Address, {
      foreignKey: 'addressId',
      onDelete: 'CASCADE'
    })
  };
  return Company;
};