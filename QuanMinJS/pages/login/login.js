var app = getApp();
var sliderWidth = 120;
Page({
  data:{
    userInfo:{},
    tabs: ["已购买的卡", "使用过的卡"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    icon20:"/image/play.png",
    prolist:null
  },
  onLoad:function(options){
    if(app.globalData.isUser){
      wx.redirectTo({
        url: '../personal/personal'
      })
    }
    var that = this
    that.setData({prolist:app.globalData.orderList});
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })  
    wx.getSystemInfo({
        success: function(res) {
            that.setData({
                sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
            });
        }
    });
  },
   onShareAppMessage: function () {
    return {
      title: '自定义分享标题',
      path: '/page/login?id=123'
    }
  },
  tabClick: function (e) {
      this.setData({
          sliderOffset: e.currentTarget.offsetLeft,
          activeIndex: e.currentTarget.id
      });
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
  }
})