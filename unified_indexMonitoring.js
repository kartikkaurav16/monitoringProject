'use strict';

var dotenv = require('dotenv');
dotenv.config({silent: false});
var util = require('util');
var request = require('request');


var prefix = process.env.ES_AUTHR_SVC_NAME;
var ES_URL = "http://" + process.env[prefix + '_SERVICE_HOST'] + ":" + process.env[prefix + '_SERVICE_PORT'] +"/";
console.log("ES_URL : "+ ES_URL);


module.exports = {
    getESData : getESData
};

const es_unifiedAuthR_endpoint="unified_authr_cco_v1_p4/_search";
const es_unifiedAuthR_query = {"query":{"match":{"source":{"query":"CCO"}}},"size":0,"aggs":{"max_quantity":{"max":{"field":"lastUpdatedDate"}}}};

function getESData(url_endpoint, query) {
    //logger.debug("input_payload : " + JSON.stringify(input_payload, undefined, 2));
    var apiRequest  = {
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
var promise = new Promise ((resolve, reject) => {
    request( apiRequest, function ( error, response, body ) {
        if(error){
           reject(error)
        } else {
            resolve(body)
        }
    });
} )

return promise
  
}


getESData(es_unifiedAuthR_endpoint,es_unifiedAuthR_query).then(data => {
    console.log("total count SLA service : " +JSON.stringify(data))
}, 
err => {
    console.log("error occoured: " + err )
})



