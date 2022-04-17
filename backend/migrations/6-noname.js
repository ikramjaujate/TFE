'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "idPaid" from table "Document"
 * addColumn "isPaid" to table "Document"
 * changeColumn "idCompany" on table "Project"
 * changeColumn "idPerson" on table "Project"
 *
 **/

var info = {
    "revision": 6,
    "name": "noname",
    "created": "2022-04-16T13:20:29.755Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["Document", "idPaid"]
    },
    {
        fn: "addColumn",
        params: [
            "Document",
            "isPaid",
            {
                "type": Sequelize.BOOLEAN,
                "field": "isPaid",
                "allowNull": true
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
