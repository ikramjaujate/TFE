'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "idCompany" on table "Project"
 * changeColumn "idPerson" on table "Project"
 *
 **/

var info = {
    "revision": 38,
    "name": "noname",
    "created": "2022-06-05T10:07:51.808Z",
    "comment": ""
};

var migrationCommands = [{
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
