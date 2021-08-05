import { Document } from "mongoose";
declare type UpdateWithAggregationPipeline = UpdateAggregationStage[];
declare type UpdateAggregationStage = {
    $addFields: any;
} | {
    $set: any;
} | {
    $project: any;
} | {
    $unset: any;
} | {
    $replaceRoot: any;
} | {
    $replaceWith: any;
};
declare type EnforceDocument<T, TMethods> = T extends Document ? T : T & Document & TMethods;
declare module "mongoose" {
    interface Model<T, TQueryHelpers = {}, TMethods = {}> {
        findOne(filter?: FilterQuery<T>, projection?: any | null, options?: QueryOptions | null, callback?: (err: CallbackError, doc: EnforceDocument<T, TMethods>) => void): QueryWithHelpers<EnforceDocument<T, TMethods>, EnforceDocument<T, TMethods>, TQueryHelpers>;
        findOneAndUpdate(filter?: FilterQuery<T>, update?: UpdateQuery<T> | UpdateWithAggregationPipeline, options?: QueryOptions | null, callback?: (err: any, doc: EnforceDocument<T, TMethods> | null, res: any) => void): QueryWithHelpers<EnforceDocument<T, TMethods>, EnforceDocument<T, TMethods>, TQueryHelpers>;
    }
}
export * from "./Activity";
export * from "./Application";
export * from "./Ban";
export * from "./Channel";
export * from "./Emoji";
export * from "./Event";
export * from "./Template";
export * from "./Guild";
export * from "./Invite";
export * from "./Interaction";
export * from "./Member";
export * from "./Message";
export * from "./Status";
export * from "./Role";
export * from "./User";
export * from "./VoiceState";
export * from "./ReadState";
export * from "./RateLimit";
