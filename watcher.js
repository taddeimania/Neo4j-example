
const generateRandomDomain = require('./data/loadData').generateRandomDomain;

const startBackgroundTask = () => {
  setInterval(() => {
    const domain = generateRandomDomain();
    // neo4j integration
    // Find random data -> remove it
    // Find random nodes -> connect them

  }, 5000);
};

module.exports = startBackgroundTask;
