"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouterV1 = void 0;
const controllers_1 = require("../../controllers");
const userRouter_1 = require("./userRouter");
const myProfileRouter_1 = require("./myProfileRouter");
const productRouter_1 = require("./productRouter");
const transactionRouter_1 = require("./transactionRouter");
const promotionRouter_1 = require("./promotionRouter");
const deviceRouter_1 = require("./deviceRouter");
const statisticRouter_1 = require("./statisticRouter");
const appRouterV1 = (app) => {
    app.get('/api/v1', async (req, res) => await (0, controllers_1.index)(req, res));
    (0, userRouter_1.userRoutes)(app);
    (0, myProfileRouter_1.myProfileRouter)(app);
    (0, productRouter_1.productRoutes)(app);
    (0, transactionRouter_1.transactionRoutes)(app);
    (0, promotionRouter_1.promotionRouter)(app);
    (0, deviceRouter_1.deviceRouter)(app);
    (0, statisticRouter_1.statisticRouters)(app);
};
exports.appRouterV1 = appRouterV1;
