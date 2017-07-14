

let serializeNodesAndRelationships = (record) => {
  let returnObject = {};
  let first = record._fields[0];
  let second = record._fields[1];
  let connection = record._fields[2];

  returnObject.source = _.isEqual(first.identity, connection.start) ? first.properties.address : second.properties.address;
  returnObject.target = _.isEqual(first.identity, connection.end) ? first.properties.address : second.properties.address;
  return returnObject;
};

/*

connection = source&address -> target&address

*/
