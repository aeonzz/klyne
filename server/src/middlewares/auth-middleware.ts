import type { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { fromNodeHeaders } from "better-auth/node";

const authorize = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: ReasonPhrases.UNAUTHORIZED });
      return;
    }

    next();
  } catch (error) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: ReasonPhrases.UNAUTHORIZED, error: error.message });
  }
};

export default authorize;
