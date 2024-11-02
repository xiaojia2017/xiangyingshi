var fs = require('fs');
fs.readFile('main.js','utf-8',function(err,data){
    if(err){
        console.error(err);
    }else{
        console.log(data);
    }
})