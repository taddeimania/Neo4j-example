'use strict';

const swaggerRoute = require('./swagger');
const apiRoutes = require('./api');
const swagger = require('swagger-spec-express');
const express = require('express');
const router = new express.Router();

swagger.swaggerize(router);

router.get("/swagger", swaggerRoute.route).describe(swaggerRoute.describe);
router.post("/api/destroyEverything", apiRoutes.destroyEverything.route).describe(apiRoutes.destroyEverything.describe);
router.post("/api/createDomains/:count", apiRoutes.createDomains.route).describe(apiRoutes.createDomains.describe);

module.exports = router
