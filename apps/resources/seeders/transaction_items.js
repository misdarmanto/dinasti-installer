/* eslint-disable @typescript-eslint/space-before-function-paren */
'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('transaction_items', [
      {
        transaction_item_id: 'we3423432',
        transaction_item_transaction_id: 'erewr434',
        transaction_item_product_id: 'sdsadsa',
        transaction_item_base_price: 1000,
        transaction_item_total: 4,
        transaction_item_discount: 0
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('transaction_items', null, {})
  }
}
