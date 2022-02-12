module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('User', [{
      firstName: 'Ikram',
      lastName: 'Jaujate Ouldkhala',
      email: 'i.jaujate@masterservices.com',
      VAT_num: 123456,
      mobile: '+32 488 37 96 72',
      addressId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'Ikram',
      lastName: 'Jaujate Ouldkhala',
      email: 'i.jaujate@masterservices.com',
      VAT_num: 123456,
      mobile: '+32 488 37 96 72',
      addressId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'Ikram',
      lastName: 'Jaujate Ouldkhala',
      email: 'i.jaujate@masterservices.com',
      VAT_num: 123456,
      mobile: '+32 488 37 96 72',
      addressId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('User', null, {});
  }
};