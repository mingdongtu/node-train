
const fs = require('fs')
const path = require('path')
const Handlebars = require('handlebars')

const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const config = require('../config/defaultConfig.js')
const tplPath = path.join(__dirname,'../template/dir.tpl')
const source = fs.readFileSync(tplPath) ; //采用同步方法来执行 ;这里返回的是一个buffer数据
const template = Handlebars.compile(source.toString())   
module.exports = async function(req,res,filePath){
    try{
        const stats = await stat(filePath);   //await 只能在async方法中使用
        if(stats.isFile()){   //文件
           res.statusCode = 200;
           res.setHeader('Content-Type','text/plain');
           fs.createReadStream(filePath).pipe(res);
           // res.end(res)
        }else if(stats.isDirectory()){  //文件夹
            const files =await readdir(filePath)
            res.statusCode = 200;
            res.setHeader('Content-Type','text/html');
            const dir = path.relative(config.root,filePath)
            // 定义接口将要返回的内容
            const data = {
                  title:path.basename(filePath),
                //   dir:path.relative(config.root,filePath),
                  dir:dir ? `/${dir}` : '',
                  files
            }
            // 将文件夹下的内容读取出来
            res.end(template(data));
         
        }
    }catch(ex){
       res.statusCode = 404;
       res.setHeader('Content-Type','text/plain');  
       res.end(`${filePath} is not a directory or file`);
       return; 
    }
   
}
