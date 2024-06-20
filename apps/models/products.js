"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModel = void 0;
/* eslint-disable @typescript-eslint/indent */
const sequelize_1 = require("sequelize");
const _1 = require(".");
const zygote_1 = require("./zygote");
const promotions_1 = require("./promotions");
exports.ProductsModel = _1.sequelize.define('products', {
    ...zygote_1.ZygoteModel,
    productId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        defaultValue: (0, sequelize_1.UUIDV4)()
    },
    productBarcode: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    productName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    productDescription: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    productStock: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    productPrice1: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false
    },
    productPrice2: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: true
    },
    productPrice3: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: true
    },
    productQty1: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    productQty2: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    productQty3: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    }
}, {
    ..._1.sequelize,
    timestamps: false,
    tableName: 'products',
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
});
exports.ProductsModel.hasOne(promotions_1.PromotionsModel, {
    sourceKey: 'productId',
    foreignKey: 'promotionProductId'
});
