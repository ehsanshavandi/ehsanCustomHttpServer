const querystring   = require('querystring');
const url           = require('url');
const logger        = require('../Log/logger');
const FileType = require('file-type');

/** @module helper
 * @type {{bodyParser: (function(*=): Promise<unknown>), responseService: helper.responseService}}
 */
let helper = {
    /**
     * @function body parser function
     * @param req {httpRequest}
     * @returns {Promise<unknown>}
     */
    bodyParser: function(req){
        return new Promise((resolve, reject)=>{
            let reqObject;
                let data = ''
                req.on('data', chunk => {
                    data += chunk
                });
                req.on('end',  () =>{
                    let pathname = url.parse(req.url, false).pathname;
                    if (req.headers['content-type'] === 'application/json'){
                         reqObject = {
                            params: pathname.match(/[a-zA-Z0-9]+/g),
                             body: JSON.parse(data)
                        }
                    } else {
                        // url form encoded
                         reqObject = {
                            params: pathname.match(/[a-zA-Z0-9]+/g),
                            body : querystring.parse(data)
                        }
                    }
                    resolve(reqObject);
        })
    });
    },
    /**
     * @function Response service
     * @param res {httpResponse}
     * @param statusCode {number}
     * @param typeHeader {string}
     * @param message {string}
     * @param data {Object}
     */
    responseService: function (res, statusCode, typeHeader, message ,data= null) {
        if( typeHeader == 'json' && statusCode == 200){
            res.writeHead(statusCode, {'Content-Type': 'application/json'});
            res.write(JSON.stringify({err: false, message: message, data}));
            res.end();
            logger.info(`response code: ${res.statusCode}`);
        }
        if (typeHeader == 'json' && statusCode == 400){
            res.writeHead(statusCode, {'Content-Type': 'application/json'});
            res.write(JSON.stringify({err: true, message: message, data}));
            res.end();
            logger.info(`response code: ${res.statusCode}`);
        }
        if (typeHeader == 'json' && statusCode == 500){
            res.writeHead(statusCode, {'Content-Type': 'application/json'});
            res.write(JSON.stringify({err: true, message: message, data}));
            res.end();
            logger.info(`response code: ${res.statusCode}`);
        }
        if (typeHeader == 'json' && statusCode == 404){
            res.writeHead(statusCode, {'Content-Type': 'application/json'});
            res.write(JSON.stringify({err: true, message: message, data}));
            res.end();
            logger.info(`response code: ${res.statusCode}`);
        }
        if (typeHeader == 'json' && statusCode == 422){
            res.writeHead(statusCode, {'Content-Type': 'application/json'});
            res.write(JSON.stringify({err: true, message: message, data}));
            res.end();
            logger.info(`response code: ${res.statusCode}`);
        }

    }

}
/**
 *
 * @type {{bodyParser: (function(*=): Promise<unknown>), responseService: helper.responseService}}
 */
module.exports = helper;

