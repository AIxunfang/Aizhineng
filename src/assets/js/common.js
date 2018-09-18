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