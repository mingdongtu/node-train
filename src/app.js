const http = require('http');
const chalk = require('chalk');
const path = require('path')

const conf = require('./config/defaultConfig');
// 解决回调过多的问题
const route = require('./help/route')
const server = http.createServer((req,res)=>{  //
           const filePath = path.join(conf.root,req.url)
             route(req,res,filePath)   //这个是核心

})

server.listen(conf.port,conf.hostname,()=>{
        //   const addr = 'http://${conf.hostname}:${conf.post}'
        //   console.info('Server started at ${chalk.green(addr)}')
})