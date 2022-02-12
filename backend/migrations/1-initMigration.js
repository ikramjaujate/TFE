'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Address", deps: []
 * createTable "Company", deps: [Address]
 * createTable "User", deps: [Address]
 *
 **/

var info = {
    "revision": 1,
    "name": "initMigration",
    "created": "2022-02-12T19:13:03.860Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Address",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "street": {
                    "type": Sequelize.STRING,
                    "field": "street"
                },
                "locality": {
                    "type": Sequelize.STRING,
                    "field": "locality"
                },
                "postal_code": {
                    "type": Sequelize.STRING,
                    "field": "postal_code"
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
            "Company",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name"
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email"
                },
                "VAT_num": {
                    "type": Sequelize.INTEGER,
                    "field": "VAT_num"
                },
                "mobile": {
                    "type": Sequelize.STRING,
                    "field": "mobile"
                },
                "addressId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Address",
                        "key": "id"
                    },
                    "allowNull": true,
                    "field": "addressId"
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
            "User",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "firstName": {
                    "type": Sequelize.STRING,
                    "field": "firstName"
                },
                "lastName": {
                    "type": Sequelize.STRING,
                    "field": "lastName"
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email"
                },
                "VAT_num": {
                    "type": Sequelize.INTEGER,
                    "field": "VAT_num"
                },
                "mobile": {
                    "type": Sequelize.STRING,
                    "field": "mobile"
                },
                "addressId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Address",
                        "key": "id"
                    },
                    "allowNull": true,
                    "field": "addressId"
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
