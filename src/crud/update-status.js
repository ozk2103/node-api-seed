'use strict';
var outputMap = require('../output-map');
var applyMaps = require('../swagger/router/step-maps');
var getValidateFunction = require('./@shared/get-validate-function');
var schemaName = 'update';
var _ = require('lodash');

module.exports = {
    addRoute: addRoute
};

function addRoute(router, options) {
    router.put('/:' + router.metadata.identifierName + '/:newStatusName', getSteps(router, options))
        .describe(router.metadata.updateStatusDescription || description(router.metadata));
}

function getSteps(router, options) {
    var steps = {
        validate: getValidateFunction(schemaName),
        updateStatus: options.crudMiddleware.updateStatus,
        sendOutput: outputMap.sendNoContent
    };
    return applyMaps(options.maps, steps);
}

function description(metadata) {
    return {
        security: true,
        summary: "Updates the status of a " + metadata.title + " By " + _.startCase(metadata.identifierName),
        tags: [metadata.tag.name],
        parameters: [
            {
                name: metadata.identifierName.toLowerCase(),
                description: "The field to uniquely identify this " + metadata.title.toLowerCase(),
                required: true,
                in: "path",
                type: "string"
            },
            {
                name: "statusData",
                description: "Any data you would like to store, associated with the status update.",
                required: false,
                in: "body",
                schema: {}
            }
        ],
        common: {
            responses: ["500", "400", "401", "404"],
            parameters: {
                header: ["X-Request-Id"]
            }
        },
        responses: {
            "204": {
                description: "Lets the calling system know that the request was successful",
                commonHeaders: ["X-Request-Id"]
            }
        }
    };
}