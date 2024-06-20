/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('promotions', {
      ...ZygoteModel,
      promotion_id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
      },
      promotion_product_id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
      },
      promotion_product_price1: {
        type: DataTypes.DECIMAL,
        allowNull: true
      },
      promotion_product_price2: {
        type: DataTypes.DECIMAL,
        allowNull: true
      },
      promotion_product_price3: {
        type: DataTypes.DECIMAL,
        allowNull: true
      },
      promotion_start_date: {
        type: DataTypes.DATE,
        allowNull: true
      },
      promotion_end_date: {
        type: DataTypes.DATE,
        allowNull: true
      }
    })
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('promotions')
  }
}
