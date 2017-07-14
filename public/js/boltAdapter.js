neo4j = neo4j.v1;
let driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "abcde"));
let session = driver.session();

let getAllNodes = () => {
  session
   .run('MATCH (n:Domain) RETURN n')
   .subscribe({
     onNext: function(record) {
       fullGraphData.nodes.push({id: record.get(0).properties.address});
     },
     onCompleted: function() {
       console.log("getting all relationships");
       getAllNodeRelationships();
     }
   });
}

let getAllNodeRelationships = () => {
  session
   .run('MATCH (n:Domain)-[r]-(p) \
         RETURN n,p,r')
   .subscribe({
     onNext: function(record) {
       fullGraphData.links.push(serializeNodesAndRelationships(record));
     },
     onCompleted: function() {
       console.log("closing session");
       session.close();
       createGraph();
     }
   });
};

let findNode = (address) => {
  session
   .run('MATCH (n:Domain {address: $searchAddress})-[r]-(p) \
         RETURN n,p,r', {searchAddress: address})
   .subscribe({
     onNext: function(record) {
       serializeNodesAndRelationships(record);
       // console.log(record);
     },
     onCompleted: function() {
       session.close();
     }
   })
};


let establishWebSocket = () => {
  let boltSocket = new WebSocket("ws://localhost:8080");
  boltSocket.onmessage = function(event) {
   console.log(JSON.parse(event.data));
  };
};
