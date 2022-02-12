module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Address', [{
      street: 'Avenue Montjoie 1',
      locality: 'Uccle',
      postal_code: '1180',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Address', null, {});
  }
};