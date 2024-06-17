"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deviceRouter = void 0;
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const express_1 = __importDefault(require("express"));
const devices_1 = require("../../controllers/devices");
const deviceRouter = (app) => {
    const router = express_1.default.Router();
    // app.use('/api/v1/devices', middleware.useAuthorization, router)
    app.use('/api/v1/devices', router);
    router.get('/', async (req, res) => await devices_1.DeviceController.findAll(req, res));
    router.get('/detail/:deviceId', async (req, res) => await devices_1.DeviceController.findDetail(req, res));
    router.post('/', async (req, res) => await devices_1.DeviceController.create(req, res));
    router.patch('/', async (req, res) => await devices_1.DeviceController.update(req, res));
    router.delete('/', async (req, res) => await devices_1.DeviceController.remove(req, res));
};
exports.deviceRouter = deviceRouter;
