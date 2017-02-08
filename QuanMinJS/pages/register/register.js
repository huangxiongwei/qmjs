var app = getApp();
Page({
  data:{
    userid:null
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
    var openid = app.globalData.openid;
    console.log(openid);
    this.setData({userid:openid})
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
  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  }
})