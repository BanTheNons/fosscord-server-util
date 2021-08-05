/// <reference path="../util/MongoBigInt.d.ts" />
/// <reference path="index.d.ts" />
import { Schema, Document } from "mongoose";
import { User } from "./User";
import { Guild } from "./Guild";
export interface Template extends Document {
    id: string;
    code: string;
    name: string;
    description?: string;
    usage_count?: number;
    creator_id: string;
    creator: User;
    created_at: Date;
    updated_at: Date;
    source_guild_id: String;
    serialized_source_guild: Guild;
}
export declare const TemplateSchema: Schema<Document<any, {}>, import("mongoose").Model<any, any, {}>, undefined>;
export declare const TemplateModel: import("mongoose").Model<Template, {}, {}>;
