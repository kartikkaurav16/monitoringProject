var dotenv = require('dotenv');
dotenv.config({silent: false});
var util = require('util');
var request = require('request');
dotenv.config({silent: true});
let client = require('../config/dbEsConnection')

var ES_URL_index =  process.env.ELASTICSEARCH5_KIBANA_SERVICE_INDEX
const es_service_agreement_query = {
    "query": {
      "bool": {
      "must": [
        {
        "range" : {
            "@timestamp" : {
                "gt": `now-${process.env.range_now}h`, 
                "lte": "now", 
                "time_zone": "+01:00"
            }
        }
      },
      {
        "range": {
      "complete_call_took_ms_num": {
        "gte": 5000
      }
    }
      }
      ]
    }
    }
};

const es_service_agreement_subscription_query = {
    "query": {
      "bool": {
      "must": [
        {
        "range" : {
            "@timestamp" : {
                "gt": `now-${process.env.range_now}h`, 
                "lte": "now", 
                "time_zone": "+01:00"
            }
        }
      },
      {
        "range": {
      "subscription_call_took_ms_num": {
        "gte": 5000
      }
    }
      }
      ]
    }
    }
};

const es_service_agreement_contract_query = {
    "query": {
      "bool": {
      "must": [
        {
        "range" : {
            "@timestamp" : {
                "gt": `now-${process.env.range_now}h`, 
                "lte": "now", 
                "time_zone": "+01:00"
            }
        }
      },
      {
        "range": {
      "contract_call_total_took_ms_num": {
        "gte": 5000
      }
    }
      }
      ]
    }
    }
};

process.env.range_now

//service level agreement query to get total time 
let slaServicePromise = client.search({
    index:  ES_URL_index,
    body: es_service_agreement_query
})

//service level agreement query to get contract total time
let slaServiceContractPromise = client.search({
    index:  ES_URL_index,
    body: es_service_agreement_contract_query
})

//service level agreement query to get contract total time
let slaServicesubscriptionPromise = client.search({
    index:  ES_URL_index,
    body: es_service_agreement_subscription_query
})

Promise.all([slaServicePromise, slaServiceContractPromise, slaServicesubscriptionPromise]).then(data =>  {
let total = data.reduce((totalRecords, currentRecords) =>  {
console.log(" : --> currentRecords " + JSON.stringify(currentRecords,undefined,2))
   totalRecords.push(currentRecords.hits.total)
   return totalRecords
},{});
console.log("total"+ JSON.stringify(total,undefined,2))
}, 
err => {console.log(err)}
);




