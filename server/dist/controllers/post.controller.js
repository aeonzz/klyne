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
exports.updatePost = exports.getPost = exports.likePost = exports.getPosts = exports.createPost = void 0;
const db_1 = require("../lib/db");
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../lib/response");
const post_schema_1 = require("../schemas/post.schema");
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { content, userId, imageUrl, replyToId, quoteOfId } = post_schema_1.createPostSchema.parse(req.body);
        const data = yield db_1.db.post.create({
            data: {
                content,
                userId,
                imageUrl,
                replyToId,
            },
        });
        (0, response_1.response)({
            res,
            status: http_status_codes_1.StatusCodes.ACCEPTED,
            data,
            error: null,
        });
    }
    catch (error) {
        console.log(error);
        (0, response_1.response)({
            res,
            status: http_status_codes_1.StatusCodes.ACCEPTED,
            data: null,
            error: error,
        });
    }
});
exports.createPost = createPost;
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield db_1.db.post.findMany({
            where: {
                replyToId: null,
                deleted: false,
            },
            include: {
                user: true,
                likes: {
                    include: {
                        user: true,
                    },
                },
                replies: {
                    where: {
                        deleted: false,
                    },
                    include: {
                        user: true,
                        likes: {
                            include: {
                                user: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        (0, response_1.response)({
            res,
            status: http_status_codes_1.StatusCodes.ACCEPTED,
            data,
            error: null,
        });
    }
    catch (error) {
        console.log(error);
        (0, response_1.response)({
            res,
            status: http_status_codes_1.StatusCodes.ACCEPTED,
            data: null,
            error: error,
        });
    }
});
exports.getPosts = getPosts;
const likePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, postId, state } = post_schema_1.likePostSchema.parse(req.body);
        let data;
        if (state === true) {
            data = yield db_1.db.like.create({
                data: {
                    userId: userId,
                    postId: postId,
                },
            });
        }
        else {
            data = yield db_1.db.like.delete({
                where: {
                    userId_postId: {
                        userId,
                        postId,
                    },
                },
            });
        }
        (0, response_1.response)({
            res,
            status: http_status_codes_1.StatusCodes.ACCEPTED,
            data,
            error: null,
        });
    }
    catch (error) {
        console.log(error);
        (0, response_1.response)({
            res,
            status: http_status_codes_1.StatusCodes.ACCEPTED,
            data: null,
            error: error,
        });
    }
});
exports.likePost = likePost;
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield db_1.db.post.findFirst({
            where: {
                id: req.params.id,
                deleted: false,
            },
            include: {
                user: true,
                likes: {
                    include: {
                        user: true,
                    },
                },
                replies: {
                    where: {
                        deleted: false,
                    },
                    include: {
                        user: true,
                        likes: {
                            include: {
                                user: true,
                            },
                        },
                        replies: {
                            where: {
                                deleted: false,
                            },
                            include: {
                                user: true,
                                likes: {
                                    include: {
                                        user: true,
                                    },
                                },
                            },
                            orderBy: {
                                createdAt: "desc",
                            },
                        },
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                },
            },
        });
        (0, response_1.response)({
            res,
            status: http_status_codes_1.StatusCodes.ACCEPTED,
            data,
            error: null,
        });
    }
    catch (error) {
        console.log(error);
        (0, response_1.response)({
            res,
            status: http_status_codes_1.StatusCodes.ACCEPTED,
            data: null,
            error: error,
        });
    }
});
exports.getPost = getPost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { content, postId, deleted } = post_schema_1.updatePostSchema.parse(req.body);
        const data = yield db_1.db.post.update({
            where: {
                id: postId,
            },
            data: {
                content,
                deleted,
            },
        });
        (0, response_1.response)({
            res,
            status: http_status_codes_1.StatusCodes.ACCEPTED,
            data,
            error: null,
        });
    }
    catch (error) {
        console.log(error);
        (0, response_1.response)({
            res,
            status: http_status_codes_1.StatusCodes.ACCEPTED,
            data: null,
            error: error,
        });
    }
});
exports.updatePost = updatePost;
//# sourceMappingURL=post.controller.js.map