'use strict';
const {
  Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    idDocument: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title:{
      type: DataTypes.STRING,
      allowNull: false
    },
    file: {
      type: DataTypes.BLOB,
      allowNull: false
    },
    idProject: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('devis', 'facture'),
      allowNull: false
    },
    isAccepted: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    idPaid: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true
    }


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