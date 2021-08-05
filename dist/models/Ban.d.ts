/// <reference path="../util/MongoBigInt.d.ts" />
/// <reference path="index.d.ts" />
import { Schema, Document } from "mongoose";
export interface Ban extends Document {
    user_id: string;
    guild_id: string;
    executor_id: string;
    ip: string;
    reason?: string;
}
export declare const BanSchema: Schema<Document<any, {}>, import("mongoose").Model<any, any, {}>, undefined>;
export declare const BanModel: import("mongoose").Model<Ban, {}, {}>;
