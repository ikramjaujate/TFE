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
      }
    ], {});
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Country', null, {});
    }
  };