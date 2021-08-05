"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BanModel = exports.BanSchema = void 0;
const mongoose_1 = require("mongoose");
const Database_1 = __importDefault(require("../util/Database"));
const User_1 = require("./User");
exports.BanSchema = new mongoose_1.Schema({
    user_id: { type: String, required: true },
    guild_id: { type: String, required: true },
    executor_id: { type: String, required: true },
    reason: String,
    ip: String,
});
exports.BanSchema.virtual("user", {
    ref: User_1.UserModel,
    localField: "id",
    foreignField: "user_id",
    justOne: true,
    autopopulate: { select: User_1.PublicUserProjection },
});
// @ts-ignore
exports.BanModel = Database_1.default.model("Ban", exports.BanSchema, "bans");
//# sourceMappingURL=Ban.js.map