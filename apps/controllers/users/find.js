"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findDetailUser = exports.findAllUser = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const user_1 = require("../../models/user");
const pagination_1 = require("../../utilities/pagination");
const findAllUser = async (req, res) => {
    try {
        const page = new pagination_1.Pagination(parseInt(req.query.page) ?? 0, parseInt(req.query.size) ?? 10);
        const users = await user_1.UserModel.findAndCountAll({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                ...(Boolean(req.query.search) && {
                    [sequelize_1.Op.or]: [{ userName: { [sequelize_1.Op.like]: `%${req.query.search}%` } }]
                })
            },
            attributes: ['id', 'userId', 'userName', 'createdAt', 'updatedAt'],
            order: [['id', 'desc']],
            ...(req.query.pagination === 'true' && {
                limit: page.limit,
                offset: page.offset
            })
        });
        const response = response_1.ResponseData.default;
        response.data = page.data(users);
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        console.log(error.message);
        const message = `unable to process request! error ${error.message}`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};
exports.findAllUser = findAllUser;
const findDetailUser = async (req, res) => {
    try {
        const user = await user_1.UserModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                userId: { [sequelize_1.Op.eq]: req.body?.user?.userId }
            },
            attributes: ['id', 'userId', 'userName', 'createdAt', 'updatedAt']
        });
        if (user == null) {
            const message = 'user not found!';
            const response = response_1.ResponseData.error(message);
            return res.status(http_status_codes_1.StatusCodes.FORBIDDEN).json(response);
        }
        const response = response_1.ResponseData.default;
        response.data = user;
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `unable to process request! error ${error.message}`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};
exports.findDetailUser = findDetailUser;
