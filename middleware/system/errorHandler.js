const errorHandler = (err, req, res, next) => {
  console.log(err);
  console.error(err.message);
  console.log(err.stack);

  if (err instanceof NotFoundError) {
    res.status(404).json({ success: false, message: err.message });
  } else if (err instanceof CustomError) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
};

class NotFoundError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

class CustomError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

module.exports = {
  errorHandler,
  NotFoundError,
  CustomError,
};
