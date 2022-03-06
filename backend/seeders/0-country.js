module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Country', [{
        name: 'BELGIUM',
        nicename: 'Belgium',
        iso: 'be',
        iso3: 'BEL',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'FRANCE',
        nicename: 'France',
        iso: 'fr',
        iso3: 'FRA',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'LUXEMBOURG',
        nicename: 'Luxembourg',
        iso: 'lu',
        iso3: 'LUX',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'NETHERLANDS',
        nicename: 'Netherlands',
        iso: 'nl',
        iso3: 'NLD',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Country', null, {});
    }
  };