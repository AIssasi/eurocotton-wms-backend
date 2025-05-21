class ErrorResponse extends Error {
  constructor(message, data = null, statusCode) {
    super(message);
    this.data = data;
    this.statusCode = statusCode;
  }
}

export default ErrorResponse;
