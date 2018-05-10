
const {createGzip,createDeflate} = require('zlib')  //两种压缩方法
module.exports = (rs,req,res)=>{  
          const acceptEncoding = req.headers['accept-encoding'] // 浏览器支持的压缩方式
          if(!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)\b/)){ //如果浏览器不支持任何压缩方式，或者支持的压缩方式不包含我规定的几种
                 return rs   //不做任何处理，将文件原样返回
          }else if(acceptEncoding.match(/\bgzip\b/)){ //如果支持gzip压缩
                   res.setHeader('Content-Encoding','gzip'); //告诉浏览器服务器用的是gzip进行的压缩
                   return rs.pipe(createGzip()) ;  //压缩处理           
          }else if(acceptEncoding.match(/\bdeflate\b/)){
            res.setHeader('Content-Encoding','deflate'); //告诉浏览器服务器用的是deflate进行的压缩
            return rs.pipe(createDeflate()) ;             
   }
}