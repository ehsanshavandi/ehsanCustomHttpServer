/**
 * set custom headers to request
 * @param req {httpRequest}
 * @param res {httpResponse}
 * @returns {boolean}
 */

let customHeaders = (req, res) => {
  res.setHeader("X-class", "ehsan");
  return false;
};

module.exports = {
  customHeaders,
};
