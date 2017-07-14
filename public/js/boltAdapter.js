neo4j = neo4j.v1;
let driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "abcde"));
let session = driver.session();

let getAllNodes = () => {
  session
   .run('MATCH (n:Domain) RETURN n')
   .subscribe({
     onNext: function(record) {
       console.log(record);
     },
     onCompleted: function() {
       console.log("closing session");
       session.close();
     }
   });
};

let findNode = (address) => {
  session
   .run('MATCH (n:Domain) WHERE n.address = $searchAddress', {searchAddress: address})
   .subscribe({
     onNext: function(record) {
       console.log(record);
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
