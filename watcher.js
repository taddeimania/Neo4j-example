
const Domain = require('./models/domain')
const neo4j = require('neo4j-driver').v1;

const startBackgroundTask = () => {
  const driver = neo4j.driver('bolt://neo4j', neo4j.auth.basic('neo4j', 'abcde'));
  const session = driver.session()


  setInterval(
    createRandomDomains();
  }, 5000);
};

const createRandomDomains = async () => {
  const countRecord = await Domain.count(session);
  const count = countRecord.records[0].get("domainCount").low;
  const domain = await Domain.create(session);
  const result = await domain.save();
  if (count > 10) {
    console.log("Have enough, lets ASSOCIATE!");
    const randomNode = await Domain.randomNode(session);
    await domain.associate(randomNode)
  }
  // Find random data -> remove it
}

module.exports = {
  startBackgroundTask: startBackgroundTask
};
