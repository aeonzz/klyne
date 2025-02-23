"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const client_1 = require("@prisma/client");
exports.db = global.db ||
    new client_1.PrismaClient({
    // log: ["query"],
    });
if (process.env.NODE_ENV !== "production")
    global.db = exports.db;
//# sourceMappingURL=db.js.map