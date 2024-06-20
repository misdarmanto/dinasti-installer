/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('transaction_items', {
      ...ZygoteModel,
      transaction_item_id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
      },
      transaction_item_transaction_id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
      },
      transaction_item_product_id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
      },
      transaction_item_base_price: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      transaction_item_total: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      transaction_item_discount: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    })
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('transaction_items')
  }
}
