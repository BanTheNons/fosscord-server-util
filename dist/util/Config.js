"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigModel = exports.ConfigSchema = exports.DefaultOptions = void 0;
const mongoose_1 = require("mongoose");
require("missing-native-js-functions");
const Database_1 = __importStar(require("./Database"));
const Snowflake_1 = require("./Snowflake");
const crypto_1 = __importDefault(require("crypto"));
var Config = new Database_1.MongooseCache(Database_1.default.collection("config"), [], { onlyEvents: false, array: false });
exports.default = {
    init: async function init(defaultOpts = exports.DefaultOptions) {
        await Config.init();
        return this.set((Config.data || {}).merge(defaultOpts));
    },
    get: function get() {
        return Config.data;
    },
    set: function set(val) {
        return Database_1.default.collection("config").updateOne({}, { $set: val }, { upsert: true });
    },
};
exports.DefaultOptions = {
    gateway: {
        endpoint: null,
    },
    cdn: {
        endpoint: null,
    },
    general: {
        instance_id: Snowflake_1.Snowflake.generate(),
    },
    permissions: {
        user: {
            createGuilds: true,
        },
    },
    limits: {
        user: {
            maxGuilds: 100,
            maxUsername: 32,
            maxFriends: 1000,
        },
        guild: {
            maxRoles: 250,
            maxMembers: 250000,
            maxChannels: 500,
            maxChannelsInCategory: 50,
            hideOfflineMember: 1000,
        },
        message: {
            maxCharacters: 2000,
            maxTTSCharacters: 200,
            maxReactions: 20,
            maxAttachmentSize: 8388608,
            maxBulkDelete: 100,
        },
        channel: {
            maxPins: 50,
            maxTopic: 1024,
        },
        rate: {
            ip: {
                enabled: true,
                count: 1000,
                timespan: 1000 * 60 * 10,
            },
            routes: {},
        },
    },
    security: {
        requestSignature: crypto_1.default.randomBytes(32).toString("base64"),
        jwtSecret: crypto_1.default.randomBytes(256).toString("base64"),
        forwadedFor: null,
        // forwadedFor: "X-Forwarded-For" // nginx/reverse proxy
        // forwadedFor: "CF-Connecting-IP" // cloudflare:
        captcha: {
            enabled: false,
            service: null,
            sitekey: null,
            secret: null,
        },
        ipdataApiKey: "eca677b284b3bac29eb72f5e496aa9047f26543605efe99ff2ce35c9",
    },
    login: {
        requireCaptcha: false,
    },
    register: {
        email: {
            necessary: true,
            allowlist: false,
            blocklist: true,
            domains: [],
            // domains: fs.readFileSync(__dirname + "/blockedEmailDomains.txt", { encoding: "utf8" }).split("\n"),
            emailWhitelistEnabled: false,
            whitelistedEmails: [],
        },
        dateOfBirth: {
            necessary: true,
            minimum: 13,
        },
        requireInvite: false,
        requireCaptcha: true,
        allowNewRegistration: true,
        allowMultipleAccounts: true,
        blockProxies: true,
        password: {
            minLength: 8,
            minNumbers: 2,
            minUpperCase: 2,
            minSymbols: 0,
        },
    },
    regions: {
        default: "fosscord",
        available: [
            { id: "fosscord", name: "Fosscord", vip: false, custom: false, deprecated: false, optimal: false },
        ]
    },
    kafka: {
        brokers: null
    }
};
exports.ConfigSchema = new mongoose_1.Schema({}, { strict: false });
exports.ConfigModel = mongoose_1.model("Config", exports.ConfigSchema, "config");
//# sourceMappingURL=Config.js.map