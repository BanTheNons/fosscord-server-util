/// <reference path="../util/MongoBigInt.d.ts" />
/// <reference path="index.d.ts" />
import { PublicUser, User } from "./User";
import { Schema, Document } from "mongoose";
export declare const PublicMemberProjection: {
    id: boolean;
    guild_id: boolean;
    nick: boolean;
    roles: boolean;
    joined_at: boolean;
    pending: boolean;
    deaf: boolean;
    mute: boolean;
    premium_since: boolean;
};
export interface Member {
    id: string;
    guild_id: string;
    nick?: string;
    roles: string[];
    joined_at: Date;
    premium_since?: number;
    deaf: boolean;
    mute: boolean;
    pending: boolean;
    settings: UserGuildSettings;
    read_state: Record<string, string | null>;
    user?: User;
}
export interface MemberDocument extends Member, Document {
    id: string;
}
export interface UserGuildSettings {
    channel_overrides: {
        channel_id: string;
        message_notifications: number;
        mute_config: MuteConfig;
        muted: boolean;
    }[];
    message_notifications: number;
    mobile_push: boolean;
    mute_config: MuteConfig;
    muted: boolean;
    suppress_everyone: boolean;
    suppress_roles: boolean;
    version: number;
}
export interface MuteConfig {
    end_time: number;
    selected_time_window: number;
}
export declare const MemberSchema: Schema<Document<any, {}>, import("mongoose").Model<any, any, {}>, undefined>;
export declare const MemberModel: import("mongoose").Model<MemberDocument, {}, {}>;
export interface PublicMember extends Omit<Member, "settings" | "id" | "read_state"> {
    user: PublicUser;
}
