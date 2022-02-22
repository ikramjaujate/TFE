'use strict';
const {
  Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Project_Materials = sequelize.define('Project_Materials', {
    idProjMat : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true 
    },
    idProject : DataTypes.INTEGER,
    idMaterial : DataTypes.INTEGER,
    quantity : DataTypes.INTEGER 
  }, {});
  
  Project_Materials.associate = function (models) {
    // associations can be defined here
    Project_Materials.belongsTo(models.Project, {
      foreignKey: 'idProject',
      onDelete: 'CASCADE'
    })
    Project_Materials.belongsTo(models.Material, {
      foreignKey: 'idMaterial',
      onDelete: 'CASCADE'
    })
  };

  return Project_Materials;
};