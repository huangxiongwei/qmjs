var app = getApp();
Page({
  data:{
    prolist:[
      "http://img.jsqq.net/uploads/allimg/150228/1_150228191103_3.jpg",
      "http://img.jsqq.net/uploads/allimg/150228/1_150228191103_3.jpg",
      "http://img.jsqq.net/uploads/allimg/150228/1_150228191103_3.jpg",
      "http://img.jsqq.net/uploads/allimg/150228/1_150228191103_3.jpg",
    ],
    latitude: null,
    longitude: null,
    myName:null,
    tDec:null
  },
  onLoad:function(options){
    console.log(options);
    var myId = Number(options.tid);
    var data = app.globalData.shopList[myId];
    this.setData({latitude: Number(options.latitude),longitude: Number(options.longitude),myName:data.name,tDec:data.tdec});
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