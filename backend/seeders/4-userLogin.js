module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('userLogin', [{
      firstName: 'Ikram',
      lastName: 'Jaujate Ouldkhala',
      email: 'admin@masterservices.com',
      password: '$argon2id$v=19$m=4096,t=3,p=1$t4I64TI17PxgQkK71sPBow$wQj+Vvbmuc9gJdDFDWje4rvi/C6sQzO29i0jwSc8HiY',
      role: 'dev',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('userLogin', null, {});
  }
};