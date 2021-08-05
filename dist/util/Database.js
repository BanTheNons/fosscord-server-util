"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseCache = exports.toObject = void 0;
require("./MongoBigInt");
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_1 = require("mongodb");
const events_1 = __importDefault(require("events"));
const uri = process.env.MONGO_URL || "mongodb://localhost:27017/fosscord?readPreference=secondaryPreferred";
const url_1 = require("url");
const url = new url_1.URL(uri.replace("mongodb://", "http://"));
const connection = mongoose_1.default.createConnection(uri, {
    autoIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});
console.log(`[Database] connect: mongodb://${url.username}@${url.host}${url.pathname}${url.search}`);
exports.default = connection;
function transform(document) {
    // @ts-ignore
    if (!document || !document.toObject) {
        try {
            // @ts-ignore
            delete document._id;
            // @ts-ignore
            delete document.__v;
        }
        catch (error) { }
        return document;
    }
    // @ts-ignore
    return document.toObject({ virtuals: true });
}
function toObject(document) {
    // @ts-ignore
    return Array.isArray(document) ? document.map((x) => transform(x)) : transform(document);
}
exports.toObject = toObject;
class MongooseCache extends events_1.default {
    constructor(collection, pipeline, opts) {
        super();
        this.collection = collection;
        this.pipeline = pipeline;
        this.opts = opts;
        this.init = () => {
            if (this.initalizing)
                return this.initalizing;
            this.initalizing = new Promise(async (resolve, reject) => {
                // @ts-ignore
                this.stream = this.collection.watch(this.pipeline, { fullDocument: "updateLookup" });
                this.stream.on("change", this.change);
                this.stream.on("close", this.destroy);
                this.stream.on("error", console.error);
                if (!this.opts.onlyEvents) {
                    const arr = await this.collection.aggregate(this.pipeline).toArray();
                    if (this.opts.array)
                        this.data = arr || [];
                    else
                        this.data = arr?.[0];
                }
                resolve();
            });
            return this.initalizing;
        };
        this.changeStream = (pipeline) => {
            this.pipeline = pipeline;
            this.destroy();
            this.init();
        };
        this.convertResult = (obj) => {
            if (obj instanceof mongodb_1.Long)
                return BigInt(obj.toString());
            if (typeof obj === "object") {
                Object.keys(obj).forEach((key) => {
                    obj[key] = this.convertResult(obj[key]);
                });
            }
            return obj;
        };
        this.change = (doc) => {
            try {
                switch (doc.operationType) {
                    case "dropDatabase":
                        return this.destroy();
                    case "drop":
                        return this.destroy();
                    case "delete":
                        if (!this.opts.onlyEvents) {
                            if (this.opts.array) {
                                this.data = this.data.filter((x) => doc.documentKey?._id?.equals(x._id));
                            }
                            else
                                this.data = null;
                        }
                        return this.emit("delete", doc.documentKey._id.toHexString());
                    case "insert":
                        if (!this.opts.onlyEvents) {
                            if (this.opts.array)
                                this.data.push(doc.fullDocument);
                            else
                                this.data = doc.fullDocument;
                        }
                        return this.emit("insert", doc.fullDocument);
                    case "update":
                    case "replace":
                        if (!this.opts.onlyEvents) {
                            if (this.opts.array) {
                                const i = this.data.findIndex((x) => doc.fullDocument?._id?.equals(x._id));
                                if (i == -1)
                                    this.data.push(doc.fullDocument);
                                else
                                    this.data[i] = doc.fullDocument;
                            }
                            else
                                this.data = doc.fullDocument;
                        }
                        return this.emit("change", doc.fullDocument);
                    case "invalidate":
                        return this.destroy();
                    default:
                        return;
                }
            }
            catch (error) {
                this.emit("error", error);
            }
        };
        this.destroy = () => {
            this.data = null;
            this.stream?.off("change", this.change);
            this.emit("close");
            if (this.stream.isClosed())
                return;
            return this.stream.close();
        };
        if (this.opts.array == null)
            this.opts.array = true;
    }
}
exports.MongooseCache = MongooseCache;
//# sourceMappingURL=Database.js.map