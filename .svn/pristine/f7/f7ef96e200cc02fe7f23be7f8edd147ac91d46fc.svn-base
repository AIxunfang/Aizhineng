export const timeFormattershowsecod = (value) => { 
    let date = new Date(value)
      var y =date.getFullYear();
      var MM =date.getMonth() + 1;
      MM =MM <10 ? ('0'+MM) : MM
      var d =date.getDate();
      d = d < 10 ? ('0'+d) : d
      var h =date.getHours();
      h = h <10 ? ('0' + h) :h
      var m = date.getMinutes()
      m = m>9 ? m : ('0' +m)
     var ss = date.getSeconds()
      ss = ss >9 ? ss : ('0' +ss)
     return y + '-'+MM+'-'+d+" "+h+':'+m+':'+ss
  
   // return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() +':'+date.getSeconds();
  
}
export const  bytesToSize = (limit) => {
        var size = "";  
        if( limit < 0.1 * 1024 ){ //如果小于0.1KB转化成B  
            size = limit.toFixed(2) + "B";    
        }else if(limit < 0.1 * 1024 * 1024 ){//如果小于0.1MB转化成KB  
            size = (limit / 1024).toFixed(2) + "KB";              
        }else if(limit < 0.1 * 1024 * 1024 * 1024){ //如果小于0.1GB转化成MB  
            size = (limit / (1024 * 1024)).toFixed(2) + "MB";  
        }else{ //其他转化成GB  
            size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";  
        }  
          
        var sizestr = size + "";   
        var len = sizestr.indexOf("\.");  
        var dec = sizestr.substr(len + 1, 2);  
        if(dec == "00"){//当小数点后为00时 去掉小数部分  
            return sizestr.substring(0,len) + sizestr.substr(len + 3,2);  
        }  
        return sizestr;  

}