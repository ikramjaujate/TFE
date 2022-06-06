module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Company', [{
      name : 'MasterServices',
      email: 'info@masterservices.com',
      VAT_num: 'BE 0849720889',
      mobile: '+32 488 37 96 72',
      phone: null,
      website: "www.masterservices.be",
      idAddress: 3,isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Company', null, {});
  }
};