let logWinston = require("../Log/logger");

/**
 * log from request
 * @param req {httpRequest}
 * @param res {httpResponse}
 * @returns {boolean}
 */
let loggerMiddleware = (req, res) => {
  let d = new Date();
  logWinston.info(
    `${req.method}  ${req.url}  with agent: ${
      req.headers["user-agent"]
    }  at ${d.toTimeString()}`
  );
  return false;
};

module.exports = {
  loggerMiddleware,
};
