'use strict';

const express = require('express');
const swagger = require('swagger-spec-express');
const routes = require('./routes');
const startBackgroundTask = require("./watcher");
const morgan = require('morgan');


const app = express();
app.use(morgan('combined'));
const opts = {
  title: "Neo4j Dashboard",
  version: "0.0.1"
};


swagger.initialize(app, opts);

app.use(routes);

swagger.compile()



app.listen(3000, () => {
  console.log("Started serving express app on port 3000");
  console.log("Starting background worker task");
  setTimeout(function () {
    startBackgroundTask();
  }, 5000);
});
