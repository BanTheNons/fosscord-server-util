"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_autopopulate_1 = __importDefault(require("mongoose-autopopulate"));
var HTTPError;
try {
    HTTPError = require("lambert-server").HTTPError;
}
catch (e) {
    HTTPError = Error;
}
mongoose_1.default.plugin(mongoose_autopopulate_1.default);
mongoose_1.default.plugin((schema, opts) => {
    schema.set("toObject", {
        virtuals: true,
        versionKey: false,
        transform(doc, ret) {
            delete ret._id;
            delete ret.__v;
            const props = schema.get("removeResponse") || [];
            props.forEach((prop) => {
                delete ret[prop];
            });
        },
    });
    schema.post("findOne", function (doc, next) {
        try {
            // @ts-ignore
            const isExistsQuery = JSON.stringify(this._userProvidedFields) === JSON.stringify({ _id: 1 });
            if (!doc && !isExistsQuery)
                return next(new HTTPError("Not found", 404));
            // @ts-ignore
            return next();
        }
        catch (error) {
            // @ts-ignore
            next();
        }
    });
});
__exportStar(require("./Activity"), exports);
__exportStar(require("./Application"), exports);
__exportStar(require("./Ban"), exports);
__exportStar(require("./Channel"), exports);
__exportStar(require("./Emoji"), exports);
__exportStar(require("./Event"), exports);
__exportStar(require("./Template"), exports);
__exportStar(require("./Guild"), exports);
__exportStar(require("./Invite"), exports);
__exportStar(require("./Interaction"), exports);
__exportStar(require("./Member"), exports);
__exportStar(require("./Message"), exports);
__exportStar(require("./Status"), exports);
__exportStar(require("./Role"), exports);
__exportStar(require("./User"), exports);
__exportStar(require("./VoiceState"), exports);
__exportStar(require("./ReadState"), exports);
__exportStar(require("./RateLimit"), exports);
//# sourceMappingURL=index.js.map