exports.customErrorHandler = (err, req, res, next) => {
    if (err.status && err.msg) {
      res.status(err.status).send({ message: err.msg });
    }
  };