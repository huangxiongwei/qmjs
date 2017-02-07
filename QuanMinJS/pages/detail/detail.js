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
    icoUrl:null,
    tDec:null
  },
  onLoad:function(options){
    console.log(options);
    var myId = Number(options.tid);
    var data = app.globalData.shopList[myId];
    this.setData({latitude: Number(options.latitude),longitude: Number(options.longitude),myName:data.name,icoUrl:data.ico,tDec:data.tdec});
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
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
  }
})