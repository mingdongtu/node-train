
const fs = require('fs')
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
module.exports = async function(req,res,filePath){
    try{
        const stats = await stat(filePath);   //await 只能在async方法中使用
        if(stats.isFile()){   //文件
           res.statusCode = 200;
           res.setHeader('Content-Type','text/plain');
           fs.createReadStream(filePath).pipe(res);
           // res.end(res)
        }else if(stats.isDirectory()){  //文件夹
               fs.readdir(filePath,(err,files)=>{
                   res.statusCode = 200;
                   res.setHeader('Content-Type','text/plain');
                   // 将文件夹下的内容读取出来
                   res.end(files.join(','));
               })
        }
    }catch(ex){
       res.statusCode = 404;
       res.setHeader('Content-Type','text/plain');  
       res.end('${filePath} is not a directory or file');
       return; 
    }
   
}
