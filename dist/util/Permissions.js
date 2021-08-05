"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPermission = exports.Permissions = void 0;
// https://github.com/discordjs/discord.js/blob/master/src/util/Permissions.js
// Apache License Version 2.0 Copyright 2015 - 2021 Amish Shah
const Member_1 = require("../models/Member");
const Channel_1 = require("../models/Channel");
const Role_1 = require("../models/Role");
const BitField_1 = require("./BitField");
const Guild_1 = require("../models/Guild");
// TODO: check role hierarchy permission
var HTTPError;
try {
    HTTPError = require("lambert-server").HTTPError;
}
catch (e) {
    HTTPError = Error;
}
const CUSTOM_PERMISSION_OFFSET = 1n << 48n; // 16 free custom permission bits, and 16 for discord to add new ones
class Permissions extends BitField_1.BitField {
    constructor() {
        super(...arguments);
        this.cache = {};
    }
    any(permission, checkAdmin = true) {
        return (checkAdmin && super.any(Permissions.FLAGS.ADMINISTRATOR)) || super.any(permission);
    }
    /**
     * Checks whether the bitfield has a permission, or multiple permissions.
     */
    has(permission, checkAdmin = true) {
        return (checkAdmin && super.has(Permissions.FLAGS.ADMINISTRATOR)) || super.has(permission);
    }
    /**
     * Checks whether the bitfield has a permission, or multiple permissions, but throws an Error if user fails to match auth criteria.
     */
    hasThrow(permission) {
        if (this.has(permission) && this.has("VIEW_CHANNEL"))
            return true;
        // @ts-ignore
        throw new HTTPError(`You are missing the following permissions ${permission}`, 403);
    }
    static channelPermission(overwrites, init) {
        // TODO: do not deny any permissions if admin
        return overwrites.reduce((permission, overwrite) => {
            // apply disallowed permission
            // * permission: current calculated permission (e.g. 010)
            // * deny contains all denied permissions (e.g. 011)
            // * allow contains all explicitly allowed permisions (e.g. 100)
            return (permission & ~BigInt(overwrite.deny)) | BigInt(overwrite.allow);
            // ~ operator inverts deny (e.g. 011 -> 100)
            // & operator only allows 1 for both ~deny and permission (e.g. 010 & 100 -> 000)
            // | operators adds both together (e.g. 000 + 100 -> 100)
        }, init || 0n);
    }
    static rolePermission(roles) {
        // adds all permissions of all roles together (Bit OR)
        return roles.reduce((permission, role) => permission | BigInt(role.permissions), 0n);
    }
    static finalPermission({ user, guild, channel, }) {
        if (user.id === "0")
            return new Permissions("ADMINISTRATOR"); // system user id
        let roles = guild.roles.filter((x) => user.roles.includes(x.id));
        let permission = Permissions.rolePermission(roles);
        if (channel?.overwrites) {
            let overwrites = channel.overwrites.filter((x) => {
                if (x.type === 0 && user.roles.includes(x.id))
                    return true;
                if (x.type === 1 && x.id == user.id)
                    return true;
                return false;
            });
            permission = Permissions.channelPermission(overwrites, permission);
        }
        if (channel?.recipient_ids) {
            if (channel?.owner_id === user.id)
                return new Permissions("ADMINISTRATOR");
            if (channel.recipient_ids.includes(user.id)) {
                // Default dm permissions
                return new Permissions([
                    "VIEW_CHANNEL",
                    "SEND_MESSAGES",
                    "STREAM",
                    "ADD_REACTIONS",
                    "EMBED_LINKS",
                    "ATTACH_FILES",
                    "READ_MESSAGE_HISTORY",
                    "MENTION_EVERYONE",
                    "USE_EXTERNAL_EMOJIS",
                    "CONNECT",
                    "SPEAK",
                    "MANAGE_CHANNELS",
                ]);
            }
            return new Permissions();
        }
        return permission;
    }
}
exports.Permissions = Permissions;
Permissions.FLAGS = {
    CREATE_INSTANT_INVITE: 1n << 0n,
    KICK_MEMBERS: 1n << 1n,
    BAN_MEMBERS: 1n << 2n,
    ADMINISTRATOR: 1n << 3n,
    MANAGE_CHANNELS: 1n << 4n,
    MANAGE_GUILD: 1n << 5n,
    ADD_REACTIONS: 1n << 6n,
    VIEW_AUDIT_LOG: 1n << 7n,
    PRIORITY_SPEAKER: 1n << 8n,
    STREAM: 1n << 9n,
    VIEW_CHANNEL: 1n << 10n,
    SEND_MESSAGES: 1n << 11n,
    SEND_TTS_MESSAGES: 1n << 12n,
    MANAGE_MESSAGES: 1n << 13n,
    EMBED_LINKS: 1n << 14n,
    ATTACH_FILES: 1n << 15n,
    READ_MESSAGE_HISTORY: 1n << 16n,
    MENTION_EVERYONE: 1n << 17n,
    USE_EXTERNAL_EMOJIS: 1n << 18n,
    VIEW_GUILD_INSIGHTS: 1n << 19n,
    CONNECT: 1n << 20n,
    SPEAK: 1n << 21n,
    MUTE_MEMBERS: 1n << 22n,
    DEAFEN_MEMBERS: 1n << 23n,
    MOVE_MEMBERS: 1n << 24n,
    USE_VAD: 1n << 25n,
    CHANGE_NICKNAME: 1n << 26n,
    MANAGE_NICKNAMES: 1n << 27n,
    MANAGE_ROLES: 1n << 28n,
    MANAGE_WEBHOOKS: 1n << 29n,
    MANAGE_EMOJIS: 1n << 30n,
};
async function getPermission(user_id, guild_id, channel_id, cache = {}) {
    var { channel, member, guild, roles } = cache;
    if (!user_id)
        throw new HTTPError("User not found");
    if (channel_id && !channel) {
        channel = await Channel_1.ChannelModel.findOne({ id: channel_id }, { permission_overwrites: true, recipient_ids: true, owner_id: true, guild_id: true }).exec();
        if (!channel)
            throw new HTTPError("Channel not found", 404);
        if (channel.guild_id)
            guild_id = channel.guild_id;
    }
    if (guild_id) {
        if (!guild)
            guild = await Guild_1.GuildModel.findOne({ id: guild_id }, { owner_id: true }).exec();
        if (!guild)
            throw new HTTPError("Guild not found");
        if (guild.owner_id === user_id)
            return new Permissions(Permissions.FLAGS.ADMINISTRATOR);
        if (!member)
            member = await Member_1.MemberModel.findOne({ guild_id, id: user_id }, "roles").exec();
        if (!member)
            throw new HTTPError("Member not found");
        if (!roles)
            roles = await Role_1.RoleModel.find({ guild_id, id: { $in: member.roles } }).exec();
    }
    var permission = Permissions.finalPermission({
        user: {
            id: user_id,
            roles: member?.roles || [],
        },
        guild: {
            roles: roles || [],
        },
        channel: {
            overwrites: channel?.permission_overwrites,
            owner_id: channel?.owner_id,
            recipient_ids: channel?.recipient_ids,
        },
    });
    const obj = new Permissions(permission);
    // pass cache to permission for possible future getPermission calls
    obj.cache = { guild, member, channel, roles };
    return obj;
}
exports.getPermission = getPermission;
//# sourceMappingURL=Permissions.js.map