const dotenv = require("dotenv");
// initialize config file
dotenv.config();

const http = require("http");
const { handler, register } = require("./hadler");
const controller = require("./Controller/controller");
const { loggerMiddleware } = require("./Midlleware/loggerMiddleware");
const { customHeaders } = require("./Midlleware/setCustomHeaders");

// require log service
require("./Log/logger");

// bootstrap database
require("./Bootstrap/db");

// register routes
register(null, null, loggerMiddleware); // this is middleware
register(null, null, customHeaders); // this is middleware

register(/^\/$/gi, "GET", controller.index);
register("/test/create", "POST", controller.create);
register("/test", "GET", controller.read);
register(/^\/test\/[a-zA-Z0-9]+/i, "PUT", controller.updateOne);
register(/^\/test\/[a-zA-Z0-9]+/i, "DELETE", controller.deleteOne);
register("/static", "GET", controller.mySelfStatic);

// 404 Not Found
register(/ */i, / */i, controller.notFound);

// Makes server to listen on 8000 port
// server.on('request', handler);
let server = http.createServer(handler);
/**
 * open a port
 * @param {number} port
 */
server.listen(process.env.SERVER_PORT);

server.on("listening", function () {
  if (process.env.NODE_ENV === "dev")
    console.log(`server up and listen to port: ${server.address().port}`);
});

module.exports = server;
