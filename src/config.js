// code to set different environment or profile
var environments = {};

environments.local = {
  'port': 3000,
  'environmentName': 'localhost'
};

environments.production = {
  'port': 5000,
  'environmentName': 'production'
};

environments.test = {
  'port': 4000,
  'environmentName': 'testing'
}

// code to check environment if selected otherwise default to local
var choosenEnvironment = typeof(process.env.NODE_ENV) !== 'undefined' ? process.env.NODE_ENV : 'local';
// code to check if the environment selected available otherwise default to local
var environmentToExport = typeof(environments[choosenEnvironment]) === 'object' ? environments[choosenEnvironment] : environments.local;
// code to export the environment selected
module.exports = environmentToExport;
