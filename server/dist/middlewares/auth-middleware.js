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
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../lib/auth");
const http_status_codes_1 = require("http-status-codes");
const node_1 = require("better-auth/node");
const authorize = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const session = yield auth_1.auth.api.getSession({
            headers: (0, node_1.fromNodeHeaders)(req.headers),
        });
        if (!session) {
            res
                .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
                .json({ message: http_status_codes_1.ReasonPhrases.UNAUTHORIZED });
            return;
        }
        next();
    }
    catch (error) {
        res
            .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
            .json({ message: http_status_codes_1.ReasonPhrases.UNAUTHORIZED, error: error.message });
    }
});
exports.default = authorize;
//# sourceMappingURL=auth-middleware.js.map