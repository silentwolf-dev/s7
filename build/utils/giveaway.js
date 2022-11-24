"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const giveaway_1 = __importDefault(require("../models/giveaway"));
const Settings_1 = __importDefault(require("../models/Settings"));
class GiveawayUitls extends giveaway_1.default {
    constructor() {
        super();
    }
    static getChannelId(guildid) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield Settings_1.default.findById({ _id: guildid });
                console.log((_a = res === null || res === void 0 ? void 0 : res.channels) === null || _a === void 0 ? void 0 : _a.giveaway_channel);
                return (_b = res === null || res === void 0 ? void 0 : res.channels) === null || _b === void 0 ? void 0 : _b.giveaway_channel;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    static setGiveawaychannel(guildid, channel_id) {
        const promise = new Promise((resolve, reject) => {
            Settings_1.default.findOne({ _id: guildid }, (err, setting) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    reject("Error while finding [Guild settings]");
                    return;
                }
                if (!setting) {
                    setting = new Settings_1.default({
                        _id: guildid,
                        channels: { giveaway_channel: channel_id },
                    });
                }
                else {
                    setting.channels.giveaway_channel = channel_id;
                }
                yield setting.save((err, res) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(res);
                });
            }));
        });
        return promise;
    }
}
exports.default = GiveawayUitls;
