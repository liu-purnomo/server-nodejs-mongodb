const errorHandler = (err, req, res, next) => {
  let code;
  let message;

  switch (err.name) {
    case "ValidationError":
      code = 400;
      message = err.message;
      break;

    case "MongoError":
      code = 400;
      message = err.message;
      break;

    case "TokenInvalid":
      code = 401;
      message = "Invalid Token";
      break;

    case "Forbidden":
      code = 403;
      message = "Forbidden Access";
      break;

    default:
      code = err.code || 500;
      message = err.message || "Internal Server Error";
      break;
  }

  if (err.code === 11000) {
    code = 400;
    message = "Email or username already exists!";
  }

  res.status(code).json(message);
};

module.exports = errorHandler;
