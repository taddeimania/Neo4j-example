
const Domain = require('./models/domain')
const generateRandomDomain = require('./data/loadData').generateRandomDomain;

const startBackgroundTask = () => {
  setInterval(() => {
    const domain = Domain.create();
    console.log(domain);
    // neo4j integration
    // Find random data -> remove it
    // Find random nodes -> connect them

  }, 5000);
};

module.exports = startBackgroundTask;
