'use strict';
const {
  Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    idProject : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
      },
    name : DataTypes.STRING,
    idPerson : DataTypes.INTEGER,
    idCompany : DataTypes.INTEGER,
    status: DataTypes.ENUM('Pre-Sale', 'Accepted', 'In Progress', 'Done', 'Closed'),
    start_date : DataTypes.DATE,
    end_date: DataTypes.DATE
  }, {});
  
  
  Project.associate = function (models) {
    // associations can be defined here
    Project.belongsTo(models.Company, {
      foreignKey: 'idCompany',
      onDelete: 'CASCADE'
    })
    Project.belongsTo(models.Person, {
        foreignKey: 'idPerson',
        onDelete: 'CASCADE'
      })
  };
  return Project;
};