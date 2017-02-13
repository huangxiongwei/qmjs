function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function json2Form(json) {  
    var str = [];
    var jsonStr;
    for(var p in json){  
        jsonStr = JSON.stringify(json[p]);  
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(jsonStr));  
    }  
    return str.join("&");  
}
module.exports = {
  formatTime: formatTime,
  json2Form:json2Form
}
