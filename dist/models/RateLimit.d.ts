/// <reference path="../util/MongoBigInt.d.ts" />
/// <reference path="index.d.ts" />
import { Schema, Document } from "mongoose";
export interface Bucket {
    id: "global" | "error" | string;
    user_id: string;
    hits: number;
    blocked: boolean;
    expires_at: Date;
}
export interface BucketDocument extends Bucket, Document {
    id: string;
}
export declare const BucketSchema: Schema<Document<any, {}>, import("mongoose").Model<any, any, {}>, undefined>;
export declare const BucketModel: import("mongoose").Model<BucketDocument, {}, {}>;
