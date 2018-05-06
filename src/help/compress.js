
const {createGzip,createDeflate} = require('zlib')
module.exports = (rs,req,res)=>{  
          const acceptEncoding = req.headers['accept-encoding']
          if(!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)\b/)){
                 return rs   //可读流
          }else if(acceptEncoding.match(/\bgzip\b/)){
                   res.setHeader('Content-Encoding','gzip'); //告诉浏览器服务器用的是gzip进行的压缩
                   return rs.pipe(createGzip()) ;             
          }else if(acceptEncoding.match(/\bdeflate\b/)){
            res.setHeader('Content-Encoding','deflate'); //告诉浏览器服务器用的是gzip进行的压缩
            return rs.pipe(createDeflate()) ;             
   }
}