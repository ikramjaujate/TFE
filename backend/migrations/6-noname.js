'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "phone" to table "Company"
 * addColumn "website" to table "Company"
 * changeColumn "mobile" on table "Company"
 * changeColumn "idPerson" on table "Project"
 * changeColumn "idCompany" on table "Project"
 *
 **/

var info = {
    "revision": 6,
    "name": "noname",
    "created": "2022-04-12T11:02:38.764Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "Company",
            "phone",
            {
                "type": Sequelize.STRING,
                "field": "phone",
                "unique": false,
                "allowNull": true
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Company",
            "website",
            {
                "type": Sequelize.STRING,
                "field": "website",
                "unique": false,
                "allowNull": true
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Company",
            "mobile",
            {
                "type": Sequelize.STRING,
                "field": "mobile",
                "unique": false,
                "allowNull": true
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
