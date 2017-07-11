'use strict';

const swaggerRoute = require('./swagger');
const apiRoute = require('./api');
const swagger = require('swagger-spec-express');
const express = require('express');
const router = new express.Router();

swagger.swaggerize(router);

router.get("/swagger", swaggerRoute.route).describe(swaggerRoute.describe);
router.get("/api/one", apiRoute.route).describe(apiRoute.describe);

module.exports = router
