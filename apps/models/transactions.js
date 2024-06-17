"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsModel = void 0;
/* eslint-disable @typescript-eslint/indent */
const sequelize_1 = require("sequelize");
const _1 = require(".");
const zygote_1 = require("./zygote");
const transactionsItems_1 = require("./transactionsItems");
exports.TransactionsModel = _1.sequelize.define('transactions', {
    ...zygote_1.ZygoteModel,
    transactionId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        defaultValue: (0, sequelize_1.UUIDV4)()
    },
    transactionPrice: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false
    },
    transactionChange: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false
    },
    transactionPayment: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false
    },
    transactionUser: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    }
}, {
    ..._1.sequelize,
    timestamps: false,
    tableName: 'transactions',
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
});
exports.TransactionsModel.hasMany(transactionsItems_1.TransactionItemsModel, {
    as: 'transactionItems',
    sourceKey: 'transactionId',
    foreignKey: 'transactionItemTransactionId'
});
