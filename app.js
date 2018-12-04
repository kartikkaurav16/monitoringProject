var dotenv = require('dotenv');
var bodyParser  = require('body-parser');
var fs = require('fs');
var app = require('express')();
//var config = require('config');
dotenv.config({silent: true});
let getSlaData = require('./controllers/serviceLevelAgreementSLA'); 

let client = require('./config/dbEsConnection')
 //let kibanaData = require('./controllers/kibanaMonitoring')

client.ping({
    requestTimeout: 30000
}, function(error, resp) {
    if (error) {
        console.trace('Error:', error);
    } else {
        console.log('Connected!' + resp);
    }
   // client.close();
});

module.exports = app; 
