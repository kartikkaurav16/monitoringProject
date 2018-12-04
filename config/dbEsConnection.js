

var elasticsearch = require('elasticsearch');
var dotenv = require('dotenv');
var request = require('request');
dotenv.config({silent: true});
var prefix = process.env.ES_KIBANA_SVC_NAME;

var ES_URL_client =  process.env[prefix + '_SERVICE_HOST'] 

//ES Connection 
var client = new elasticsearch.Client({
  host: [
    {
      host: ES_URL_client,
      auth: 'kkaurav:MP04@hc1692',
      port: 8000
    }
  ]
});


module.exports = client; 


