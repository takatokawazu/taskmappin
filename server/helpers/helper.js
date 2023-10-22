const requestErrorHandler = function (controller) {
  return async function (req, res, next) {
    try {
      return await controller(req, res);
    } catch (err) {
      console.log(err);
      next(err.stack);
    }
  };
};

module.exports = requestErrorHandler;
