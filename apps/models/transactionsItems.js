"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionItemsModel = void 0;
/* eslint-disable @typescript-eslint/indent */
const sequelize_1 = require("sequelize");
const _1 = require(".");
const zygote_1 = require("./zygote");
const products_1 = require("./products");
exports.TransactionItemsModel = _1.sequelize.define('transaction_items', {
    ...zygote_1.ZygoteModel,
    transactionItemId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        defaultValue: (0, sequelize_1.UUIDV4)()
    },
    transactionItemTransactionId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        defaultValue: (0, sequelize_1.UUIDV4)()
    },
    transactionItemProductId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        defaultValue: (0, sequelize_1.UUIDV4)()
    },
    transactionItemBasePrice: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false
    },
    transactionItemTotal: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false
    },
    transactionItemDiscount: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: true
    }
}, {
    ..._1.sequelize,
    timestamps: false,
    tableName: 'transaction_items',
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
});
exports.TransactionItemsModel.hasOne(products_1.ProductsModel, {
    sourceKey: 'transactionItemProductId',
    foreignKey: 'productId'
});
