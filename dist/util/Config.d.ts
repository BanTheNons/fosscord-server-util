/// <reference path="MongoBigInt.d.ts" />
/// <reference path="../models/index.d.ts" />
import { Schema, Document } from "mongoose";
import "missing-native-js-functions";
declare const _default: {
    init: (defaultOpts?: any) => Promise<import("mongodb").UpdateWriteOpResult>;
    get: () => DefaultOptions;
    set: (val: any) => Promise<import("mongodb").UpdateWriteOpResult>;
};
export default _default;
export interface RateLimitOptions {
    count: number;
    timespan: number;
}
export interface Region {
    id: string;
    name: string;
    vip: boolean;
    custom: boolean;
    deprecated: boolean;
    optimal: boolean;
}
export interface KafkaBroker {
    ip: string;
    port: number;
}
export interface DefaultOptions {
    gateway: {
        endpoint: string | null;
    };
    cdn: {
        endpoint: string | null;
    };
    general: {
        instance_id: string;
    };
    permissions: {
        user: {
            createGuilds: boolean;
        };
    };
    limits: {
        user: {
            maxGuilds: number;
            maxUsername: number;
            maxFriends: number;
        };
        guild: {
            maxRoles: number;
            maxMembers: number;
            maxChannels: number;
            maxChannelsInCategory: number;
            hideOfflineMember: number;
        };
        message: {
            maxCharacters: number;
            maxTTSCharacters: number;
            maxReactions: number;
            maxAttachmentSize: number;
            maxBulkDelete: number;
        };
        channel: {
            maxPins: number;
            maxTopic: number;
        };
        rate: {
            ip: {
                enabled: boolean;
                count: number;
                timespan: number;
            };
            routes: {
                auth?: {
                    login?: RateLimitOptions;
                    register?: RateLimitOptions;
                };
            };
        };
    };
    security: {
        requestSignature: string;
        jwtSecret: string;
        forwadedFor: string | null;
        captcha: {
            enabled: boolean;
            service: "recaptcha" | "hcaptcha" | null;
            sitekey: string | null;
            secret: string | null;
        };
        ipdataApiKey: string | null;
    };
    login: {
        requireCaptcha: boolean;
    };
    register: {
        email: {
            necessary: boolean;
            allowlist: boolean;
            blocklist: boolean;
            domains: string[];
            emailWhitelistEnabled: boolean;
            whitelistedEmails: string[];
        };
        dateOfBirth: {
            necessary: boolean;
            minimum: number;
        };
        requireCaptcha: boolean;
        requireInvite: boolean;
        allowNewRegistration: boolean;
        allowMultipleAccounts: boolean;
        blockProxies: boolean;
        password: {
            minLength: number;
            minNumbers: number;
            minUpperCase: number;
            minSymbols: number;
        };
    };
    regions: {
        default: string;
        available: Region[];
    };
    kafka: {
        brokers: KafkaBroker[] | null;
    };
}
export declare const DefaultOptions: DefaultOptions;
export declare const ConfigSchema: Schema<Document<any, {}>, import("mongoose").Model<any, any, {}>, undefined>;
export interface DefaultOptionsDocument extends DefaultOptions, Document {
}
export declare const ConfigModel: import("mongoose").Model<DefaultOptionsDocument, {}, {}>;
