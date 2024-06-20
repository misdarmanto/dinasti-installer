"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevicesModel = void 0;
/* eslint-disable @typescript-eslint/indent */
const sequelize_1 = require("sequelize");
const _1 = require(".");
const zygote_1 = require("./zygote");
exports.DevicesModel = _1.sequelize.define('devices', {
    ...zygote_1.ZygoteModel,
    deviceId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        defaultValue: (0, sequelize_1.UUIDV4)()
    },
    deviceName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    deviceStatus: {
        type: sequelize_1.DataTypes.ENUM('enable', 'disable'),
        allowNull: false,
        defaultValue: 'disable'
    }
}, {
    ..._1.sequelize,
    timestamps: false,
    tableName: 'devices',
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
});
