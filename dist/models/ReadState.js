"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadStateModel = exports.ReadStateSchema = void 0;
const mongoose_1 = require("mongoose");
const Database_1 = __importDefault(require("../util/Database"));
exports.ReadStateSchema = new mongoose_1.Schema({
    message_id: String,
    channel_id: String,
    user_id: String,
    last_message_id: String,
    last_pin_timestamp: Date,
    mention_count: Number,
    manual: Boolean,
});
// @ts-ignore
exports.ReadStateModel = Database_1.default.model("ReadState", exports.ReadStateSchema, "readstates");
//# sourceMappingURL=ReadState.js.map