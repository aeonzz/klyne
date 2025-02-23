"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = void 0;
const http_status_codes_1 = require("http-status-codes");
const response = ({ res, status, data, error }) => {
    return res
        .status(status)
        .json({ message: (0, http_status_codes_1.getReasonPhrase)(status), data, error });
};
exports.response = response;
//# sourceMappingURL=response.js.map