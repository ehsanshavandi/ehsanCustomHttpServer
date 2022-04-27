const fs = require("fs");
const Test = require("../Models/test");
const helper = require("../Helper/helper");
const logger = require("../Log/logger");

/**
 * index controller
 * @param req {httpRequest}
 * @param res {httpResponse}
 * @returns {boolean}
 */
let index = (req, res) => {
  res.end(
    "<html><head><body><h1> Hello This is index</h1></body></head></html>"
  );
  logger.info(`response code: ${res.statusCode}`);
  return true;
};

/**
 * static controller
 * @param req {httpRequest}
 * @param res {httpResponse}
 * @returns {boolean}
 */
let mySelfStatic = (req, res) => {
  fs.createReadStream("./public/static.html").pipe(res);
  logger.info(`response code: ${res.statusCode}`);
  return true;
};

// Creating CRUD with MongoDB
/**
 * CRUD controller, Create
 * @param req {httpRequest}
 * @param res {httpResponse}
 * @returns {Promise<unknown | boolean>}
 */
let create = (req, res) => {
  return helper
    .bodyParser(req)
    .then((bodyAndParams) => {
      if (
        bodyAndParams.body.name.match(/^[a-zA-Z]{5,30}$/) &&
        bodyAndParams.body.id.match(/^[0-9]+$/)
      ) {
        let test = new Test({
          name: bodyAndParams.body.name,
          id: bodyAndParams.body.id,
        });
        return test
          .save()
          .then((saved) => {
            helper.responseService(res, 200, "json", "created successfully");
            return true;
          })
          .catch((error) => {
            helper.responseService(res, 500, "json", "database error");
            return true;
          });
      } else {
        helper.responseService(res, 422, "json", "validation errors");
        return true;
      }
    })
    .catch((error) => {
      helper.responseService(res, 500, "json", "Internally error");
      return true;
    });
};

/**
 * CRUD controller,read
 * @param req {httpRequest}
 * @param res {httpResponse}
 * @returns {Promise<T | boolean>}
 */
let read = (req, res) => {
  return Test.find()
    .exec()
    .then((allDoc) => {
      helper.responseService(res, 200, "json", null, allDoc);
      return true;
    })
    .catch((err) => {
      helper.responseService(res, 500, "json", "Internally error");
      return true;
    });
};

/**
 * CRUD controller,update
 * @param req {httpRequest}
 * @param res {httpResponse}
 * @returns {Promise<unknown>}
 */
let updateOne = (req, res) => {
  return helper.bodyParser(req).then((bodyAndParams) => {
    if (
      bodyAndParams.body.name.match(/^[a-zA-Z]{5,30}$/) &&
      bodyAndParams.body.id.match(/^[0-9]+$/) &&
      bodyAndParams.params[1].match(/^[a-zA-Z0-9]{24}$/)
    ) {
      return Test.findOneAndUpdate(
        bodyAndParams.params[1],
        { name: bodyAndParams.body.name, id: bodyAndParams.body.id },
        { new: false }
      )
        .exec()
        .then((saved) => {
          helper.responseService(res, 200, "json", "successfully updated");
          return true;
        })
        .catch((err) => {
          helper.responseService(res, 500, "json", "Internally error");
          return true;
        });
    } else {
      helper.responseService(res, 422, "json", "validation error");
      return true;
    }
  });
};

/**
 * CRUD controller,delete
 * @param req {httpRequest}
 * @param res {httpResponse}
 * @returns {Promise<unknown>}
 */
let deleteOne = (req, res) => {
  return helper
    .bodyParser(req)
    .then((bodyAndParams) => {
      if (bodyAndParams.params[1].match(/^[a-zA-Z0-9]{24}/)) {
        return Test.findByIdAndDelete(bodyAndParams.params[1])
          .exec()
          .then((deleted) => {
            helper.responseService(res, 200, "json", "successfully deleted");
            return true;
          })
          .catch((err) => {
            helper.responseService(res, 500, "json", "database error");
            return true;
          });
      } else {
        helper.responseService(res, 422, "json", "Validation error");
        return true;
      }
    })
    .catch((error) => {
      helper.responseService(res, 500, "json", "Internal error");
    });
};

//404 page: Not Found
/**
 * Not found page controller
 * @param req {httpRequest}
 * @param res {httpResponse}
 * @returns {Promise<boolean>}
 */
let notFound = (req, res) => {
  return helper.bodyParser(req).then((bodyAndParams) => {
    helper.responseService(res, 404, "json", "Not Found");
    return true;
  });
};

module.exports = {
  index,
  mySelfStatic,
  create,
  read,
  updateOne,
  deleteOne,
  notFound,
};
