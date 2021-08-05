/// <reference path="../util/MongoBigInt.d.ts" />
/// <reference path="index.d.ts" />
import { Schema, Document } from "mongoose";
export interface ReadState extends Document {
    message_id: string;
    channel_id: string;
    user_id: string;
    last_message_id?: string;
    last_pin_timestamp?: Date;
    mention_count: number;
    manual: boolean;
}
export declare const ReadStateSchema: Schema<Document<any, {}>, import("mongoose").Model<any, any, {}>, undefined>;
export declare const ReadStateModel: import("mongoose").Model<ReadState, {}, {}>;
