module.exports = (totalSize,req,res)=>{
       const range = req.headers['range'];
       if(!range){
           return {code:200};

       }
       const sizes = range.match(/bytes=(\d*)-(\d*)/);
       const end = sizes[2] || totalSize - 1;
       const start = sizes[1] || totalSize - end;
       if(start > end || start < 0 || end >totalSize){
           return {code:200}
       }
       
       return{
            code:206,
            start:parseInt(start),
            end:parseInt(end)
       }
}