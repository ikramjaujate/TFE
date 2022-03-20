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
    name : {
      type: DataTypes.STRING, 
      allowNull: false
    },
    idPerson : {
      type: DataTypes.INTEGER,
      validate:{
        alreadyContainsFK(value){     
          if(value && this.idCompany){
            throw new Error('Cannot have 2 FK : Company already taken');
          }
        }
      }
    },
    idCompany : {
      type: DataTypes.INTEGER,
      validate:{
        alreadyContainsFK(value){
          if(value && this.idPerson){
            throw new Error('Cannot have 2 FK : Person already taken');
          }
        }
      }
    },
    status: {
      type: DataTypes.ENUM('Pre-Sale', 'Accepted', 'In Progress', 'Done', 'Closed', 'Canceled'),
      allowNull: false
    },
    start_date : { 
      type: DataTypes.DATE,
      allowNull: false
    },
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
      Project.hasMany(models.Document, {
        foreignKey: 'idProject'
      })
  };
  return Project;
};