

let serializeNodesAndRelationships = (record) => {
  let returnObject = {};
  let first = record.get(0);
  let second = record.get(1);
  let connection = record.get(2);

  returnObject.source = _.isEqual(first.identity, connection.start) ? first.properties.address : second.properties.address;
  returnObject.target = _.isEqual(first.identity, connection.end) ? first.properties.address : second.properties.address;
  return returnObject;
};

/*

connection = source&address -> target&address

*/
