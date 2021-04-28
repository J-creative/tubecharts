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

const logger = fs.createWriteStream('log.txt', {
  flags: 'a' // 'a' means appending (old data will be preserved)
})



function searchify(str){ //turns into search query
str = str.replace(/\s+/g, '+').replace(/&+/g, '%26').toLowerCase();
return str
}
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const data =await JSON.parse(fs.readFileSync('/Users/Jacob/Documents/webDev/tubecharts/functions/sample.json','utf8'));
  console.log(data);
  await page.goto('https://youtube.com');
  await new Promise((resolve)=>setTimeout(resolve,10000))



let i=0;
for (const music of data) { 
        
        artist =searchify(music.artist)
        song =searchify(music.song)
        console.log(ytBase+artist+'+'+song);
      await page.goto(ytBase+artist+'+'+song,{waitUntil: 'domcontentloaded'});
      
      //end of both is dif
      await new Promise((resolve)=>setTimeout(resolve,3000))
      const newRecord = await page.evaluate(()=>{
        let ouput = 0;
        const v1 = 'ytd-video-renderer.ytd-item-section-renderer:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > ytd-video-meta-block:nth-child(2) > div:nth-child(1) > div:nth-child(2) > span:nth-child(1)'
        const v2= 'ytd-video-renderer.ytd-item-section-renderer:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > ytd-video-meta-block:nth-child(2) > div:nth-child(1) > div:nth-child(2) > span:nth-child(1)'
        // const v3= 'ytd-video-renderer.ytd-item-section-renderer:nth-child(3) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ytd-video-meta-block:nth-child(2) > div:nth-child(1) > div:nth-child(2) > span:nth-child(1)'
        // const v4= 'ytd-video-renderer.ytd-item-section-renderer:nth-child(4) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ytd-video-meta-block:nth-child(2) > div:nth-child(1) > div:nth-child(2) > span:nth-child(1)'
        // const v5= 'ytd-video-renderer.ytd-item-section-renderer:nth-child(5) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ytd-video-meta-block:nth-child(2) > div:nth-child(1) > div:nth-child(2) > span:nth-child(1)'

        const view1 =document.querySelector(v1) ? document.querySelector(v1).innerHTML: '100 views';
        const view2 =document.querySelector(v2) ? document.querySelector(v2).innerHTML: '100 views';
        // const view3 = document.querySelector(v3).innerHTML;
        // const view4 = document.querySelector(v4).innerHTML;
        // const view5 = document.querySelector(v5).innerHTML;
        //let views = document.evaluate("view1", document, null, XPathResult.ANY_TYPE, null);
        console.log(view2);

        function numberize(str){ 
          if(!str){return 0}//turns into search query
          str = str.replace(/ views/g, '').replace(/K/g, '000').replace(/M/g, '000000').replace(/B/g, '000000000');
          if(str.match(/\./g, '000')){str = str.replace(/00/, '').replace(/\./, '0')}
          return parseInt(str)
          }
        
        
        function viewCount(w1,w2,w3,w4,w5){
        let v1=numberize(w1)
        let v2=numberize(w2)
        let v3=numberize(w3)
        let v4=numberize(w4)
        let v5=numberize(w5)
        result=v1+v2+v3;
        if(v1==0||v2==0 ||v3==0 ){
          result = result+v4;
          if(v4==0){result=result+v5}
        }
        console.log(result)
        result=result.toString
        console.log(result)
        return(result)
        }
        
        return output;

        })
        
        logger.write(newRecord+'\r\n');
        i++;
       await new Promise((resolve)=>setTimeout(resolve,500))
 } //forEach
  await new Promise((resolve)=>setTimeout(resolve,3000))
  await page.screenshot({ path: 'example.png' });

  await browser.close();
})();

