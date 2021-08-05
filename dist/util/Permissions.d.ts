import { MemberDocument } from "../models/Member";
import { ChannelDocument } from "../models/Channel";
import { ChannelPermissionOverwrite } from "../models/Channel";
import { Role, RoleDocument } from "../models/Role";
import { BitField } from "./BitField";
import { GuildDocument } from "../models/Guild";
export declare type PermissionResolvable = bigint | number | Permissions | PermissionResolvable[] | PermissionString;
declare type PermissionString = "CREATE_INSTANT_INVITE" | "KICK_MEMBERS" | "BAN_MEMBERS" | "ADMINISTRATOR" | "MANAGE_CHANNELS" | "MANAGE_GUILD" | "ADD_REACTIONS" | "VIEW_AUDIT_LOG" | "PRIORITY_SPEAKER" | "STREAM" | "VIEW_CHANNEL" | "SEND_MESSAGES" | "SEND_TTS_MESSAGES" | "MANAGE_MESSAGES" | "EMBED_LINKS" | "ATTACH_FILES" | "READ_MESSAGE_HISTORY" | "MENTION_EVERYONE" | "USE_EXTERNAL_EMOJIS" | "VIEW_GUILD_INSIGHTS" | "CONNECT" | "SPEAK" | "MUTE_MEMBERS" | "DEAFEN_MEMBERS" | "MOVE_MEMBERS" | "USE_VAD" | "CHANGE_NICKNAME" | "MANAGE_NICKNAMES" | "MANAGE_ROLES" | "MANAGE_WEBHOOKS" | "MANAGE_EMOJIS";
export declare class Permissions extends BitField {
    cache: PermissionCache;
    static FLAGS: {
        CREATE_INSTANT_INVITE: bigint;
        KICK_MEMBERS: bigint;
        BAN_MEMBERS: bigint;
        ADMINISTRATOR: bigint;
        MANAGE_CHANNELS: bigint;
        MANAGE_GUILD: bigint;
        ADD_REACTIONS: bigint;
        VIEW_AUDIT_LOG: bigint;
        PRIORITY_SPEAKER: bigint;
        STREAM: bigint;
        VIEW_CHANNEL: bigint;
        SEND_MESSAGES: bigint;
        SEND_TTS_MESSAGES: bigint;
        MANAGE_MESSAGES: bigint;
        EMBED_LINKS: bigint;
        ATTACH_FILES: bigint;
        READ_MESSAGE_HISTORY: bigint;
        MENTION_EVERYONE: bigint;
        USE_EXTERNAL_EMOJIS: bigint;
        VIEW_GUILD_INSIGHTS: bigint;
        CONNECT: bigint;
        SPEAK: bigint;
        MUTE_MEMBERS: bigint;
        DEAFEN_MEMBERS: bigint;
        MOVE_MEMBERS: bigint;
        USE_VAD: bigint;
        CHANGE_NICKNAME: bigint;
        MANAGE_NICKNAMES: bigint;
        MANAGE_ROLES: bigint;
        MANAGE_WEBHOOKS: bigint;
        MANAGE_EMOJIS: bigint;
    };
    any(permission: PermissionResolvable, checkAdmin?: boolean): boolean;
    /**
     * Checks whether the bitfield has a permission, or multiple permissions.
     */
    has(permission: PermissionResolvable, checkAdmin?: boolean): boolean;
    /**
     * Checks whether the bitfield has a permission, or multiple permissions, but throws an Error if user fails to match auth criteria.
     */
    hasThrow(permission: PermissionResolvable): boolean;
    static channelPermission(overwrites: ChannelPermissionOverwrite[], init?: bigint): bigint;
    static rolePermission(roles: Role[]): bigint;
    static finalPermission({ user, guild, channel, }: {
        user: {
            id: string;
            roles: string[];
        };
        guild: {
            roles: Role[];
        };
        channel?: {
            overwrites?: ChannelPermissionOverwrite[];
            recipient_ids?: string[] | null;
            owner_id?: string;
        };
    }): bigint | Permissions;
}
export declare type PermissionCache = {
    channel?: ChannelDocument | null;
    member?: MemberDocument | null;
    guild?: GuildDocument | null;
    roles?: RoleDocument[] | null;
};
export declare function getPermission(user_id?: string, guild_id?: string, channel_id?: string, cache?: PermissionCache): Promise<Permissions>;
export {};
