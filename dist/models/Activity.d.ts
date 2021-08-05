import { User } from "..";
import { ClientStatus, Status } from "./Status";
import toBigInt from "../util/toBigInt";
export interface Presence {
    user: User;
    guild_id?: string;
    status: Status;
    activities: Activity[];
    client_status: ClientStatus;
}
export interface Activity {
    name: string;
    type: ActivityType;
    url?: string;
    created_at?: Date;
    timestamps?: {
        start?: number;
        end?: number;
    }[];
    application_id?: string;
    details?: string;
    state?: string;
    emoji?: {
        name: string;
        id?: string;
        amimated?: boolean;
    };
    party?: {
        id?: string;
        size?: [number, number];
    };
    assets?: {
        large_image?: string;
        large_text?: string;
        small_image?: string;
        small_text?: string;
    };
    secrets?: {
        join?: string;
        spectate?: string;
        match?: string;
    };
    instance?: boolean;
    flags?: bigint;
}
export declare const ActivitySchema: {
    name: {
        type: StringConstructor;
        required: boolean;
    };
    type: {
        type: NumberConstructor;
        required: boolean;
    };
    url: StringConstructor;
    created_at: DateConstructor;
    timestamps: {
        start: NumberConstructor;
        end: NumberConstructor;
    }[];
    application_id: StringConstructor;
    details: StringConstructor;
    state: StringConstructor;
    emoji: {
        name: StringConstructor;
        id: StringConstructor;
        amimated: BooleanConstructor;
    };
    party: {
        id: StringConstructor;
        size: NumberConstructor[];
    };
    assets: {
        large_image: StringConstructor;
        large_text: StringConstructor;
        small_image: StringConstructor;
        small_text: StringConstructor;
    };
    secrets: {
        join: StringConstructor;
        spectate: StringConstructor;
        match: StringConstructor;
    };
    instance: BooleanConstructor;
    flags: {
        type: StringConstructor;
        get: typeof toBigInt;
    };
};
export declare const ActivityBodySchema: {
    name: StringConstructor;
    type: NumberConstructor;
    $url: StringConstructor;
    $created_at: DateConstructor;
    $timestamps: {
        $start: NumberConstructor;
        $end: NumberConstructor;
    }[];
    $application_id: StringConstructor;
    $details: StringConstructor;
    $state: StringConstructor;
    $emoji: {
        $name: StringConstructor;
        $id: StringConstructor;
        $amimated: BooleanConstructor;
    };
    $party: {
        $id: StringConstructor;
        $size: NumberConstructor[];
    };
    $assets: {
        $large_image: StringConstructor;
        $large_text: StringConstructor;
        $small_image: StringConstructor;
        $small_text: StringConstructor;
    };
    $secrets: {
        $join: StringConstructor;
        $spectate: StringConstructor;
        $match: StringConstructor;
    };
    $instance: BooleanConstructor;
    $flags: BigIntConstructor;
};
export declare enum ActivityType {
    GAME = 0,
    STREAMING = 1,
    LISTENING = 2,
    CUSTOM = 4,
    COMPETING = 5
}
