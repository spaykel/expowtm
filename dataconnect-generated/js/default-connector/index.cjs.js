const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'career-readiness-program',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

