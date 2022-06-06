'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Project_Workforces= sequelize.define('Project_Workforces', {
    idProjectPers : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true 
    },
    idPersonnel : { 
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idProject : { 
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  
  Project_Workforces.associate = function (models) {
    // associations can be defined here
    Project_Workforces.belongsTo(models.Project, {
      foreignKey: 'idProject',
      onDelete: 'CASCADE'
    })
    Project_Workforces.belongsTo(models.Workforces, {
      foreignKey: 'idPersonnel',
      onDelete: 'CASCADE'
    })
  };

  return Project_Workforces;
};