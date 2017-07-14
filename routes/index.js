'use strict';

const swaggerRoute = require('./swagger');
const apiRoutes = require('./api');
const swagger = require('swagger-spec-express');
const express = require('express');
const router = new express.Router();

swagger.swaggerize(router);

router.get("/swagger", swaggerRoute.route).describe(swaggerRoute.describe);
router.get("/api/one", apiRoutes.route).describe(apiRoutes.describe);

module.exports = router
