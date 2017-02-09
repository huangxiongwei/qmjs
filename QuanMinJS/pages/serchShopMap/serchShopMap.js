var app = getApp();
Page({
  data:{
    items:null
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    var that = this;
    wx.request({
      url: 'http://apis.map.qq.com/ws/place/v1/search?boundary=region('+app.globalData.city+',0)&page_size=20&page_index=1&keyword=健身房&orderby=_distance&key=GQLBZ-35QKJ-JP4FA-FYMFJ-XAEVS-WZB2B',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res){
        that.setData({items:res.data.data})
      }
    })
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})