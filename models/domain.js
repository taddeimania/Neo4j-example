
const dataGenerators = require('../data/loadData');

class Domain {
  constructor(session) {
    this._session = session;
    if (Math.random() > .5) {
      this.address = dataGenerators.generateRandomIPAddress();
    } else {
      this.address = dataGenerators.generateRandomDomain();
    }
  };

  static create (session) {
    return new Domain(session);
  };

  static count (session) {
    return session.run(
      'MATCH (n:Domain) RETURN count(n) as domainCount;'
    );
  };

  static randomNode (session, count=1) {
    return session.run(
      'MATCH (n:Domain) WITH n, rand() AS number RETURN n.address ORDER BY number LIMIT $count',
      {count: count}
    );
  };

  static randomNodes (session, count) {
    return this.randomNode(session, count);
  };

  save() {
    return this._session.run(
      'CREATE (n:Domain {address: $address}) RETURN n',
      {address: this.address}
    );
  };

  destroy() {
    // Stub neo4j DELETE code here
    // MATCH (n:Domain) WHERE n.address = this.address
    // DELETE n;
  };

  associate(randomNode) {
    const otherDomain = randomNode.records[0].get(0)
    return this._session.run(
     `MATCH (n:Domain) WHERE n.address = $myAddress
      MATCH (o:Domain) WHERE o.address = $otherAddress
      CREATE (n)-[:CONNECT]->(o)
      RETURN n,o`,
      {myAddress: this.address, otherAddress: otherDomain}
    );
    // Stub neo4j relationship code here
  };

  getAssociations() {
    return this._session.run(
     `MATCH (n:Domain {address: $myAddress})-[r]-()
      RETURN n,r`,
      {myAddress: this.address}
    );
  };

}

module.exports = Domain;
