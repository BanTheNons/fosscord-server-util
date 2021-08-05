/// <reference path="../util/MongoBigInt.d.ts" />
/// <reference path="index.d.ts" />
import { Schema, Document } from "mongoose";
export interface Webhook {
}
export declare enum WebhookType {
    Incoming = 1,
    ChannelFollower = 2
}
export interface WebhookDocument extends Document, Webhook {
    id: String;
    type: number;
    guild_id?: string;
    channel_id: string;
    name?: string;
    avatar?: string;
    token?: string;
    application_id?: string;
    user_id?: string;
    source_guild_id: string;
}
export declare const WebhookSchema: Schema<Document<any, {}>, import("mongoose").Model<any, any, {}>, undefined>;
export declare const WebhookModel: import("mongoose").Model<WebhookDocument, {}, {}>;
