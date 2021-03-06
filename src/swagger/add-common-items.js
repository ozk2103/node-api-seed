'use strict';
var swagger = require('swagger-spec-express');

module.exports = function (app, callback) {
    swagger.common.parameters.addPath({
        "name": "targetDate",
        "description": "The target date for the query in ISO 8601 format",
        "type": "string",
        required: true,
        "format": "date-time"
    });
    swagger.common.parameters.addPath({
        "name": "fromDate",
        "description": "The from date in ISO 8601 format",
        "required": true,
        "type": "string",
        "format": "date-time"
    });
    swagger.common.parameters.addPath({
        "name": "toDate",
        "description": "The date to in ISO 8601 format",
        "required": true,
        "type": "string",
        "format": "date-time"
    });
    swagger.common.parameters.addPath({
        "name": "startDate",
        "description": "The from date in ISO 8601 format",
        "required": true,
        "type": "string",
        "format": "date-time"
    });
    swagger.common.parameters.addPath({
        "name": "endDate",
        "description": "The date to in ISO 8601 format",
        "required": true,
        "type": "string",
        "format": "date-time"
    });
    swagger.common.addModel({
        "name": "serverError",
        "type": "object",
        "properties": {
            "message": {
                "type": "string"
            }
        }
    });
    swagger.common.addResponse({
        "name": "500",
        "description": "Server Error",
        "schema": {
            $ref: "#/definitions/serverError"
        }
    });
    swagger.common.addResponse({
        "name": "401",
        "description": "Not Authorised"
    });
    swagger.common.addResponse({
        "name": "404",
        "description": "Not Found"
    });
    swagger.common.addResponse({
        "name": "409",
        "description": "Conflict, item exists"
    });
    swagger.common.addResponse({
        "name": "400",
        "description": "Validation error"
    });
    swagger.common.addResponse({
        "name": "412",
        "description": "Precondition failed"
    });

    swagger.common.addResponseHeader({
        name: "X-Request-Id",
        description: "A unique identifier that is used to track the request through the logs. Should be passed through in the request, but will be generated if one is not provided.",
        type: "string"
    });

    swagger.common.parameters.addQuery({
        "name": "select",
        "description": "The fields to select e.g. select=field1,field2",
        "required": false,
        "type": "string"
    });
    swagger.common.parameters.addQuery({
        "name": "skip",
        "description": "The number of records to skip",
        "default": 0,
        "required": false,
        "type": "integer"
    });
    swagger.common.parameters.addQuery({
        "name": "limit",
        "description": "The number of records to return",
        "default": 50,
        "required": false,
        "type": "integer"
    });
    swagger.common.parameters.addQuery({
        "name": "sort",
        "description": "The sort order of records e.g. sort=field1,-field2",
        "required": false,
        "type": "string"
    });
    swagger.common.parameters.addQuery({
        "name": "rawQuery",
        "description": 'A mongodb json find statement as a string. e.g. {"field1":1}',
        "required": false,
        "type": "string"
    });
    swagger.common.parameters.addHeader({
        name: "X-Request-Id",
        description: "A unique identifier that is used to track the request through the logs. Should be passed through in the request, but will be generated if one is not provided.",
        required: false,
        type: "string"
    });

    return callback(null, app);
};