const functions = require("firebase-functions");
// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
admin.initializeApp();
const fetch = require("node-fetch");
var fs = require('fs');
const path = require('path')

//you api AIzaSyBQ4HoKB5aAx2vV5RgW97v-qflPqY_dH64


exports.chartist = functions.https.onRequest((request, response) => {
    let data;
    try {
       data = JSON.parse(fs.readFileSync('/Users/Jacob/Documents/webDev/tubecharts/functions/sample.json','utf8'));
      console.log('got data')

    } catch (err) {
      console.error(err)
    }


new Promise((res,rej)=>{
data.forEach(hit =>{
admin.firestore().collection("safe").add(hit)
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

const runtimeOpts = {
  timeoutSeconds: 120,
  memory: '1GB'
}
exports.genreAdd = functions.runWith(runtimeOpts).https.onRequest((request, response) => {

//get the data from firestore
// async function addGen(){
//  admin.firestore().collection('sample').get()
//   .then( (dataSnap)=>{
//     console.log(dataSnap);
//     dataSnap.map(async doc=>{
//         console.log('in',doc.data().artist);
//         const response = await fetch(`https://musicbrainz.org/ws/2/artist?query=${doc.data().artist}&limit=3&inc=tags&fmt=json`);
//         const data = await response.json();
//         const artobject= data.artists[0];
//          doc.ref.set({artobject},{merge:true})
//     })

// }).then( (res)=> response.send(res)).catch((err)=>console.log(err))
// }
// addGen();

// new Promise((res,rej)=>{
//   let docs;
//   admin.firestore().collection('safe').get()
//   .then( function(querySnapshot) {
//      docs=querySnapshot
//   })
  
//   res(docs);
//   rej('fail');
//   }).then((docs)=>{
//     docs.forEach((doc)=>{


//     })

//   })
//   .catch((rej2)=>  response.send(rej2))
  

addgen();
function addgen(){ admin.firestore().collection('nineforty').where("tagcount", "==", 1).get()
  .then(async function(querySnapshot) {
    await Promise.allSettled( querySnapshot.docs.map(async function(doc) {
      console.log('firebase:',doc.data().song);

         const response = await fetch(`https://musicbrainz.org/ws/2/artist?query=${doc.data().artist}&limit=3&inc=tags&fmt=json`);
        const data = await response.json();
      let midtag
        if(data.artists[0].tags){ midtag= await data.artists[0].tags;
        const tags= await midtag.map((ob)=> ob.name)
         console.log('brainz',tags);
// update each document
     await doc.ref.set({tags:tags},{merge:true})
     console.log(doc.data().artist,'set');}else{console.log(data.artists[0].name,'had none')}
 
  }));
  console.log('complete---------------------------');
  })    .then((res) => {
    console.log("Documents successfully updated with random!");
    response.send(res)
})
.catch((error) => {
    // The document probably doesn't exist.
    console.error("Error updating document: random", error);
});   
 }

})

exports.tagcounter= functions.runWith(runtimeOpts).https.onRequest((request, response) => {

  addgen();
  function addgen(){ admin.firestore().collection('nineforty').get()
    .then( function(querySnapshot) {
      querySnapshot.docs.forEach( function(doc) {
        console.log('firebase:',doc.data().song);

        doc.ref.update({
          //tags: admin.firestore.FieldValue.arrayUnion("default"),
                        tagcount:doc.data().tags.length
                      })
      })
      response.send('done')
    })
  }})