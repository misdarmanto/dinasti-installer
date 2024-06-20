/* eslint-disable @typescript-eslint/space-before-function-paren */
'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('transactions', [
      {
        transaction_id: 'erewr434',
        transaction_user: 'Kasir 1',
        transaction_price: 40000,
        transaction_change: 10000,
        transaction_payment: 50000
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('transactions', null, {})
  }
}
