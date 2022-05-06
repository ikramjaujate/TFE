require( "dotenv" ).config();
const { DATABASE_HOST, DATABASE_NAME_TEST, DATABASE_USERNAME, DATABASE, DATABASE_PASSWORD } = process.env;

module.exports = {
  "development": {
    "username": DATABASE_USERNAME,
    "password": DATABASE_PASSWORD,
    "database": DATABASE,
    "host": DATABASE_HOST,
    "dialect": "postgres",
    "define" : {
      "freezeTableName": true
    }
  },
  "test": {
    "username": 'postgres',
    "password": 'test',
    "database": 'test',
    "host": "127.0.0.1",
    "dialect": "postgres",
    "logging" : false,
    "define" : {
      "freezeTableName": true
    }
  },
  "production": {
    "username": DATABASE_USERNAME,
    "password": DATABASE_PASSWORD,
    "database": DATABASE,
    "host": DATABASE_HOST,
    "logging" : false,
    "dialect": "postgres"
  }
};
