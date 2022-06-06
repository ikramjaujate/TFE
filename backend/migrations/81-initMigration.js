'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Workforces", deps: []
 * createTable "Project_Workforces", deps: [Workforces, Project]
 * changeColumn "idCompany" on table "Project"
 * changeColumn "idPerson" on table "Project"
 *
 **/

var info = {
    "revision": 81,
    "name": "initMigration",
    "created": "2022-06-06T12:52:36.611Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Workforces",
            {
                "idPersonnel": {
                    "type": Sequelize.INTEGER,
                    "field": "idPersonnel",
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "label": {
                    "type": Sequelize.STRING,
                    "field": "label",
                    "allowNull": false
                },
                "salary": {
                    "type": Sequelize.FLOAT,
                    "field": "salary",
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Project_Workforces",
            {
                "idProjectPers": {
                    "type": Sequelize.INTEGER,
                    "field": "idProjectPers",
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "idPersonnel": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Workforces",
                        "key": "idPersonnel"
                    },
                    "field": "idPersonnel",
                    "allowNull": false
                },
                "idProject": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Project",
                        "key": "idProject"
                    },
                    "field": "idProject",
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Project",
            "idCompany",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "Company",
                    "key": "idCompany"
                },
                "allowNull": true,
                "field": "idCompany",
                "validate": {}
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Project",
            "idPerson",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "Person",
                    "key": "idPerson"
                },
                "allowNull": true,
                "field": "idPerson",
                "validate": {}
            }
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
