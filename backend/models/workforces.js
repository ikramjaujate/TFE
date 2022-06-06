'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Workforces = sequelize.define('Workforces', {
    idPersonnel : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true 
    },
    label: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    salary: {
      type:DataTypes.FLOAT, 
      allowNull: false
    },
  }, {});

 
  Workforces.associate = function (models) {
    // associations can be defined here
    Workforces.hasOne(models.Project_Workforces, {
      foreignKey: 'idPersonnel'
    })
    

  };


  return Workforces;
};