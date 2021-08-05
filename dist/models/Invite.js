"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InviteModel = exports.InviteSchema = void 0;
const mongoose_1 = require("mongoose");
const Database_1 = __importDefault(require("../util/Database"));
const Channel_1 = require("./Channel");
const User_1 = require("./User");
const Guild_1 = require("./Guild");
exports.InviteSchema = new mongoose_1.Schema({
    code: String,
    temporary: Boolean,
    uses: Number,
    max_uses: Number,
    max_age: Number,
    created_at: Date,
    expires_at: Date,
    guild_id: String,
    channel_id: String,
    inviter_id: String,
    // ? What is this?
    target_user_id: String,
    target_user_type: Number,
});
exports.InviteSchema.virtual("channel", {
    ref: Channel_1.ChannelModel,
    localField: "channel_id",
    foreignField: "id",
    justOne: true,
    autopopulate: {
        select: {
            id: true,
            name: true,
            type: true,
        },
    },
});
exports.InviteSchema.virtual("inviter", {
    ref: User_1.UserModel,
    localField: "inviter_id",
    foreignField: "id",
    justOne: true,
    autopopulate: {
        select: {
            id: true,
            username: true,
            avatar: true,
            discriminater: true,
            public_flags: true,
        },
    },
});
exports.InviteSchema.virtual("guild", {
    ref: Guild_1.GuildModel,
    localField: "guild_id",
    foreignField: "id",
    justOne: true,
    autopopulate: {
        select: {
            id: true,
            name: true,
            splash: true,
            banner: true,
            description: true,
            icon: true,
            features: true,
            verification_level: true,
            vanity_url_code: true,
            welcome_screen: true,
            nsfw: true,
        },
    },
});
// @ts-ignore
exports.InviteModel = Database_1.default.model("Invite", exports.InviteSchema, "invites");
//# sourceMappingURL=Invite.js.map