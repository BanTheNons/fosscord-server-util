"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkToken = void 0;
const Constants_1 = require("./Constants");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("../models");
function checkToken(token, jwtSecret) {
    return new Promise((res, rej) => {
        token = token.replace("Bot ", ""); // TODO: proper bot support
        jsonwebtoken_1.default.verify(token, jwtSecret, Constants_1.JWTOptions, async (err, decoded) => {
            if (err || !decoded)
                return rej("Invalid Token");
            const user = await models_1.UserModel.findOne({ id: decoded.id }, { "user_data.valid_tokens_since": true, bot: true }).exec();
            if (!user)
                return rej("Invalid Token");
            // we need to round it to seconds as it saved as seconds in jwt iat and valid_tokens_since is stored in milliseconds
            if (decoded.iat * 1000 < user.user_data.valid_tokens_since.setSeconds(0, 0))
                return rej("Invalid Token");
            if (user.disabled)
                return rej("User disabled");
            if (user.deleted)
                return rej("User not found");
            return res({ decoded, user });
        });
    });
}
exports.checkToken = checkToken;
//# sourceMappingURL=checkToken.js.map