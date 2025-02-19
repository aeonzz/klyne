import type { Request, Response } from "express";
import { db } from "../lib/db";
import { StatusCodes } from "http-status-codes";
import { response } from "../lib/response";
import {
  createPostSchema,
  likePostSchema,
  updatePostSchema,
} from "../schemas/post.schema";

export const createPost = async (req: Request, res: Response) => {
  try {
    const { content, userId, imageUrl } = createPostSchema.parse(req.body);
    const data = await db.post.create({
      data: {
        content,
        userId,
        imageUrl,
      },
    });
    response({
      res,
      status: StatusCodes.ACCEPTED,
      data,
      error: null,
    });
  } catch (error) {
    console.log(error);
    response({
      res,
      status: StatusCodes.ACCEPTED,
      data: null,
      error: error,
    });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const data = await db.post.findMany({
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
    });
    response({
      res,
      status: StatusCodes.ACCEPTED,
      data,
      error: null,
    });
  } catch (error) {
    console.log(error);
    response({
      res,
      status: StatusCodes.ACCEPTED,
      data: null,
      error: error,
    });
  }
};

export const likePost = async (req: Request, res: Response) => {
  try {
    const { userId, postId, state } = likePostSchema.parse(req.body);
    let data: any;
    if (state === true) {
      data = await db.like.create({
        data: {
          userId: userId,
          postId: postId,
        },
      });
    } else {
      data = await db.like.delete({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });
    }

    response({
      res,
      status: StatusCodes.ACCEPTED,
      data,
      error: null,
    });
  } catch (error) {
    console.log(error);
    response({
      res,
      status: StatusCodes.ACCEPTED,
      data: null,
      error: error,
    });
  }
};

export const getPost = async (req: Request, res: Response) => {
  try {
    const data = await db.post.findFirst({
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
      },
    });

    response({
      res,
      status: StatusCodes.ACCEPTED,
      data,
      error: null,
    });
  } catch (error) {
    console.log(error);
    response({
      res,
      status: StatusCodes.ACCEPTED,
      data: null,
      error: error,
    });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { content, postId, deleted } = updatePostSchema.parse(req.body);
    const data = await db.post.update({
      where: {
        id: postId,
      },
      data: {
        content,
        deleted,
      },
    });

    response({
      res,
      status: StatusCodes.ACCEPTED,
      data,
      error: null,
    });
  } catch (error) {
    console.log(error);
    response({
      res,
      status: StatusCodes.ACCEPTED,
      data: null,
      error: error,
    });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await db.post.delete({
      where: {
        id,
      },
    });

    response({
      res,
      status: StatusCodes.ACCEPTED,
      data,
      error: null,
    });
  } catch (error) {
    console.log(error);
    response({
      res,
      status: StatusCodes.ACCEPTED,
      data: null,
      error: error,
    });
  }
};
