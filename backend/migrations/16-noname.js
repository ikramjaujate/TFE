'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "content" to table "Document"
 * changeColumn "idPerson" on table "Project"
 * changeColumn "idCompany" on table "Project"
 *
 **/

var info = {
    "revision": 16,
    "name": "noname",
    "created": "2022-04-07T15:33:19.239Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "Document",
            "content",
            {
                "type": Sequelize.JSON,
                "field": "content",
                "allowNull": false
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
