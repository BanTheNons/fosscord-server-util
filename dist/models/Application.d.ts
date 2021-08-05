import { Team } from "./Team";
export interface Application {
    id: string;
    name: string;
    icon: string | null;
    description: string;
    rpc_origins: string[] | null;
    bot_public: boolean;
    bot_require_code_grant: boolean;
    terms_of_service_url: string | null;
    privacy_policy_url: string | null;
    owner_id: string;
    summary: string | null;
    verify_key: string;
    team: Team | null;
    guild_id: string;
    primary_sku_id: string | null;
    slug: string | null;
    cover_image: string | null;
    flags: number;
}
export interface ApplicationCommand {
    id: string;
    application_id: string;
    name: string;
    description: string;
    options?: ApplicationCommandOption[];
}
export interface ApplicationCommandOption {
    type: ApplicationCommandOptionType;
    name: string;
    description: string;
    required?: boolean;
    choices?: ApplicationCommandOptionChoice[];
    options?: ApplicationCommandOption[];
}
export interface ApplicationCommandOptionChoice {
    name: string;
    value: string | number;
}
export declare enum ApplicationCommandOptionType {
    SUB_COMMAND = 1,
    SUB_COMMAND_GROUP = 2,
    STRING = 3,
    INTEGER = 4,
    BOOLEAN = 5,
    USER = 6,
    CHANNEL = 7,
    ROLE = 8
}
export interface ApplicationCommandInteractionData {
    id: string;
    name: string;
    options?: ApplicationCommandInteractionDataOption[];
}
export interface ApplicationCommandInteractionDataOption {
    name: string;
    value?: any;
    options?: ApplicationCommandInteractionDataOption[];
}
