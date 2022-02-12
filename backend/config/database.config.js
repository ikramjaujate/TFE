require( "dotenv" ).config();
const { DATABASE_HOST, DATABASE_PORT, DATABASE_USERNAME, DATABASE, DATABASE_PASSWORD } = process.env;

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
    "username": DATABASE_USERNAME,
    "password": DATABASE_PASSWORD,
    "database": DATABASE,
    "host": DATABASE_HOST,
    "dialect": "postgres"
  },
  "production": {
    "username": DATABASE_USERNAME,
    "password": DATABASE_PASSWORD,
    "database": DATABASE,
    "host": DATABASE_HOST,
    "dialect": "postgres"
  }
};
