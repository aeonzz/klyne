import type { Request, Response } from "express";
import { db } from "../lib/db";
import { StatusCodes } from "http-status-codes";
import { response } from "../lib/response";
import { createPostSchema } from "../schemas/post.schema";

export const createPost = async (req: Request, res: Response) => {
  try {
    const { content, userId } = createPostSchema.parse(req.body);
    const data = await db.post.create({
      data: {
        content,
        userId,
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
      include: {
        user: true,
        likes: true,
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
    // const data = await db.post.findMany({
    //   include: {
    //     user: true,
    //     likes: true,
    //   },
    //   orderBy: {
    //     createdAt: "desc",
    //   },
    // });
    const data = await db.like.create({
      data: {
        userId: 
      }
    })
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
