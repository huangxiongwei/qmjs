var app = getApp();
var uploadP = require('../../utils/upload.js');
Page({
  data:{
    userid:null,
    mapurl:"moren",
    items:null,
    pickerList:null,
    index:0,
    imgUrl:"",
    shopImg:null
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
    var openid = app.globalData.openid;
    this.setData({userid:openid});
    var that = this;
    wx.request({
      url: 'http://apis.map.qq.com/ws/place/v1/search?boundary=region('+app.globalData.city+',0)&page_size=20&page_index=1&keyword=健身房&orderby=_distance&key=GQLBZ-35QKJ-JP4FA-FYMFJ-XAEVS-WZB2B',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res){
        that.setData({items:res.data.data});
       var arr = ["点击选择"];
       for (var k = 0, length = that.data.items.length; k < length; k++) {
          arr.push(that.data.items[k].title);
        }
        that.setData({pickerList:arr});
      }
    })
  },
  bindPickerChange:function(e){
    this.setData({
      index: e.detail.value
    })
  },
  applychoose:function(e){
    var that = this;
    wx.chooseImage({
      count: 1, 
      success: function(res){
        that.setData({
          imgUrl : res.tempFilePaths[0]
        })
      }
    })
  },
  applySubmit:function(e){
    if(this.data.index > 0 && this.data.imgUrl != ""){
        uploadP.selectImg(this.uploadBack,this.data.imgUrl);
    }
    else{
      wx.showToast(
        {
          title: '上传完营业执照和选择地址才能提交',
          icon: 'fail',
          duration: 2000
        }
      )
    }
  },
  chooseShopImg:function(url){
    var that = this;
    wx.chooseImage({
      count: 4, 
      success: function(res){
        that.setData({
          shopImg : res.tempFilePaths
        })
      }
    })
  },
  uploadBack:function(url){
    wx.showToast(
        {
          title: '恭喜你提交成功，请耐心等待审核结果',
          icon: 'success',
          duration: 2000
        }
      )
    console.log("上传成功："+url);
  }
})