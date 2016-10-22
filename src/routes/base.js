'use strict';
var express = require('express');
var router = express.Router();
var packageJson = require('../../package.json');
var testErrors = require('../routes/test-errors');
var config = require('nconf');
var swagger = require('swagger-spec-express');
swagger.swaggerise(router);
var appInfoSchema = require('./app-info.json');
swagger.common.addTag({
    name: "Info",
    description: "Info about the api"
});
swagger.common.addModel(appInfoSchema);

router.get('/', function (req, res) {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    res.status(200).json({
        appName: packageJson.name,
        version: packageJson.version,
        deploymentDate: packageJson.deploymentDate,
        environment: config.get('NODE_ENV'),
        nodeVersion: process.version,
        swaggerUiUrl: fullUrl + 'apidocs'
    });
}).describe({
    security: false,
    summary: "Get API Details",
    tags: ["Info"],
    common: {
        responses: ["500"]
    },
    responses: {
        "200": {
            model: "appInfo",
            description: "Returns the information about the application",
            examples: {
                "appName": "node-api-seed",
                "version": "0.0.0",
                "deploymentDate": "",
                "environment": "development",
                "nodeVersion": "v6.9.0",
                "swaggerUiUrl": "http://localhost:10001/apidocs"
            }
        }
    }
});

router.get("/apidocs.json", function getApiDocument(req, res) {
    return res.status(200).json(swagger.json());
}).describe({
    security: false,
    summary: "Get the swagger api JSON document",
    tags: ["Info"],
    externalDocs: {
        description: "The specification for the json document used to describe the api",
        url: "http://swagger.io/specification/"
    },
    common: {
        responses: ["500"]
    },
    responses: {
        "200": {
            description: "Returns the swagger specification for this api"
        }
    }
});

if (config.get('errorHandling').exposeErrorRoutes) {
    router.use('/error', testErrors);
}

module.exports = router;