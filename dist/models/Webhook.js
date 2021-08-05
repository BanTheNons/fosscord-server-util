"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookModel = exports.WebhookSchema = exports.WebhookType = void 0;
const mongoose_1 = require("mongoose");
const Database_1 = __importDefault(require("../util/Database"));
const Channel_1 = require("./Channel");
const Guild_1 = require("./Guild");
var WebhookType;
(function (WebhookType) {
    WebhookType[WebhookType["Incoming"] = 1] = "Incoming";
    WebhookType[WebhookType["ChannelFollower"] = 2] = "ChannelFollower";
})(WebhookType = exports.WebhookType || (exports.WebhookType = {}));
exports.WebhookSchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    type: { type: Number, required: true },
    guild_id: String,
    channel_id: String,
    name: String,
    avatar: String,
    token: String,
    application_id: String,
    user_id: String,
    source_guild_id: String,
    source_channel_id: String,
});
exports.WebhookSchema.virtual("source_guild", {
    ref: Guild_1.GuildModel,
    localField: "id",
    foreignField: "source_guild_id",
    justOne: true,
    autopopulate: {
        select: {
            icon: true,
            id: true,
            name: true,
        },
    },
});
exports.WebhookSchema.virtual("source_channel", {
    ref: Channel_1.ChannelModel,
    localField: "id",
    foreignField: "source_channel_id",
    justOne: true,
    autopopulate: {
        select: {
            id: true,
            name: true,
        },
    },
});
exports.WebhookSchema.virtual("source_channel", {
    ref: Channel_1.ChannelModel,
    localField: "id",
    foreignField: "source_channel_id",
    justOne: true,
    autopopulate: {
        select: {
            id: true,
            name: true,
        },
    },
});
exports.WebhookSchema.set("removeResponse", ["source_channel_id", "source_guild_id"]);
// @ts-ignore
exports.WebhookModel = Database_1.default.model("Webhook", exports.WebhookSchema, "webhooks");
//# sourceMappingURL=Webhook.js.map