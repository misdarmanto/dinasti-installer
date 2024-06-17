"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const create_1 = require("./create");
const find_1 = require("./find");
const remove_1 = require("./remove");
const update_1 = require("./update");
exports.ProductController = {
    create: create_1.createProduct,
    findAll: find_1.findAllProducts,
    findOne: find_1.findDetailProduct,
    remove: remove_1.removeProduct,
    update: update_1.updateProduct
};
