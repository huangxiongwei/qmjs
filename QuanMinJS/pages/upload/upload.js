var app = getApp();
const config = require('../../config.js');
var cosUrl = "https://" + config.REGION + ".file.myqcloud.com/files/v2/" + config.APPID + "/" + config.BUCKET_NAME + "/" + config.DIR_NAME;
Page({
  data:{
    // text:"这是一个页面"
    img:"",
    tempFilePaths:null
  },
  selectImg(){
    var _self = this
    wx.chooseImage({
       success: function(res) {
            _self.setData({tempFilePaths:res.tempFilePaths});
            //console.log(res.tempFilePaths);
            _self.upload();
      }
    })
  },
  /**
 * 上传方法
 * filePath: 上传的文件路径
 * fileName： 上传到cos后的文件名
 */
upload(filePath, fileName) {
    var _self = this;
    var filePath = _self.data.tempFilePaths.pop();
    // 获取文件名
    var fileName = filePath.match(/(wxfile:\/\/)(.+)/)
    fileName = fileName[2];
    console.log(fileName);
    wx.request({
        url: config.cosSignatureUrl+"?bucket="+config.BUCKET_NAME+"&filepath="+config.DIR_NAME,
        success: function(cosRes) {
            wx.uploadFile({
                url: cosUrl + '/' + fileName,
                filePath: filePath,
                header: { 'Authorization': cosRes.data },
                name: 'filecontent',
                formData: { op: 'upload' },
                success: function(uploadRes){ 
                     var result = JSON.parse(uploadRes.data);
                     _self.setData({img:result.data.source_url});
                     if(_self.data.tempFilePaths && _self.data.tempFilePaths.length > 0){
                         _self.upload();
                     }
                },
                fail:function(uploadRes){
                    console.log("上传cos失败:" + fileName);
                    console.log(uploadRes);
                }
            })
        }
    })
}
})