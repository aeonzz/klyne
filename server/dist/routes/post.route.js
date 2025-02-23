"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const post_controller_1 = require("../controllers/post.controller");
const auth_middleware_1 = __importDefault(require("../middlewares/auth-middleware"));
const validation_middleware_1 = require("../middlewares/validation-middleware");
const post_schema_1 = require("../schemas/post.schema");
const postRouter = express.Router();
postRouter.post("/", auth_middleware_1.default, (0, validation_middleware_1.validateData)(post_schema_1.createPostSchema), post_controller_1.createPost);
postRouter.get("/", auth_middleware_1.default, post_controller_1.getPosts);
postRouter.post("/like", auth_middleware_1.default, (0, validation_middleware_1.validateData)(post_schema_1.likePostSchema), post_controller_1.likePost);
postRouter.get("/:id", auth_middleware_1.default, post_controller_1.getPost);
postRouter.patch("/:id", auth_middleware_1.default, (0, validation_middleware_1.validateData)(post_schema_1.updatePostSchema), post_controller_1.updatePost);
exports.default = postRouter;
//# sourceMappingURL=post.route.js.map