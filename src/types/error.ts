export class HttpError extends Error {
  constructor(message: string, public httpStatusCode: number) {
    super(message);
    this.httpStatusCode = httpStatusCode;
  }
}
