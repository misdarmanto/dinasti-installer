"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findDetailTransaction = exports.findAllTransaction = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const pagination_1 = require("../../utilities/pagination");
const requestCheker_1 = require("../../utilities/requestCheker");
const log_1 = require("../../utilities/log");
const transactions_1 = require("../../models/transactions");
const products_1 = require("../../models/products");
const transactionsItems_1 = require("../../models/transactionsItems");
const findAllTransaction = async (req, res) => {
    try {
        const page = new pagination_1.Pagination(parseInt(req.query.page) ?? 0, parseInt(req.query.size) ?? 10);
        const result = await transactions_1.TransactionsModel.findAndCountAll({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                ...(Boolean(req.query.search) && {
                    [sequelize_1.Op.or]: [{ transactionUser: { [sequelize_1.Op.like]: `%${req.query.search}%` } }]
                })
            },
            attributes: [
                'transactionId',
                'transactionUser',
                'transactionPrice',
                'transactionChange',
                'transactionPayment',
                'createdAt'
            ],
            order: [['id', 'desc']],
            ...(req.query.pagination === 'true' && {
                limit: page.limit,
                offset: page.offset
            })
        });
        const response = response_1.ResponseData.default;
        response.data = page.data(result);
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        log_1.CONSOLE.error(error.message);
        const message = `unable to process request! error ${error.message}`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};
exports.findAllTransaction = findAllTransaction;
const findDetailTransaction = async (req, res) => {
    const requestParams = req.params;
    const emptyField = (0, requestCheker_1.requestChecker)({
        requireList: ['transactionId'],
        requestData: requestParams
    });
    if (emptyField.length > 0) {
        const message = `invalid request parameter! require (${emptyField})`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        const result = await transactions_1.TransactionsModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                transactionId: { [sequelize_1.Op.eq]: requestParams.transactionId }
            },
            include: [
                {
                    model: transactionsItems_1.TransactionItemsModel,
                    attributes: [
                        'transactionItemId',
                        'transactionItemTransactionId',
                        'transactionItemProductId',
                        'transactionItemBasePrice',
                        'transactionItemTotal',
                        'transactionItemDiscount'
                    ],
                    as: 'transactionItems',
                    include: [
                        {
                            model: products_1.ProductsModel,
                            attributes: [
                                'productId',
                                'productBarcode',
                                'productName',
                                'productDescription',
                                'productStock',
                                'productPrice1',
                                'productPrice2',
                                'productPrice3',
                                'productQty1',
                                'productQty2',
                                'productQty3'
                            ]
                        }
                    ]
                }
            ]
        });
        if (result == null) {
            const message = 'not found!';
            const response = response_1.ResponseData.error(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response);
        }
        const response = response_1.ResponseData.default;
        response.data = result;
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `unable to process request! error ${error.message}`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};
exports.findDetailTransaction = findDetailTransaction;
