const functions = require("firebase-functions");
// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
admin.initializeApp();
const fetch = require("node-fetch");
var fs = require('fs');
const path = require('path');
const { run } = require("googleapis/build/src/apis/run");

//you api AIzaSyBQ4HoKB5aAx2vV5RgW97v-qflPqY_dH64


// The Chartist function uploads json to the database with order as the id
// the other functions are for adding tags and should be 
// tagdefault>tagcounter> then genre add repeatedly until tags are a;; added

exports.chartist = functions.https.onRequest((request, response) => {
    let data;
    try {
       data = JSON.parse(fs.readFileSync('/Users/Jacob/Documents/webDev/tubecharts/functions/safe.json','utf8'));
      console.log('got data')

    } catch (err) {
      console.error(err)
    }


new Promise((res,rej)=>{
data.forEach(hit =>{
  const title=hit.rank+''
  console.log(title)
admin.firestore().collection("safe").doc(title).set(hit)
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
  timeoutSeconds: 180,
  memory: '1GB'
}
exports.genreAdd = functions.runWith(runtimeOpts).https.onRequest((request, response) => {


addgen();
function addgen(){ admin.firestore().collection('main').where("tagcount", "==", 1).limit(10000).get()
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
  function addgen(){ admin.firestore().collection('safe').get()
    .then( function(querySnapshot) {
      querySnapshot.docs.forEach( function(doc) {
        console.log('firebase:',doc.data().song);

        doc.ref.update({
        
                        tagcount:doc.data().tags.length
                      })
      })
      response.send('done')
    })
  }})

  exports.tagdefault= functions.runWith(runtimeOpts).https.onRequest((request, response) => {

    addgen();
    function addgen(){ admin.firestore().collection('safe').get()
      .then( function(querySnapshot) {
        querySnapshot.docs.forEach( function(doc) {
          console.log('firebase:',doc.data().song);
  
          doc.ref.update({
            tags: admin.firestore.FieldValue.arrayUnion("default"),
                          
                        })
        })
        response.send('done')
      })
    }})

    exports.updater= functions.runWith(runtimeOpts).https.onRequest((request, response) => {

      addgen();
      function addgen(){ admin.firestore().collection('main').get()
        .then( function(querySnapshot) {
          querySnapshot.docs.forEach( function(doc) {
            console.log('firebase:',doc.data().song);
              let d = Math.floor(doc.data().year/10) %10;
              d=d+'0s';
            doc.ref.update({
            decade: d,       
                          })
          })
          response.send('done')
        })
      }})

      exports.tagLister= functions.runWith(runtimeOpts).https.onRequest((request, response) => {

        addgen();
        function addgen(){ admin.firestore().collection('main').get()
          .then( function(querySnapshot) {
            querySnapshot.docs.forEach( function(doc) {
              console.log('firebase:',doc.data().tags);
              doc.data().tags.forEach((tag)=>{
                if(tag !='default'){
                  tag=tag.replace(/\//, ' or');
                admin.firestore().collection('tags').doc(tag).set(
                  {name: tag,
                  count: admin.firestore.FieldValue.increment(1)},
                  {merge:true})
              }})

           
            })
            response.send('done')
          })
        }})