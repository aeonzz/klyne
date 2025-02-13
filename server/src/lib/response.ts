import { Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

interface ResponseArgs {
  res: Response;
  status: StatusCodes;
  data: any;
  error: any;
}

export const response = ({ res, status, data, error }: ResponseArgs) => {
  return res
    .status(status)
    .json({ message: getReasonPhrase(status), data, error });
};
