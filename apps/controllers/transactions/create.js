"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransaction = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const uuid_1 = require("uuid");
const transactions_1 = require("../../models/transactions");
const transactionsItems_1 = require("../../models/transactionsItems");
const createTransaction = async (req, res) => {
    const requestBody = req.body;
    // const emptyField = requestChecker({
    //   requireList: ['transactionProductId', 'transactionTotalItem', 'transactionPrice'],
    //   requestData: requestBody
    // })
    // if (emptyField.length > 0) {
    //   const message = `invalid request parameter! require (${emptyField})`
    //   const response = ResponseData.error(message)
    //   return res.status(StatusCodes.BAD_REQUEST).json(response)
    // }
    try {
        const transactionPayload = {
            transactionId: (0, uuid_1.v4)(),
            transactionUser: requestBody.transactionUser,
            transactionPrice: requestBody.transactionPrice,
            transactionChange: requestBody.transactionChange,
            transactionPayment: requestBody.transactionPayment
        };
        await transactions_1.TransactionsModel.create(transactionPayload);
        const transactionItemPayload = requestBody.transactionItems.map((item) => {
            return { ...item, transactionItemTransactionId: transactionPayload.transactionId };
        });
        await transactionsItems_1.TransactionItemsModel.bulkCreate(transactionItemPayload);
        const response = response_1.ResponseData.default;
        const result = { message: 'success' };
        response.data = result;
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(response);
    }
    catch (error) {
        const message = `unable to process request! error ${error.message}`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};
exports.createTransaction = createTransaction;
