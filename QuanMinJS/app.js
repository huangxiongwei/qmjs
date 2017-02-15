//app.js
const config = require('/config.js');
var Util = require('/utils/util.js');
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
                  typeof cb == "function" && cb(that.globalData.userInfo);
                  that.getOrderList();
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
  getOrderList:function(){
    var that = this;
     wx.request({
        url: 'https://61652509.aimei1314.com/pp/getOrders.php',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
        method: "POST",    
        data: Util.json2Form({buyid:that.globalData.openid}),
        success: function(res){
          that.globalData.orderList = res.data;
        },
        fail:function(res){
          console.log(res.data);
        }
      })
  },
  addOrder:function(shopid){
    var that = this;
    if(!that.globalData.orderList){
        that.globalData.orderList = [];
        that.globalData.orderList.push({shopid:shopid,buyid:that.globalData.openid});
    }
  },
  getBuyOrder:function(shopid){
    var that = this;
    var bob = false;
    if(that.globalData.orderList){
      that.globalData.orderList.forEach(function(eitem,index){
        if(shopid == eitem.shopid){
            bob = true;
            return;
        }
      });
    }
    return bob;
  },
  globalData:{
    userInfo:null,
    shopList:null,
    ip:"https://61652509.aimei1314.com/pp",
    isUser:true,
    openid:null,
    city:"厦门市",
    orderList:null
  },
  getUrl(route) {
      return "https://61652509.aimei1314.com/wximage/routes/album/handlers/"+route+".js";
  }
})