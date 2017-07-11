'use strict';

const swagger = require('swagger-spec-express');

module.exports = {
  route: (req, res) => {
    res.status(200).json(swagger.json());
  },
  describe: {
    responses: {
      200: {
        description: "Returns swagger spec"
      }
    }
  }
}
