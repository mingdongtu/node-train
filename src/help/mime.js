const path = require('path')
const mimeTypes = {
        "css":'text/css',
        'gif':'image/gif',
        'html':'text/html',
        'ico':'image/x-icon',
        'jepg':'image/jpeg',
        'jpg':'image/jpeg',
        'js':'text/javascript',
        'json':'application/json',
        'pdf':'application/pdf',
        'png':'image/png',
        'svg':'image/svg+xml',
        'swf':'application/x-shockwave-flash',
        'tiff':'image/tiff',
        'txt':'txt/plain',
        'wav':'audio/x-wav',
        'wam':'audio/x-ms-wma',
        'wmv':'video/x-ms-wmv',
        'xml':'text/xml'
}

module.exports = (filePath) =>{
    // path.extname()返回的是文件的扩展名
       let ext = path.extname(filePath)
         .split('.')   //以点为分界分割成数组
         .pop()       //返回数组最后一个元素
         .toLowerCase() //转换成小写
         
         if(!ext){   //如果读不到拓展名
             ext = filePath
         }

         return mimeTypes[ext] || mimeTypes['txt']   //返回contentType
}