"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceController = void 0;
const create_1 = require("./create");
const find_1 = require("./find");
const remove_1 = require("./remove");
const update_1 = require("./update");
exports.DeviceController = {
    create: create_1.createDevice,
    findAll: find_1.findAllDevice,
    findDetail: find_1.findDetailDevice,
    remove: remove_1.removeDevice,
    update: update_1.updateDevice
};
