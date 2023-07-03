import { Response, NextFunction } from "express";
import { CustomError, HttpErrorCode } from "./Exceptions/CustomError";

class ErrorHandler {
  private isTrustedError(error: Error | CustomError): boolean {
    return error instanceof CustomError;
  }
  private isError(error: Error): boolean {
    return error instanceof Error;
  }

  public handleError(
    error: Error | CustomError,
    next: NextFunction,
    response?: Response
  ): void {
    if (this.isTrustedError(error) && response) {
      this.handleTrustedError(error as CustomError, response);
    } else if (this.isError(error)) {
      this.handleCriticalError(error, response);
    } else {
      next();
    }
  }

  private handleTrustedError(error: CustomError, response: Response): void {
    response.status(error.code).json({
      code: error.code,
      message: error.message,
      success: false,
      errors: error.data ?? null,
    });
  }

  private handleCriticalError(error: Error, response?: Response): void {
    if (!response) process.exit(1);

    response.status(HttpErrorCode.INTERNAL_SERVER_ERROR).json({
      code: HttpErrorCode.INTERNAL_SERVER_ERROR,
      message: "Internal server error",
      success: false,
      data: [],
    });
  }
}

export default new ErrorHandler();
