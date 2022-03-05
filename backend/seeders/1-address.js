module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Address', [{
      street: 'Avenue Montjoie 1',
      locality: 'Uccle',
      postal_code: '1180',
      idCountry: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      street: 'Avenue Paris',
      locality: 'Paris',
      postal_code: '75000',
      idCountry: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Address', null, {});
  }
};