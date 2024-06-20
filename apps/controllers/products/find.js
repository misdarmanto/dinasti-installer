"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findDetailProduct = exports.findAllProducts = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const pagination_1 = require("../../utilities/pagination");
const requestCheker_1 = require("../../utilities/requestCheker");
const log_1 = require("../../utilities/log");
const products_1 = require("../../models/products");
const promotions_1 = require("../../models/promotions");
const findAllProducts = async (req, res) => {
    try {
        const page = new pagination_1.Pagination(parseInt(req.query.page) ?? 0, parseInt(req.query.size) ?? 10);
        const result = await products_1.ProductsModel.findAndCountAll({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                productBarcode: { [sequelize_1.Op.eq]: req.query.search }
                // ...(Boolean(req.query.search) && {
                //   [Op.or]: [{ productName: { [Op.like]: `%${req.query.search}%` } }]
                // })
            },
            include: [
                {
                    model: promotions_1.PromotionsModel
                }
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
exports.findAllProducts = findAllProducts;
const findDetailProduct = async (req, res) => {
    const requestParams = req.params;
    const emptyField = (0, requestCheker_1.requestChecker)({
        requireList: ['productId'],
        requestData: requestParams
    });
    if (emptyField.length > 0) {
        const message = `invalid request parameter! require (${emptyField})`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        const result = await products_1.ProductsModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                productId: { [sequelize_1.Op.eq]: requestParams.productId }
            }
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
exports.findDetailProduct = findDetailProduct;
