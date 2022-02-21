'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Address", deps: []
 * createTable "userLogin", deps: []
 * createTable "Company", deps: [Address]
 * createTable "Person", deps: [Address]
 * createTable "Project", deps: [Person, Company]
 * createTable "Person_Company", deps: [Person, Company]
 * createTable "Document", deps: [Project]
 *
 **/

var info = {
    "revision": 1,
    "name": "initMigration",
    "created": "2022-02-20T19:47:34.962Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Address",
            {
                "idAddress": {
                    "type": Sequelize.INTEGER,
                    "field": "idAddress",
                    "autoIncrement": true,
                    "primaryKey": true
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
            "userLogin",
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
                "password": {
                    "type": Sequelize.STRING,
                    "field": "password"
                },
                "role": {
                    "type": Sequelize.ENUM('dev', 'admin', 'sec'),
                    "field": "role"
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
                "idCompany": {
                    "type": Sequelize.INTEGER,
                    "field": "idCompany",
                    "autoIncrement": true,
                    "primaryKey": true
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
                "idAddress": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Address",
                        "key": "idAddress"
                    },
                    "allowNull": true,
                    "field": "idAddress"
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
            "Person",
            {
                "idPerson": {
                    "type": Sequelize.INTEGER,
                    "field": "idPerson",
                    "autoIncrement": true,
                    "primaryKey": true
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
                "idAddress": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Address",
                        "key": "idAddress"
                    },
                    "allowNull": true,
                    "field": "idAddress"
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
            "Project",
            {
                "idProject": {
                    "type": Sequelize.INTEGER,
                    "field": "idProject",
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name"
                },
                "idPerson": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Person",
                        "key": "idPerson"
                    },
                    "allowNull": true,
                    "field": "idPerson"
                },
                "idCompany": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Company",
                        "key": "idCompany"
                    },
                    "allowNull": true,
                    "field": "idCompany"
                },
                "status": {
                    "type": Sequelize.ENUM('Pre-Sale', 'Accepted', 'In Progress', 'Done', 'Closed'),
                    "field": "status"
                },
                "start_date": {
                    "type": Sequelize.DATE,
                    "field": "start_date"
                },
                "end_date": {
                    "type": Sequelize.DATE,
                    "field": "end_date"
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
            "Person_Company",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "isPrimary": {
                    "type": Sequelize.BOOLEAN,
                    "field": "isPrimary"
                },
                "idPerson": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Person",
                        "key": "idPerson"
                    },
                    "allowNull": true,
                    "field": "idPerson"
                },
                "idCompany": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Company",
                        "key": "idCompany"
                    },
                    "allowNull": true,
                    "field": "idCompany"
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
            "Document",
            {
                "idDocument": {
                    "type": Sequelize.INTEGER,
                    "field": "idDocument",
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "file": {
                    "type": Sequelize.BLOB,
                    "field": "file"
                },
                "idProject": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Project",
                        "key": "idProject"
                    },
                    "allowNull": true,
                    "field": "idProject"
                },
                "type": {
                    "type": Sequelize.ENUM('devis', 'facture'),
                    "field": "type"
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
