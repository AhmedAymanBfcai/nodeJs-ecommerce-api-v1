// @des     This class is responsible about operation errors (errors I can predict);

class errorApi extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith(4) ? "Fail" : "Error";
    this.isOperational = true;
  }
}

module.exports = errorApi;
