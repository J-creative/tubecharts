const puppeteer = require('puppeteer');
var fs = require('fs');

const ytBase= 'https://www.youtube.com/results?search_query=';
// const data = [
//   {artist:'oasis',
//   song:'wonderwall'},
//   {artist:'nirvana',
//   song:'smells like teen spirit'},
//   {artist:'the crystals',
//   song:'de do ran ran'}
// ]

const logger = fs.createWriteStream('dafe.txt', {
  flags: 'a' // 'a' means appending (old data will be preserved)
})



function searchify(str){ //turns into search query
str = str.replace(/\s+/g, '+').replace(/&+/g, '%26').toLowerCase();
return str
}
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const data =await JSON.parse(fs.readFileSync('/Users/Jacob/Documents/webDev/tubecharts/functions/1940on.json','utf8'));
  console.log(data);
  await page.goto('https://youtube.com');
  await new Promise((resolve)=>setTimeout(resolve,0000))
  await page.click("#yDmH0d > c-wiz > div > div > div > div.NIoIEf > div.G4njw > div.qqtRac > form > div.lssxud > div > button > span")
  await page.setViewport({
    width: 1000,
    height: 1000,
    deviceScaleFactor: 1,
  });
  await new Promise((resolve)=>setTimeout(resolve,1000))



  let i=6394;    
for (const music of data) { 
    
        artist =searchify(music.artist)
        song =searchify(music.song)
      await page.goto(ytBase+artist+'+'+song,{waitUntil: 'domcontentloaded'});
      //end of both is dif
      //await new Promise((resolve)=>setTimeout(resolve,3000))
      const newRecord = await page.evaluate(()=>{
        const v1 = 'ytd-video-renderer.ytd-item-section-renderer:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > ytd-video-meta-block:nth-child(2) > div:nth-child(1) > div:nth-child(2) > span:nth-child(1)'
        const v2= 'ytd-video-renderer.ytd-item-section-renderer:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > ytd-video-meta-block:nth-child(2) > div:nth-child(1) > div:nth-child(2) > span:nth-child(1)'
        const v3= 'ytd-video-renderer.ytd-item-section-renderer:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > ytd-video-meta-block:nth-child(2) > div:nth-child(1) > div:nth-child(2) > span:nth-child(1)'
        const v4= 'ytd-video-renderer.ytd-item-section-renderer:nth-child(4) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > ytd-video-meta-block:nth-child(2) > div:nth-child(1) > div:nth-child(2) > span:nth-child(1)'
        const v5= 'ytd-video-renderer.ytd-item-section-renderer:nth-child(5) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > ytd-video-meta-block:nth-child(2) > div:nth-child(1) > div:nth-child(2) > span:nth-child(1)'

        let view1 = document.querySelector(v1) ? document.querySelector(v1).innerHTML : '0';
        let view2 = document.querySelector(v2) ? document.querySelector(v2).innerHTML : '0';
        let view3 = document.querySelector(v3) ? document.querySelector(v3).innerHTML : '0';
        let view4 = document.querySelector(v4) ? document.querySelector(v4).innerHTML : '0';
        let view5 = document.querySelector(v5) ? document.querySelector(v5).innerHTML : '0';
        //let views = document.evaluate("view1", document, null, XPathResult.ANY_TYPE, null);
        let viewObject = {
          v1:view1,
          v2:view2,
          v3:view3,
          v4:view4,
          v5:view5,
        }
        views=JSON.stringify(viewObject)
        return(
          views
        )

        })
        console.log('rec',newRecord);
        let parsed=JSON.parse(newRecord)
        let viewsSum=viewCount(parsed)
        console.log('views',viewsSum);
        let int = parseInt(viewsSum);
        let stringed = JSON.stringify(int)
        console.log('string',stringed);
        let j = parseInt(i)
        
        let art = JSON.stringify(music.artist);
        let sng = JSON.stringify(music.song);
        console.log(sng);
        let yr = JSON.stringify(music.year);
        logger.write(JSON.stringify(j));  logger.write('\t');logger.write(art);  logger.write('\t');logger.write(sng);  logger.write('\t');logger.write(yr);  logger.write('\t');logger.write(stringed); 
        logger.write('\n');
        i=i+1;
       //await new Promise((resolve)=>setTimeout(resolve,500))
 } //forEach
  await new Promise((resolve)=>setTimeout(resolve,3000))
  await page.screenshot({ path: 'example.png' });

  await browser.close();
})();

function numberize(str){ 
  console.log(str);
    if(!str){return 0}//turns into search query
    str = str.replace(/ views/g, '').replace(/K/g, '000').replace(/M/g, '000000').replace(/B/g, '000000000');
    if(str.match(/\./g, '000')){str = str.replace(/0/, '').replace(/\./, '')}
    return parseInt(str)
    }


function viewCount(viewObject){
let v1=numberize(viewObject.v1)
let v2=numberize(viewObject.v2)
let v3=numberize(viewObject.v3)
let v4=numberize(viewObject.v4)
let v5=numberize(viewObject.v5)
result=v1+v2+v3;
if(v1==0||v2==0 ||v3==0 ){
  result = result+v4;
  if(v4==0){result=result+v5}
}
console.log('bs',result)
return(result)
}