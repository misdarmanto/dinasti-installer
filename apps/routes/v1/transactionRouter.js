"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionRoutes = void 0;
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const express_1 = __importDefault(require("express"));
const transactions_1 = require("../../controllers/transactions");
const transactionRoutes = (app) => {
    const router = express_1.default.Router();
    // app.use('/api/v1/transactions', middleware.useAuthorization, router)
    app.use('/api/v1/transactions', router);
    router.get('/', async (req, res) => await transactions_1.TransactionController.findAll(req, res));
    router.get('/detail/:transactionId', async (req, res) => await transactions_1.TransactionController.findOne(req, res));
    router.post('/', async (req, res) => await transactions_1.TransactionController.create(req, res));
    router.patch('/', async (req, res) => await transactions_1.TransactionController.update(req, res));
    router.delete('/', async (req, res) => await transactions_1.TransactionController.remove(req, res));
};
exports.transactionRoutes = transactionRoutes;
