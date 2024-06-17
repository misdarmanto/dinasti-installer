"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.promotionRouter = void 0;
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../../middlewares");
const promotion_1 = require("../../controllers/promotion");
const promotionRouter = (app) => {
    const router = express_1.default.Router();
    app.use('/api/v1/promotions', middlewares_1.middleware.useAuthorization, router);
    router.get('/', async (req, res) => await promotion_1.PromotionController.findAll(req, res));
    router.get('/detail/:promotionId', async (req, res) => await promotion_1.PromotionController.findOne(req, res));
    router.post('/', async (req, res) => await promotion_1.PromotionController.create(req, res));
    router.patch('/', async (req, res) => await promotion_1.PromotionController.update(req, res));
    router.delete('/', async (req, res) => await promotion_1.PromotionController.remove(req, res));
};
exports.promotionRouter = promotionRouter;
