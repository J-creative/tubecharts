function numberize(str){ 
    if(!str){return 0}//turns into search query
    str = str.replace(/ views/g, '').replace(/K/g, '000').replace(/M/g, '000000').replace(/B/g, '000000000');
    if(str.match(/\./g, '000')){str = str.replace(/0/, '').replace(/\./, '')}
    return parseInt(str)
    }

    console.log(numberize('10K views'));
    //wrong    if(str.match(/\./g, '000')){str = str.replace(/00/, '').replace(/\./, '0')}