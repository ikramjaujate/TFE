module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('userLogin', [{
      firstName: 'John',
      lastName: 'Doe',
      email: 'dev-test@masterservices.com',
      password: '$argon2id$v=19$m=4096,t=3,p=1$Zmg5dHV5cWVjMW0wMDAwMA$v25BXzVK5xyjVgyDFD1Js4rSCvsQbQc07Wzq6vCT',
      role: 'dev',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'William',
      lastName: 'Woe',
      email: 'secretaire-test@masterservices.com',
      password: '$argon2id$v=19$m=4096,t=3,p=1$Zmg5dHV5cWVjMW0wMDAwMA$v25BXzVK5xyjVgyDFD1Js4rSCvsQbQc07Wzq6vCT',
      role: 'sec',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('userLogin', null, {});
  }
};