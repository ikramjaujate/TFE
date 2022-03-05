module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Person', [{
      firstName: 'Ikram',
      lastName: 'Jaujate',
      email: 'ikram.jaujate@gmail.com',
      mobile: '+32 484 37 23 72',
      idAddress: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'Toto',
      lastName: 'Pierre',
      email: 'toto.pierre@gmail.com',
      VAT_num: 123456,
      mobile: '+32 485 00 96 72',
      idAddress: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'Jean',
      lastName: 'Marie ',
      email: 'j.marie@gmail.com',
      mobile: '+32 480 37 96 44',
      idAddress: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Person', null, {});
  }
};