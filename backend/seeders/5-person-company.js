module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Person_Company', [{
        isPrimary: true,
        idCompany: 1,
        idPerson: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Person_Company', null, {});
    }
  };