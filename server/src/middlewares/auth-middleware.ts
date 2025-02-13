import type { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

const authorize = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const headers: any = {
      get: (key: string) => req.headers[key.toLowerCase()],
      set: (key: string, value: string) => {
        req.headers[key.toLowerCase()] = value;
      },
      getSetCookie: () => [],
      append: (key: string, value: string) => {
        const currentValue = req.headers[key.toLowerCase()];
        if (Array.isArray(currentValue)) {
          currentValue.push(value);
        } else if (currentValue) {
          req.headers[key.toLowerCase()] = [currentValue, value];
        } else {
          req.headers[key.toLowerCase()] = value;
        }
      },
    };

    const session = await auth.api.getSession({
      headers,
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
