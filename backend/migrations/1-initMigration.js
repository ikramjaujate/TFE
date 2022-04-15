'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Country", deps: []
 * createTable "Material", deps: []
 * createTable "userLogin", deps: []
 * createTable "Materials_Update", deps: [Material, userLogin]
 * createTable "Address", deps: [Country]
 * createTable "Person", deps: [Address]
 * createTable "Company", deps: [Address]
 * createTable "Project", deps: [Person, Company]
 * createTable "Project_Materials", deps: [Project, Material]
 * createTable "Person_Company", deps: [Person, Company]
 * createTable "Document", deps: [Project]
 *
 **/

var info = {
    "revision": 1,
    "name": "initMigration",
    "created": "2022-04-15T11:31:57.049Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Country",
            {
                "idCountry": {
                    "type": Sequelize.INTEGER,
                    "field": "idCountry",
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name",
                    "allowNull": false
                },
                "nicename": {
                    "type": Sequelize.STRING,
                    "field": "nicename",
                    "allowNull": false
                },
                "iso": {
                    "type": Sequelize.STRING,
                    "field": "iso",
                    "allowNull": false
                },
                "iso3": {
                    "type": Sequelize.STRING,
                    "field": "iso3",
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
            "Material",
            {
                "idMaterial": {
                    "type": Sequelize.INTEGER,
                    "field": "idMaterial",
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name",
                    "allowNull": false
                },
                "quantity": {
                    "type": Sequelize.INTEGER,
                    "field": "quantity"
                },
                "price": {
                    "type": Sequelize.FLOAT,
                    "field": "price"
                },
                "type": {
                    "type": Sequelize.ENUM('static', 'consumable'),
                    "field": "type",
                    "allowNull": false
                },
                "isBillable": {
                    "type": Sequelize.BOOLEAN,
                    "field": "isBillable"
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
                "idUserLogin": {
                    "type": Sequelize.INTEGER,
                    "field": "idUserLogin",
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
            "Materials_Update",
            {
                "idMatUpt": {
                    "type": Sequelize.INTEGER,
                    "field": "idMatUpt",
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "idMaterial": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Material",
                        "key": "idMaterial"
                    },
                    "field": "idMaterial",
                    "allowNull": false
                },
                "idUserLogin": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "userLogin",
                        "key": "idUserLogin"
                    },
                    "field": "idUserLogin",
                    "allowNull": false
                },
                "reason": {
                    "type": Sequelize.ENUM('inventory', 're-stock', 'defect', 'loss'),
                    "field": "reason",
                    "allowNull": false
                },
                "quantity": {
                    "type": Sequelize.INTEGER,
                    "field": "quantity",
                    "allowNull": false
                },
                "notes": {
                    "type": Sequelize.STRING,
                    "field": "notes",
                    "allowNull": true
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
                    "field": "street",
                    "allowNull": false
                },
                "locality": {
                    "type": Sequelize.STRING,
                    "field": "locality",
                    "allowNull": false
                },
                "postal_code": {
                    "type": Sequelize.STRING,
                    "field": "postal_code",
                    "allowNull": false
                },
                "idCountry": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Country",
                        "key": "idCountry"
                    },
                    "field": "idCountry",
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
                    "field": "firstName",
                    "allowNull": false
                },
                "lastName": {
                    "type": Sequelize.STRING,
                    "field": "lastName",
                    "allowNull": false
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email",
                    "validate": {
                        "isEmail": true
                    },
                    "unique": true,
                    "allowNull": false
                },
                "VAT_num": {
                    "type": Sequelize.STRING,
                    "field": "VAT_num",
                    "unique": true,
                    "allowNull": true
                },
                "mobile": {
                    "type": Sequelize.STRING,
                    "field": "mobile",
                    "allowNull": false
                },
                "phone": {
                    "type": Sequelize.STRING,
                    "field": "phone",
                    "allowNull": true
                },
                "idAddress": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Address",
                        "key": "idAddress"
                    },
                    "field": "idAddress",
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
            "Company",
            {
                "idCompany": {
                    "type": Sequelize.INTEGER,
                    "field": "idCompany",
                    "autoIncrement": true,
                    "primaryKey": true
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
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name",
                    "allowNull": false
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email",
                    "validate": {
                        "isEmail": true
                    },
                    "unique": true,
                    "allowNull": false
                },
                "VAT_num": {
                    "type": Sequelize.STRING,
                    "field": "VAT_num",
                    "unique": true,
                    "allowNull": false
                },
                "mobile": {
                    "type": Sequelize.STRING,
                    "field": "mobile",
                    "unique": false,
                    "allowNull": true
                },
                "phone": {
                    "type": Sequelize.STRING,
                    "field": "phone",
                    "unique": false,
                    "allowNull": true
                },
                "website": {
                    "type": Sequelize.STRING,
                    "field": "website",
                    "unique": false,
                    "allowNull": true
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
                    "field": "name",
                    "allowNull": false
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
                    "field": "idPerson",
                    "validate": {}
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
                    "field": "idCompany",
                    "validate": {}
                },
                "status": {
                    "type": Sequelize.ENUM('Pre-Sale', 'Accepted', 'In Progress', 'Done', 'Closed', 'Canceled'),
                    "field": "status",
                    "allowNull": false
                },
                "start_date": {
                    "type": Sequelize.DATE,
                    "field": "start_date",
                    "allowNull": false
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
            "Project_Materials",
            {
                "idProjMat": {
                    "type": Sequelize.INTEGER,
                    "field": "idProjMat",
                    "autoIncrement": true,
                    "primaryKey": true
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
                "idMaterial": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Material",
                        "key": "idMaterial"
                    },
                    "field": "idMaterial",
                    "allowNull": false
                },
                "quantity": {
                    "type": Sequelize.INTEGER,
                    "field": "quantity",
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
            "Person_Company",
            {
                "idPerComp": {
                    "type": Sequelize.INTEGER,
                    "field": "idPerComp",
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "idPerson": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Person",
                        "key": "idPerson"
                    },
                    "field": "idPerson",
                    "allowNull": false
                },
                "idCompany": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Company",
                        "key": "idCompany"
                    },
                    "field": "idCompany",
                    "allowNull": false
                },
                "isPrimary": {
                    "type": Sequelize.BOOLEAN,
                    "field": "isPrimary",
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
            "Document",
            {
                "idDocument": {
                    "type": Sequelize.INTEGER,
                    "field": "idDocument",
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "title": {
                    "type": Sequelize.STRING,
                    "field": "title",
                    "allowNull": false
                },
                "file": {
                    "type": Sequelize.BLOB,
                    "field": "file",
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
                "type": {
                    "type": Sequelize.ENUM('devis', 'facture'),
                    "field": "type",
                    "allowNull": false
                },
                "isAccepted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "isAccepted",
                    "allowNull": true
                },
                "idPaid": {
                    "type": Sequelize.BOOLEAN,
                    "field": "idPaid",
                    "allowNull": true
                },
                "notes": {
                    "type": Sequelize.STRING,
                    "field": "notes",
                    "allowNull": true
                },
                "isEmailed": {
                    "type": Sequelize.BOOLEAN,
                    "field": "isEmailed",
                    "defaultValue": false,
                    "allowNull": false
                },
                "content": {
                    "type": Sequelize.JSON,
                    "field": "content",
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
