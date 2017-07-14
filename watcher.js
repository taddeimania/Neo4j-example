
const Domain = require('./models/domain');
const generateRandomRange = require('./data/loadData').generateRandomRange;

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
const clientSockets = {};

wss.on('connection', function connection(ws) {
  let id = ws._socket._handle.fd;
  clientSockets[id] = ws;
  ws.on('close', function() {
    delete clientSockets[id];
  });
});



const startBackgroundTask = (session) => {
  setInterval(() => {
    createRandomDomains(session);
  }, 5000);
};

const createRandomDomains = async (session, relations=false) => {
  // console.log("Creating a record");
  const countRecord = await Domain.count(session);
  const count = countRecord.records[0].get("domainCount").low;
  const domain = await Domain.create(session);
  const result = await domain.save();
  if (count > 10 || relations) {
    // Create N associations per node
    const associationCount = generateRandomRange(1, 4);
    for (var i = 0; i < associationCount; i++) {
      const randomNode = await Domain.randomNode(session);
      await domain.associate(randomNode)
    }
  }
  const associations = await domain.getAssociations();
  // Stubbed out websocket communication. This gets fired whenever an object is created
  Object.keys(clientSockets).forEach(key => {
    clientSockets[key].send(
      JSON.stringify(
        {
          id: result.records[0].get("n").properties.address,
          links: associations
        }
      )
    );
  });
  // Find random data -> remove it
}

module.exports = {
  startBackgroundTask: startBackgroundTask,
  clientSockets: clientSockets,
  createRandomDomains: createRandomDomains
};
