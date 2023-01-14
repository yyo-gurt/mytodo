import BadRequestError from "errors/BadRequestError";

export enum JoinErrorCode {
  REQUIRED = "REQUIRED",
  DUPLICATED_ID = "DUPLICATED_ID"
}

export default class JoinFormError extends BadRequestError {
  private _code: string;

  constructor(message: string, code: string) {
    super(message);
    this._code = code;
  }

  get code() {
    return this._code;
  }
}