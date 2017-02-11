var app = getApp();
var Util = require('../../utils/util.js');
Page({
  data:{
    myId:0,
    prolist:[
      "",
      "",
      "",
      "",
    ],
    latitude: null,
    longitude: null,
    myName:null,
    tDec:null,
    address:null,
    shopInfo:null
  },
  onLoad:function(options){
    this.data.myId = Number(options.tid);
    var data = app.globalData.shopList[this.data.myId];
    this.setData({latitude: Number(options.latitude),longitude: Number(options.longitude),myName:data.name,tDec:data.address});
  },
  onReady:function(){
    this.getShopInfo();
  },
  getShopInfo(){
    var that = this;
    wx.request({
      url: 'https://61652509.aimei1314.com/pp/getShopInfo.php',
      header: {  
        "Content-Type": "application/x-www-form-urlencoded"  
      },  
      method: "POST",    
      data: Util.json2Form({gymId:app.globalData.shopList[this.data.myId].id,uid:app.globalData.openid}),  
      success: function(res){
        that.data.shopInfo = res.data;
        var tartid = that.data.shopInfo.uid;
        var dir = "http://picupload-1252824453.cosgz.myqcloud.com/testfolder/"+tartid;
        that.setData({
          prolist:[dir+"shopImg_0.jpg",dir+"shopImg_1.jpg",dir+"shopImg_2.jpg",dir+"shopImg_3.jpg"]
        });
      }
    })
  },
  gotoMapE:function(event){
    var that = this;
    if(that.data.latitude){
      wx.openLocation({
        latitude: that.data.latitude,
        longitude: that.data.longitude,
        scale: 28
      })
    }
    else{
      wx.showToast({
        title: '没有数据',
        icon: 'fail',
        duration: 2000
      })
    }
  },
  viewImg:function(event){
    console.log(event);
    wx.previewImage({
      // current: 'String', // 当前显示图片的链接，不填则默认为 urls 的第一张
      urls: [event.currentTarget.dataset.url],
    })
  }
})