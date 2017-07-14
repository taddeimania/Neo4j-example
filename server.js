'use strict';

const express = require('express');
const swagger = require('swagger-spec-express');
const routes = require('./routes');
const expressHBS  = require('express-handlebars');
const neo4j = require('neo4j-driver').v1;
const Domain = require('./models/domain');
const startBackgroundTask = require("./watcher").startBackgroundTask;
const morgan = require('morgan');


const app = express();
app.use(morgan('combined'));
const opts = {
  title: "Neo4j Dashboard",
  version: "0.0.1"
};
app.engine('handlebars', expressHBS({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use('/static', express.static('public'));

const driver = neo4j.driver('bolt://neo4j', neo4j.auth.basic('neo4j', 'abcde'));
const session = driver.session();


swagger.initialize(app, opts);
app.use(routes);

app.get("/", async (req, res) => {
  const samples = await Domain.randomNodes(session, 7);
  const templateSamples = samples.records.map((sample) => {
    return sample.get(0);
  })
  res.render('home', {samples: templateSamples});
});

app.get("/full", (req, res) => {
  res.render('full', {});
});

swagger.compile()



app.listen(3000, () => {
  console.log("Started serving express app on port 3000");
  console.log("Starting background worker task");
  setTimeout(() => {
    startBackgroundTask(session);
  }, 5000)
});
