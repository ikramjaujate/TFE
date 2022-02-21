module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Person', [{
      firstName: 'Ikram',
      lastName: 'Jaujate',
      email: 'ikram.jaujate@masterservices.com',
      VAT_num: 123456,
      mobile: '+32 488 37 96 72',
      idAddress: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'Toto',
      lastName: 'Pierre',
      email: 'toto.pierre@masterservices.com',
      VAT_num: 123456,
      mobile: '+32 488 37 96 72',
      idAddress: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'Jean',
      lastName: 'Marie ',
      email: 'j.marie@masterservices.com',
      VAT_num: 123456,
      mobile: '+32 488 37 96 72',
      idAddress: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Person', null, {});
  }
};