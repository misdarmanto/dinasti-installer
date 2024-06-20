/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('transactions', {
      ...ZygoteModel,
      transaction_id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
      },
      transaction_price: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      transaction_change: {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      transaction_payment: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      transaction_user: {
        type: DataTypes.STRING,
        allowNull: false
      }
    })
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('transactions')
  }
}
