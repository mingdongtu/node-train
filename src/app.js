const http = require('http');
const chalk = require('chalk');
const path = require('path')
const conf = require('./config/defaultConfig');
const route = require('./help/route')
const openUrl = require('./help/openUrl')
class Server {
          constructor (config){
                   this.conf = Object.assign({},conf,config)
          }
          start(){
                // 解决回调过多的问题

const server = http.createServer((req,res)=>{  //
        const filePath = path.join(this.conf.root,req.url)
          route(req,res,filePath,this.conf)   //这个是核心

})

server.listen(this.conf.port,this.conf.hostname,()=>{
       const addr = `http://${this.conf.hostname}:${this.conf.port}`
       console.info(`Server started at ${chalk.green(addr)}`)
       openUrl(addr)
})
          }
}

module.exports = Server;
