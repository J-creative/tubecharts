const puppeteer = require('puppeteer');

const ytBase= 'https://www.youtube.com/results?search_query=';
const data = [
  {artist:'oasis',
  song:'wonderwall'},
  {artist:'nirvana',
  song:'smells like teen spirit'},
  {artist:'the crystals',
  song:'de do ran ran'}
]

function plusReplace(str){
str = str.replace(/\s+/g, '+').toLowerCase();
return str
}
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://youtube.com');
  await new Promise((resolve)=>setTimeout(resolve,10000))

  data.forEach(async (music)=>{
    let artist = plusReplace(music.artist)
    let song = plusReplace(music.song)
  await page.goto(ytBase+artist+'+'+song,{waitUntil: 'networkidle2'});
  //end of both is dif
  await new Promise((resolve)=>setTimeout(resolve,3000))
  await page.evaluate(()=>{
    const v1 = 'ytd-video-renderer.ytd-item-section-renderer:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > ytd-video-meta-block:nth-child(2) > div:nth-child(1) > div:nth-child(2) > span:nth-child(1)'
    const v2= 'ytd-video-renderer.ytd-item-section-renderer:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > ytd-video-meta-block:nth-child(2) > div:nth-child(1) > div:nth-child(2) > span:nth-child(1)'
    const v3= 'ytd-video-renderer.ytd-item-section-renderer:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ytd-video-meta-block:nth-child(2) > div:nth-child(1) > div:nth-child(2) > span:nth-child(1)'

    const views = document.querySelector(v1).innerText;
    //let views = document.evaluate("view1", document, null, XPathResult.ANY_TYPE, null);
    console.log(views);
  
  })
  await new Promise((resolve)=>setTimeout(resolve,2000))
 } )//forEach
  await new Promise((resolve)=>setTimeout(resolve,300000))
  await page.screenshot({ path: 'example.png' });

  await browser.close();
})();