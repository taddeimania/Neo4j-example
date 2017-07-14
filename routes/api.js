'use strict';

const Domain = require('../models/domain');
const createRandomDomains = require('../watcher').createRandomDomains;
const clientSockets = require('../watcher').clientSockets;

module.exports = {
  destroyEverything: {
    route: async (req, res) => {
      await Domain.destroyEverything(req.dbSession);
      Object.keys(clientSockets).forEach(key => { clientSockets[key].send("killItAll"); });
      res.status(204).json({});
    },
    describe: {
      responses: {
        204: {
          description: "Remote control endpoint to delete all nodes"
        }
      }
    }
  },
  createDomains: {
    route: (req, res) => {
      const count = req.params.count;
      for (var i = 0; i < count; i++) {
        createRandomDomains(req.dbSession, true);
      }
      res.status(201).json({message: `Creating ${count} domains. Check back later.`})
    },
    describe: {
      responses: {
        201: {
          description: "Asyncronously create N domains and random relationships"
        }
      }
    }
  }
}
