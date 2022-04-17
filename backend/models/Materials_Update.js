'use strict';
const {
  Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Materials_Update = sequelize.define('Materials_Update', {
    idMatUpt : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true 
    },
    idMaterial : { 
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idUserLogin : { 
        type: DataTypes.INTEGER,
        allowNull: false
    },
    reason : { 
      type: DataTypes.ENUM('inventory', 're-stock', 'defect', 'loss', 'project'),
      allowNull: false
    },
    quantity : { 
      type: DataTypes.INTEGER, 
      allowNull: false
    },
    notes : { 
      type: DataTypes.STRING, 
      allowNull: true
    }
  }, {});
  
  Materials_Update.associate = function (models) {
    // associations can be defined here
    Materials_Update.belongsTo(models.userLogin, {
      foreignKey: 'idUserLogin',
      onDelete: 'CASCADE'
    })
    Materials_Update.belongsTo(models.Material, {
      foreignKey: 'idMaterial',
      onDelete: 'CASCADE'
    })
  };

  return Materials_Update;
};