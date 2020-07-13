// code to set different environment or profile
var environments = {};

environments.local = {
  'httpPort': 3000,
  'httpsPort': 3001,
  'environmentName': 'localhost'
};

environments.production = {
  'httpPort': 5000,
  'httpsPort': 5001,
  'environmentName': 'production'
};

// code to check environment if selected otherwise default to local
var choosenEnvironment = typeof(process.env.NODE_ENV) !== 'undefined' ? process.env.NODE_ENV : 'local';
// code to check if the environment selected available otherwise default to local
var environmentToExport = typeof(environments[choosenEnvironment]) === 'object' ? environments[choosenEnvironment] : environments.local;
// code to export the environment selected
module.exports = environmentToExport;
