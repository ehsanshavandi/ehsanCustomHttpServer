const winston = require("winston");
const path = require("path");

const loggerWinston = winston.createLogger({
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    new winston.transports.File({
      filename: path.join(__dirname, "access.log"),
    }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
/**
 * in production does not log to console
 */
if (process.env.NODE_ENV === "dev") {
  loggerWinston.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

module.exports = loggerWinston;
