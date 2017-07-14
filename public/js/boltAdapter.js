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
       session.close();
       createGraph();
     }
   });
};

let findNodeRelationships = (address) => {
  session
   .run(`MATCH (n:Domain {address: $searchAddress})-[r]-(p) \
         RETURN n,p,r`, {searchAddress: address})
   .subscribe({
     onNext: function(record) {
       fullGraphData.links.push(serializeNodesAndRelationships(record));
     },
     onCompleted: function() {
       let links = fullGraphData.links;
       let nodes = [];
       links.forEach(link => {
         Object.keys(link).forEach(key => {
           nodes.push(link[key]);
         });
       });
       fullGraphData.nodes = _.uniq(nodes).map(address => {
         return {id: address}
       })
       session.close();
       createGraph();
     }
   })
};


let establishWebSocket = () => {
  let boltSocket = new WebSocket("ws://localhost:8080");
  boltSocket.onmessage = function(event) {
    switch (event.data) {
      case "killItAll":
         fullGraphData.nodes = [];
         fullGraphData.links = [];
      default:
         fullGraphData.nodes.push(JSON.parse(event.data));
         const relData = JSON.parse(event.data).links.records;
         if (relData[0] && relData[0]._fields){
           relData.forEach(linkData => {
             const link = serializeNodesAndRelationships(linkData);
             fullGraphData.links.push(link)
           });
         }
    }
   restart();
  };
};
