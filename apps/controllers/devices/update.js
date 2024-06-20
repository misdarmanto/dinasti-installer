"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDevice = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const requestCheker_1 = require("../../utilities/requestCheker");
const devices_1 = require("../../models/devices");
const updateDevice = async (req, res) => {
    const requestBody = req.body;
    const emptyField = (0, requestCheker_1.requestChecker)({
        requireList: ['deviceId'],
        requestData: requestBody
    });
    if (emptyField.length > 0) {
        const message = `invalid request parameter! require (${emptyField})`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        const result = await devices_1.DevicesModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                deviceId: { [sequelize_1.Op.eq]: requestBody.deviceId }
            }
        });
        if (result == null) {
            const message = 'device not found!';
            const response = response_1.ResponseData.error(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response);
        }
        const newData = {
            ...(requestBody.deviceId.length > 0 && {
                deviceId: requestBody.deviceId
            })
        };
        await devices_1.DevicesModel.update(newData, {
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                deviceId: { [sequelize_1.Op.eq]: requestBody.deviceId }
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
exports.updateDevice = updateDevice;
