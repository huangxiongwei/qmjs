//app.js
const config = require('/config.js');
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []

  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function (res) {
          if (res.code) {
          //发起网络请求
          wx.request({
            url: "https://"+config.host+"/cosphp/onlogin.php",
            data: {
              code: res.code
            },success: function (res) {
              //res:{"session_key":"WI9jwEZQvAhaTKs5YdldGQ==","expires_in":2592000,"openid":"ov5sI0Y-0t8Lxqvx2LMuFOO3VVSk"}
               that.globalData.openid = res.data.openid;
                wx.getUserInfo({
                success: function (res) {
                  that.globalData.userInfo = res.userInfo;
                  typeof cb == "function" && cb(that.globalData.userInfo)
                }
              })
            }
          })
        }
        else{
          console.log("获取code失败");
        }
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    shopList:null,
    ip:"https://61652509.aimei1314.com/pp",
    isUser:true,
    openid:null
  },
  getUrl(route) {
      return "https://61652509.aimei1314.com/wximage/routes/album/handlers/"+route+".js";
  }
})