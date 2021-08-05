"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BucketModel = exports.BucketSchema = void 0;
const mongoose_1 = require("mongoose");
const Database_1 = __importDefault(require("../util/Database"));
exports.BucketSchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    user_id: { type: String, required: true },
    hits: { type: Number, required: true },
    blocked: { type: Boolean, required: true },
    expires_at: { type: Date, required: true },
});
// @ts-ignore
exports.BucketModel = Database_1.default.model("Bucket", exports.BucketSchema, "ratelimits");
//# sourceMappingURL=RateLimit.js.map