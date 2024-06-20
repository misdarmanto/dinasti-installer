/* eslint-disable @typescript-eslint/space-before-function-paren */
'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', [
      {
        product_id: 'sdsadsa',
        product_barcode: '122232',
        product_name: 'Sunsilk',
        product_description:
          'Sunsilk adalah merek produk perawatan rambut yang terkenal. Shampo ini diformulasikan untuk menjaga kelembutan dan kekuatan rambut Anda. Dengan kandungan nutrisi alami, Sunsilk membantu menjaga rambut tetap sehat dan berkilau.',
        product_stock: 1000,
        product_price1: 20000,
        product_qty1: 10,
        product_price2: 18000,
        product_qty2: 20,
        product_price3: 15000,
        product_qty3: 30,
      },
      {
        product_id: 'asda232',
        product_barcode: '434344',
        product_name: 'Pantene',
        product_description:
          'Pantene adalah merek produk perawatan rambut yang telah dipercaya oleh banyak orang selama bertahun-tahun. Shampo ini dirancang untuk menghidrasi dan memperkuat setiap helai rambut Anda. Dengan formula yang kaya akan nutrisi, Pantene membantu menjaga rambut tetap lembut dan bercahaya.',
        product_stock: 1000,
        product_price1: 30000,
        product_qty1: 20,
        product_price2: 28000,
        product_qty2: 30,
        product_price3: 25000,
        product_qty3: 40,     
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {})
  }
}
