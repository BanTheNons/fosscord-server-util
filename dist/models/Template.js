"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateModel = exports.TemplateSchema = void 0;
const mongoose_1 = require("mongoose");
const Database_1 = __importDefault(require("../util/Database"));
const User_1 = require("./User");
const Guild_1 = require("./Guild");
exports.TemplateSchema = new mongoose_1.Schema({
    id: String,
    code: String,
    name: String,
    description: String,
    usage_count: Number,
    creator_id: String,
    created_at: Date,
    updated_at: Date,
    source_guild_id: String,
});
exports.TemplateSchema.virtual("creator", {
    ref: User_1.UserModel,
    localField: "creator_id",
    foreignField: "id",
    justOne: false,
    autopopulate: {
        select: User_1.PublicUserProjection
    },
});
exports.TemplateSchema.virtual("serialized_source_guild", {
    ref: Guild_1.GuildModel,
    localField: "source_guild_id",
    foreignField: "id",
    justOne: false,
    autopopulate: true,
});
// @ts-ignore
exports.TemplateModel = Database_1.default.model("Template", exports.TemplateSchema, "templates");
//# sourceMappingURL=Template.js.map