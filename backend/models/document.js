'use strict';
const {
  Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    idDocument : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
      },
    file : DataTypes.BLOB,
    idProject: DataTypes.INTEGER,
    type: DataTypes.ENUM('devis', 'facture' ),
  }, {});
  
  Document.associate = function (models) {
    // associations can be defined here
    Document.belongsTo(models.Project, {
      foreignKey: 'idProject',
      onDelete: 'CASCADE'
    })
  };

  return Document;
};