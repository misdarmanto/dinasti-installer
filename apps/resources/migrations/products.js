/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('products', {
      ...ZygoteModel,
      product_id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
      },
      product_barcode: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      product_name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      product_description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      product_stock: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      product_price1: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      product_price2: {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      product_price3: {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      product_qty1: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      product_qty2: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      product_qty3: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    })
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('products')
  }
}
