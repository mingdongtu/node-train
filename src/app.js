const http = require('http');
const chalk = require('chalk');
const path = require('path')

const conf = require('../config/defaultConfig.js');
// 解决回调过多的问题
const route = require('../config/help/route')
const server = http.createServer((req,res)=>{
           const filePath = path.join(conf.root,req.url)
          route(req,res,filePath) 

})

server.listen(conf.port,conf.hostname,()=>{
          const addr = 'http://${conf.hostname}:${conf.post}'
        //   console.info('Server started at ${chalk.green(addr)}')
})