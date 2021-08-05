"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trimSpecial = void 0;
const Regex_1 = require("./Regex");
function trimSpecial(str) {
    // @ts-ignore
    if (!str)
        return;
    return str.replace(Regex_1.SPECIAL_CHAR, "").trim();
}
exports.trimSpecial = trimSpecial;
//# sourceMappingURL=String.js.map