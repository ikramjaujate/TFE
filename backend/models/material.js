'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Material = sequelize.define('Material', {
    idMaterial : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true 
    },
    name: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    type : { 
      type: DataTypes.ENUM('static', 'consommable'),
      allowNull: false
    }
  }, {});

 
  Material.associate = function (models) {
    // associations can be defined here
    Material.hasOne(models.Project_Materials, {
      foreignKey: 'idMaterial'
    })
  };


  return Material;
};