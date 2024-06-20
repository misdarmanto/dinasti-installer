/* eslint-disable @typescript-eslint/space-before-function-paren */
'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('promotions', [
      {
        promotion_id: '3423423',
        promotion_product_id: 'sdsadsa',
        promotion_product_price1: 18000,
        promotion_product_price1: 16000,
        promotion_product_price1: 14000,
        promotion_start_date: '2024-06-08 00:00:00',
        promotion_end_date: '2024-07-08 03:00:00'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('promotions', null, {})
  }
}
