/// <reference path="../util/MongoBigInt.d.ts" />
/// <reference path="index.d.ts" />
import { Schema, Document } from "mongoose";
export interface Invite {
    code: string;
    temporary: boolean;
    uses: number;
    max_uses: number;
    max_age: number;
    created_at: Date;
    expires_at: Date;
    guild_id: string;
    channel_id: string;
    inviter_id: string;
    target_user_id?: string;
    target_user_type?: number;
}
export interface InviteDocument extends Invite, Document {
}
export declare const InviteSchema: Schema<Document<any, {}>, import("mongoose").Model<any, any, {}>, undefined>;
export declare const InviteModel: import("mongoose").Model<InviteDocument, {}, {}>;
