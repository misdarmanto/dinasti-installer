"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePromotion = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const requestCheker_1 = require("../../utilities/requestCheker");
const promotions_1 = require("../../models/promotions");
const updatePromotion = async (req, res) => {
    const requestBody = req.body;
    const emptyField = (0, requestCheker_1.requestChecker)({
        requireList: ['promotionId'],
        requestData: requestBody
    });
    if (emptyField.length > 0) {
        const message = `invalid request parameter! require (${emptyField})`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        const result = await promotions_1.PromotionsModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                promotionId: { [sequelize_1.Op.eq]: requestBody.promotionId }
            }
        });
        if (result == null) {
            const message = 'promotion not found!';
            const response = response_1.ResponseData.error(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response);
        }
        const newData = {
            ...(requestBody.promotionProductId.length > 0 && {
                promotionProductId: requestBody.promotionProductId
            })
        };
        await promotions_1.PromotionsModel.update(newData, {
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                promotionId: { [sequelize_1.Op.eq]: requestBody.promotionId }
            }
        });
        const response = response_1.ResponseData.default;
        response.data = { message: 'success' };
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `unable to process request! error ${error.message}`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};
exports.updatePromotion = updatePromotion;
