"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionsModel = void 0;
/* eslint-disable @typescript-eslint/indent */
const sequelize_1 = require("sequelize");
const _1 = require(".");
const zygote_1 = require("./zygote");
exports.PromotionsModel = _1.sequelize.define('promotions', {
    ...zygote_1.ZygoteModel,
    promotionId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        defaultValue: (0, sequelize_1.UUIDV4)()
    },
    promotionProductId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        defaultValue: (0, sequelize_1.UUIDV4)()
    },
    promotionProductPrice1: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: true
    },
    promotionProductPrice2: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: true
    },
    promotionProductPrice3: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: true
    },
    promotionStartDate: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    promotionEndDate: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false
    }
}, {
    ..._1.sequelize,
    timestamps: false,
    tableName: 'promotions',
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
});
