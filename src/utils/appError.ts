import { IAppError } from "../types/appErrorType";

class AppError extends Error implements IAppError {
  statusCode: number;
  status: string;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("5") ? "error" : "fail";

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
