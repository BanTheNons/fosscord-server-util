"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberModel = exports.MemberSchema = exports.PublicMemberProjection = void 0;
const User_1 = require("./User");
const mongoose_1 = require("mongoose");
const Database_1 = __importDefault(require("../util/Database"));
exports.PublicMemberProjection = {
    id: true,
    guild_id: true,
    nick: true,
    roles: true,
    joined_at: true,
    pending: true,
    deaf: true,
    mute: true,
    premium_since: true,
};
const MuteConfig = {
    end_time: Number,
    selected_time_window: Number,
};
exports.MemberSchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    guild_id: String,
    nick: String,
    roles: [String],
    joined_at: Date,
    premium_since: Number,
    deaf: Boolean,
    mute: Boolean,
    pending: Boolean,
    read_state: Object,
    settings: {
        channel_overrides: [
            {
                channel_id: String,
                message_notifications: Number,
                mute_config: MuteConfig,
                muted: Boolean,
            },
        ],
        message_notifications: Number,
        mobile_push: Boolean,
        mute_config: MuteConfig,
        muted: Boolean,
        suppress_everyone: Boolean,
        suppress_roles: Boolean,
        version: Number,
    },
});
exports.MemberSchema.virtual("user", {
    ref: User_1.UserModel,
    localField: "id",
    foreignField: "id",
    justOne: true,
    autopopulate: {
        select: User_1.PublicUserProjection,
    },
});
// @ts-ignore
exports.MemberModel = Database_1.default.model("Member", exports.MemberSchema, "members");
//# sourceMappingURL=Member.js.map