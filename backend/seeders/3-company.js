module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Company', [{
      name : 'MasterServices',
      email: 'info@masterservices.com',
      VAT_num: 123456,
      mobile: '+32 488 37 96 72',
      idAddress: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Company', null, {});
  }
};