'use strict';

const express = require('express');
const swagger = require('swagger-spec-express');
const routes = require('./routes')

const app = express();
const opts = {
  title: "Neo4j Dashboard",
  version: "0.0.1"
};

swagger.initialize(app, opts);

app.use(routes);

swagger.compile()

app.listen(3000, () => {
  console.log("Started serving express app on port 3000");
});
