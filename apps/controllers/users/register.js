"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRegister = void 0;
const http_status_codes_1 = require("http-status-codes");
// import { Op } from 'sequelize'
const response_1 = require("../../utilities/response");
const user_1 = require("../../models/user");
const requestCheker_1 = require("../../utilities/requestCheker");
const scure_password_1 = require("../../utilities/scure_password");
const uuid_1 = require("uuid");
// import { generateUniqueId } from '../../utilities/generateUniqueId'
const userRegister = async (req, res) => {
    const requestBody = req.body;
    const emptyField = (0, requestCheker_1.requestChecker)({
        requireList: ['userName', 'userEmail', 'userPassword', 'userWhatsAppNumber'],
        requestData: requestBody
    });
    if (emptyField.length > 0) {
        const message = `invalid request parameter! require (${emptyField})`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        // const user = await UserModel.findOne({
        //   raw: true,
        //   where: {
        //     deleted: { [Op.eq]: 0 },
        //     [Op.or]: [
        //       { userEmail: { [Op.eq]: requestBody.userEmail } },
        //       { userWhatsAppNumber: { [Op.eq]: requestBody.userWhatsAppNumber } }
        //     ]
        //   }
        // })
        // if (user != null) {
        //   const message = `Email ${requestBody.userEmail} atau WA ${requestBody.userWhatsAppNumber} sudah terdaftar. Silahkan gunakan yang lain.`
        //   const response = ResponseData.error(message)
        //   return res.status(StatusCodes.BAD_REQUEST).json(response)
        // }
        requestBody.userPassword = (0, scure_password_1.hashPassword)(requestBody.userPassword);
        requestBody.userId = (0, uuid_1.v4)();
        await user_1.UserModel.create(requestBody);
        const response = response_1.ResponseData.default;
        response.data = { message: 'success' };
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(response);
    }
    catch (error) {
        const message = `unable to process request! error ${error.message}`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};
exports.userRegister = userRegister;
