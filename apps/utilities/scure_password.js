"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = void 0;
/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const configs_1 = require("../configs");
function hashPassword(password) {
    return require('crypto')
        .createHash('sha1')
        .update(password + configs_1.CONFIG.secret.passwordEncryption)
        .digest('hex');
}
exports.hashPassword = hashPassword;
