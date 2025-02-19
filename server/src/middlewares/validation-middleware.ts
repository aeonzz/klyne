import * as z from "zod";
import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const validateData = (schema: z.ZodObject<any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req)
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          message: issue.message,
        }));
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({
            error: "Invalid data",
            message: "Please check the provided fields for errors.",
            details: errorMessages,
          });
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: "Internal Server Error" });
      }
    }
  };
};
