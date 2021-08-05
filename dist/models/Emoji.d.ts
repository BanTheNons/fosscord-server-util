/// <reference path="../util/MongoBigInt.d.ts" />
/// <reference path="index.d.ts" />
import { Schema, Document } from "mongoose";
export interface Emoji extends Document {
    id: string;
    animated: boolean;
    available: boolean;
    guild_id: string;
    managed: boolean;
    name: string;
    require_colons: boolean;
    url: string;
    roles: string[];
}
export declare const EmojiSchema: Schema<Document<any, {}>, import("mongoose").Model<any, any, {}>, undefined>;
export declare const EmojiModel: import("mongoose").Model<Emoji, {}, {}>;
