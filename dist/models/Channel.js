"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelType = exports.ChannelPermissionOverwriteType = exports.ChannelModel = exports.ChannelSchema = void 0;
const mongoose_1 = require("mongoose");
const Database_1 = __importDefault(require("../util/Database"));
const toBigInt_1 = __importDefault(require("../util/toBigInt"));
const User_1 = require("./User");
exports.ChannelSchema = new mongoose_1.Schema({
    id: String,
    created_at: { type: mongoose_1.Schema.Types.Date, required: true },
    name: String,
    type: { type: Number, required: true },
    guild_id: String,
    owner_id: String,
    parent_id: String,
    recipient_ids: [String],
    position: Number,
    last_message_id: String,
    last_pin_timestamp: Date,
    nsfw: Boolean,
    rate_limit_per_user: Number,
    topic: String,
    permission_overwrites: [
        {
            allow: { type: String, get: toBigInt_1.default },
            deny: { type: String, get: toBigInt_1.default },
            id: String,
            type: { type: Number },
        },
    ],
});
exports.ChannelSchema.virtual("recipients", {
    ref: User_1.UserModel,
    localField: "recipient_ids",
    foreignField: "id",
    justOne: false,
    autopopulate: true,
});
exports.ChannelSchema.set("removeResponse", ["recipient_ids"]);
// @ts-ignore
exports.ChannelModel = Database_1.default.model("Channel", exports.ChannelSchema, "channels");
var ChannelPermissionOverwriteType;
(function (ChannelPermissionOverwriteType) {
    ChannelPermissionOverwriteType[ChannelPermissionOverwriteType["role"] = 0] = "role";
    ChannelPermissionOverwriteType[ChannelPermissionOverwriteType["member"] = 1] = "member";
})(ChannelPermissionOverwriteType = exports.ChannelPermissionOverwriteType || (exports.ChannelPermissionOverwriteType = {}));
var ChannelType;
(function (ChannelType) {
    ChannelType[ChannelType["GUILD_TEXT"] = 0] = "GUILD_TEXT";
    ChannelType[ChannelType["DM"] = 1] = "DM";
    ChannelType[ChannelType["GUILD_VOICE"] = 2] = "GUILD_VOICE";
    ChannelType[ChannelType["GROUP_DM"] = 3] = "GROUP_DM";
    ChannelType[ChannelType["GUILD_CATEGORY"] = 4] = "GUILD_CATEGORY";
    ChannelType[ChannelType["GUILD_NEWS"] = 5] = "GUILD_NEWS";
    ChannelType[ChannelType["GUILD_STORE"] = 6] = "GUILD_STORE";
})(ChannelType = exports.ChannelType || (exports.ChannelType = {}));
//# sourceMappingURL=Channel.js.map