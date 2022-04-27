let routes = [];
/**
 * handler function like app in express
 * @param req {httpRequest}
 * @param res {httpResponse}
 */
let handler = function (req, res) {
    let matchedRoutes = routes.filter(matching(req));
    matchedRoutes.some(r => r.fn(req,res));
}

/**
 * @function register routes
 * @param url {String} accept regexp
 * @param method {String}  GET,POST,PUT,PATCH,DELETE
 * @param fn {function} like controller
 */
function register(url, method, fn){
    routes.push({url, method, fn});
}

/**
 * matching routes between request and registered route
 * @param req {httpRequest}
 * @returns {function(...[*]=)}
 */
function matching(req){
    return function (route) {
        if ((req.url.match(route.url) || route.url == null)
            &&
            (req.method.match(route.method) || route.method == null)){
            return true;
        }
        else {
            return false;
        }
    }
}

/**
 *
 * @type {{handler: handler, register: register}}
 */
module.exports = {
    handler: handler,
    register: register
}
