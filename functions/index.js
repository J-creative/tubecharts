const functions = require("firebase-functions");
// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
admin.initializeApp();
const fetch = require("node-fetch");
var fs = require('fs');
const path = require('path')

exports.chartist = functions.https.onRequest((request, response) => {
    let data;
    try {
       data = JSON.parse(fs.readFileSync('/Users/Jacob/Documents/webDev/tubecharts/functions/testdata.json','utf8'));
      console.log('got data')

    } catch (err) {
      console.error(err)
    }


new Promise((res,rej)=>{
data.forEach(hit =>{
    delete hit.rank;
    delete hit.misc;
    rand = Math.floor(Math.random()*1000000000);
    rand2 = Math.floor(Math.random()*1000000000);
    rehit = {...hit, views:rand, score:rand2 }
admin.firestore().collection("main").add(rehit)
})

res('sucess');
rej('fail');
}).then((res2)=>  response.send(res2))
.catch((rej2)=>  response.send(rej2))

});
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});
