
const Domain = require('./models/domain');

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
  // Stubbed out websocket communication. This gets fired whenever an object is created
  Object.keys(clientSockets).forEach(key => {
    clientSockets[key].send(JSON.stringify(result));
  });
  // Find random data -> remove it
}

module.exports = {
  startBackgroundTask: startBackgroundTask
};
