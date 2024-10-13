class Response {
  constructor(res) {
    this.res = res;
  }

  success(message, data, statusCode = 200) {
    return this.res.status(statusCode).json({
      status: 'success',
      message,
      data,
    });
  }

  error(message, detail, statusCode = 500) {
    return this.res.status(statusCode).json({
      status: 'error',
      message,
      error: {
        detail,
      },
    });
  }
}

module.exports = Response;
