module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Project', [{
        name: 'Test',
        idPerson: 1,
        idCompany: 1,
        status: 'Accepted',
        start_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Project', null, {});
    }
  };