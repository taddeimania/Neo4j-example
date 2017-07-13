
const Domain = require('./models/domain')

const dataTrigger = true;
const startBackgroundTask = (session) => {
  setInterval(() => {
    if (dataTrigger){
      createRandomDomains(session);
    }
  }, 5000);
};

const createRandomDomains = async (session) => {
  // console.log("Creating a record");
  const countRecord = await Domain.count(session);
  const count = countRecord.records[0].get("domainCount").low;
  const domain = await Domain.create(session);
  const result = await domain.save();
  if (count > 10) {
    // console.log("Creating an association");
    const randomNode = await Domain.randomNode(session);
    await domain.associate(randomNode)
  }
  // Find random data -> remove it
}

module.exports = {
  startBackgroundTask: startBackgroundTask,
  dataTrigger: dataTrigger
};
