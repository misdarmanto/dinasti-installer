/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('devices', {
      ...ZygoteModel,
      device_id: {
        type: DataTypes.STRING(80),
        allowNull: false
      },
      device_name: {
        type: DataTypes.STRING(80),
        allowNull: false
      },
      device_status: {
        type: DataTypes.ENUM('enable', 'disable'),
        allowNull: false,
        defaultValue: 'disable'
      }
    })
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('devices')
  }
}
