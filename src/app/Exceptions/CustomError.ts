export enum HttpErrorCode {
  OK = 200,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  PRECONDITION_FAILED = 412,
  INTERNAL_SERVER_ERROR = 500,
}

export class CustomError extends Error {
  public readonly name: string
  public readonly code: HttpErrorCode
  public readonly data?: object

  constructor(message: string, code: HttpErrorCode, data?: object) {
    super(message);

    this.name = 'CustomError';
    this.code = code;
    this.message = message;
    this.data = data;

    // Workaround for instanceof common error
    // (https://www.dannyguo.com/blog/how-to-fix-instanceof-not-working-for-custom-errors-in-typescript)
    Object.setPrototypeOf(this, CustomError.prototype);
    
    Error.captureStackTrace(this, this.constructor);
  }        

}