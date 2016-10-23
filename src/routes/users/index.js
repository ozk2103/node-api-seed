'use strict';
var schema = require('./user.json');
var router = require('../../swagger/router')({
    schema: schema
});

var crudMiddleware = require('../../json-file-db/index')(router.metadata);
router.add.query({crudMiddleware: crudMiddleware});
router.add.getById({crudMiddleware: crudMiddleware});
router.add.create({crudMiddleware: crudMiddleware});
router.add.update({crudMiddleware: crudMiddleware});
router.add.updateStatus({crudMiddleware: crudMiddleware});
module.exports = router;