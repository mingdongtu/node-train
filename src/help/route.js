
const fs = require('fs')
const path = require('path')
const Handlebars = require('handlebars')

const promisify = require('util').promisify;
const stat = promisify(fs.stat);  //fs.stat 获取文件的状态信息
const readdir = promisify(fs.readdir);//
// const config = require('../config/defaultConfig.js')  //这个是变的，读不到用户的自定义输入
const tplPath = path.join(__dirname,'../template/dir.tpl')
const source = fs.readFileSync(tplPath) ; //采用同步方法来执行 ,读取文件的全部内容
const template = Handlebars.compile(source.toString())   
const mime = require('./mime.js')
const compress = require('./compress.js')  //引用压缩方法
const range = require('./range.js')   //核心还是处理文件流

module.exports = async function(req,res,filePath,config){   //输出一个匿名函数
    
    try{   //尝试执行代码块
        const stats = await stat(filePath);   //await 只能在async方法中使用 ：回调结果
       const contentType = mime(filePath)
          if(stats.isFile()){   //文件
           res.statusCode = 200;
           res.setHeader('Content-Type',contentType);
    // 处理请求范围的问题
     let rs ;
    const {code,start,end} = range(stats,req,res)
     if(code === 2000){  //处理不了
            rs = fs.createReadStream(filePath)
     }else{ 
            rs = fs.createReadStream(filePath,{start,end})
     }
        //    let rs = fs.createReadStream(filePath)
           
           if(filePath.match(config.compress)){  //文件符合条件才压缩
               rs = compress(rs,req,res)   // 对文件流进行压缩
           }
           rs.pipe(res)
        //    fs.createReadStream(filePath).pipe(res);
           // res.end(res)
        }else if(stats.isDirectory()){  
            const files =await readdir(filePath)  //返回文件名的数组
            res.statusCode = 200;  
            res.setHeader('Content-Type','text/html');
            const dir = path.relative(config.root,filePath)
            // 定义接口将要返回的内容
            const data = {
                  title:path.basename(filePath),
                //   dir:path.relative(config.root,filePath),
                  dir:dir ? `/${dir}` : '',
                  files :files.map(file =>{
                         return {
                               file,
                               icon:mime(file)
                         }
                  })
            }
            // 将文件夹下的内容读取出来
            res.end(template(data));
         
        }
    }catch(ex){  //try执行错误时执行下面的代码
       res.statusCode = 404;
       res.setHeader('Content-Type','text/plain');  
       res.end(`${filePath} is not a directory or file`);
       return; 
    }
   
}
