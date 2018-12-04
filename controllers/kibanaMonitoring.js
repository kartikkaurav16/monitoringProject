var dotenv = require('dotenv');
dotenv.config({silent: false});
var util = require('util');
var request = require('request');
dotenv.config({silent: true});

module.exports = {
    getESData: getESData
}

console.log("range in hr : " + process.env.range_now)
var prefix = process.env.ES_KIBANA_SVC_NAME;
var ES_URL = "http://" + process.env[prefix + '_SERVICE_HOST'] + ":" + process.env[prefix + '_SERVICE_PORT'] +"/";
console.log("ES_URL : "+ ES_URL);
const es_service_agreement_endpoint="apps-prod-get-service-agreements*/_search";
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
      "complete_call_took_ms_num": {
        "gte": 5000
      }
    }
      }
      ]
    }
    }
};

// "input_for_subscription_call"


function getESData(url_endpoint, query, cb) {
    //logger.debug("input_payload : " + JSON.stringify(input_payload, undefined, 2));
    let apiRequest  = {
        url   : ES_URL+url_endpoint,
        method: 'POST',
        json  : true,
       body  :  query,
       headers : {
        'Content-Type' :'application/json',
        'Authorization':'Basic a2thdXJhdjpNUDA0QGhjMTY5Mg=='
    },
      //  timeout : input_payload.timeout
    };

    let promise = new Promise((resolve, reject)=> {
        request( apiRequest, function ( error, response, body ) {
            if(error){
               reject(err); 
            } else {
              resolve(body)
            }
        });
    })
    return promise
};

getESData(es_service_agreement_endpoint,es_service_agreement_query).then(
data => {console.log("data => " + JSON.stringify(data))
}, error => {console.log(err)}
)


//implemented promise 

// function getESData(url_endpoint, query) {
//     //logger.debug("input_payload : " + JSON.stringify(input_payload, undefined, 2));
//     let apiRequest  = {
//         url   : ES_URL+url_endpoint,
//         method: 'POST',
//         json  : true,
//        body  :  query,
//        headers : {
//         'Content-Type' :'application/json',
//         'Authorization':'Basic a2thdXJhdjpNUDA0QGhjMTY5Mg=='
//     },
//       //  timeout : input_payload.timeout
//     };
//     request( apiRequest, function ( error, response, body ) {
//         if(error){
//             console.error(JSON.stringify(" error in connection "+ error));
//         } else {
//             console.log("response "+ JSON.stringify(body,undefined,1))
//         }
//     });
// };

// getESData(es_service_agreement_endpoint,es_service_agreement_query)