// var BackandSDK = require('backandsdk/backand');
// var backand = new BackandSDK();

exports.backandCallback = function(dbRow, parameters, userProfile, response) {
    // README - Here is the starting point of your code.
    // Do not change the signature of backandCallback.
    // Do not exit anywhere from your code, meaning, do not use process.exit
    // Backand will take care of that for you
    // You should call the response callback: function(err, data) { ... }
    // err (Error): The error object returned from the request. Set to null if the request is successful.
    // data (Object): The de-serialized data returned from the request. Set to null if a request error occurs.
    
    // Bellow is an example of how to handle success and failure of your code

    var fs = require('fs');

    var json = backand.get('/1/objects/Card/1/');
    var card = JSON.parse(json);
    
    var token = card.field.token;
    var ip = ""; //do this later
    var merchantID ="";
    var transactionType = "";
    var amount = "";
    
    var args = new Array();
    args['DonorIPAddress'] = ip;
    args['CardToken'] = token;
    args['MerchantAccountID'] = merchantID;
    args['TransactionType'] = transactionType;
    args['Amount'] = amount;
    
    var soap = require('soap');
    var restClient = require('node-rest-client').Client;

    function callSoapService(wsdl, methodName, args)
    {
        soap.createClient(wsdl, function(err, client) {
            client[methodName](args, function(err, result) {
                console.log(result);
            });
        });
    }

    var wsdl = 'http://www.xmlme.com/WSDailyNet.asmx?WSDL'; //dunno what we want for this

    callSoapService(wsdl, 'ProcessCardNotPresent', args);
}

// To run a demo of how to perform CRUD (Create, Read, Update and Delete) with Backand SDK, do the following:
// 1. npm install backandsdk --save
// 2. Change runBackandSDKDemo to true
// 3. Uncomment the function backandCrudDemo and the two first variables BackandSDK and backand
// 4. Uncomment the call for the function backandCrudDemo

// function backandCrudDemo(){
//
//     var masterToken = "b50a5125-769c-472f-9287-6ba227818f2e"; //<put here the master token that you run in the action init>;
//     var userToken = "83d0f58e-f60d-11e5-b112-0ed7053426cb"; //<put here the user token that you run in the action init>;
//     var token = masterToken + ":" + userToken;
//
//     return backand.basicAuth(token)
//         .then(function() {
//             return backand.post('/1/objects/items' /* url for create */, {"name":"new item", "description":"new item description"} /* data to post */)
//         })
//         .then(function(result) {
//             console.log("create", result);
//             return backand.get('/1/objects/items' /* url to read a list */)
//         })
//         .then(function(result) {
//             console.log("read a list", result);
//             return backand.get('/1/objects/items/1' /* url to read a one */)
//         })
//         .then(function(result) {
//             console.log("read one", result);
//             return backand.put('/1/objects/items/1' /* url to update */, {"name":"new item change", "description":"new item description change"} /* data to post */)
//         });
// }
