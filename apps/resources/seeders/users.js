/* eslint-disable @typescript-eslint/space-before-function-paren */
'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        user_id: '66aba427-4b2b-437e-b427-65f2b3f',
        user_name: 'user',
        user_password: 'cf7c906bfbb48e72288fc016bac0e6ed58b0dc2a'
      },
      {
        user_id: '33432427-4b2b-437e-b427-65f2b3f',
        user_name: 'budi',
        user_password: 'cf7c906bfbb48e72288fc016bac0e6ed58b0dc2a'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  }
}
