
const dataGenerators = require('../data/loadData');

class Domain {
  constructor() {
    if (Math.random() > .5) {
      this.address = dataGenerators.generateRandomIPAddress();
    } else {
      this.address = dataGenerators.generateRandomDomain();
    }
  }

  static create () {
    return new Domain();
  }

  static count () {
    // Stub neo4j COUNT code here
    // match (n:Domain)
    // return count(n)
  }

  static randomNode (address) {
    // Stub neo4j MATCH code here
    // MATCH (u:Domain)
    // WITH u, rand() AS number
    // RETURN u
    // ORDER BY number
    // LIMIT 1

  }

  save() {
    // Stub neo4j CREATE code here
    // CREATE (n:Domain {address: this.address})
  }

  destroy() {
    // Stub neo4j DELETE code here
    // MATCH (n:Domain) WHERE n.address = this.address
    // DELETE n;
  }

  associate(otherDomain) {
    // Stub neo4j relationship code here
    // MATCH (n:Domain) WHERE n.address = this.address
    // MATCH (o:Domain) WHERE o.address = otherDomain.address
    // CREATE (n)-[:CONNECT]->(o)
    // RETURN n,o
  }

}

module.exports = Domain;
