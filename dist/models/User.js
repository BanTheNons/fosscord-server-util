"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.UserSchema = exports.RelationshipType = exports.PublicUserProjection = void 0;
const Activity_1 = require("./Activity");
const Status_1 = require("./Status");
const mongoose_1 = require("mongoose");
const Database_1 = __importDefault(require("../util/Database"));
const toBigInt_1 = __importDefault(require("../util/toBigInt"));
exports.PublicUserProjection = {
    username: true,
    discriminator: true,
    id: true,
    public_flags: true,
    avatar: true,
    accent_color: true,
    banner: true,
    bio: true,
    bot: true,
};
var RelationshipType;
(function (RelationshipType) {
    RelationshipType[RelationshipType["outgoing"] = 4] = "outgoing";
    RelationshipType[RelationshipType["incoming"] = 3] = "incoming";
    RelationshipType[RelationshipType["blocked"] = 2] = "blocked";
    RelationshipType[RelationshipType["friends"] = 1] = "friends";
})(RelationshipType = exports.RelationshipType || (exports.RelationshipType = {}));
exports.UserSchema = new mongoose_1.Schema({
    id: String,
    username: String,
    discriminator: String,
    avatar: String,
    accent_color: Number,
    banner: String,
    phone: String,
    desktop: Boolean,
    mobile: Boolean,
    premium: Boolean,
    premium_type: Number,
    bot: Boolean,
    bio: String,
    system: Boolean,
    nsfw_allowed: Boolean,
    mfa_enabled: Boolean,
    created_at: Date,
    verified: Boolean,
    disabled: Boolean,
    deleted: Boolean,
    email: String,
    flags: { type: String, get: toBigInt_1.default },
    public_flags: { type: String, get: toBigInt_1.default },
    guilds: [String],
    user_data: {
        fingerprints: [String],
        hash: String,
        valid_tokens_since: Date,
        relationships: [
            {
                id: { type: String, required: true },
                nickname: String,
                type: { type: Number },
            },
        ],
        connected_accounts: [
            {
                access_token: String,
                friend_sync: Boolean,
                id: String,
                name: String,
                revoked: Boolean,
                show_activity: Boolean,
                type: { type: String },
                verifie: Boolean,
                visibility: Number,
            },
        ],
    },
    user_settings: {
        afk_timeout: Number,
        allow_accessibility_detection: Boolean,
        animate_emoji: Boolean,
        animate_stickers: Number,
        contact_sync_enabled: Boolean,
        convert_emoticons: Boolean,
        custom_status: {
            emoji_id: String,
            emoji_name: String,
            expires_at: Number,
            text: String,
        },
        default_guilds_restricted: Boolean,
        detect_platform_accounts: Boolean,
        developer_mode: Boolean,
        disable_games_tab: Boolean,
        enable_tts_command: Boolean,
        explicit_content_filter: Number,
        friend_source_flags: { all: Boolean },
        gateway_connected: Boolean,
        gif_auto_play: Boolean,
        // every top guild is displayed as a "folder"
        guild_folders: [
            {
                color: Number,
                guild_ids: [String],
                id: Number,
                name: String,
            },
        ],
        guild_positions: [String],
        inline_attachment_media: Boolean,
        inline_embed_media: Boolean,
        locale: String,
        message_display_compact: Boolean,
        native_phone_integration_enabled: Boolean,
        render_embeds: Boolean,
        render_reactions: Boolean,
        restricted_guilds: [String],
        show_current_game: Boolean,
        status: String,
        stream_notifications_enabled: Boolean,
        theme: String,
        timezone_offset: Number,
    },
    presence: {
        status: String,
        activities: [Activity_1.ActivitySchema],
        client_status: Status_1.ClientStatus,
    },
});
// @ts-ignore
exports.UserModel = Database_1.default.model("User", exports.UserSchema, "users");
//# sourceMappingURL=User.js.map