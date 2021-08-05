"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHANNEL_MENTION = exports.SPECIAL_CHAR = exports.DOUBLE_WHITE_SPACE = void 0;
exports.DOUBLE_WHITE_SPACE = /\s\s+/g;
exports.SPECIAL_CHAR = /[@#`:\r\n\t\f\v\p{C}]/gu;
exports.CHANNEL_MENTION = /<#(\d+)>/g;
//# sourceMappingURL=Regex.js.map