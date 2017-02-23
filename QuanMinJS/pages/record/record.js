// pages/record/record.js
Page({
  data:{
    recordUrl:"",
    content:""
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  startRecord:function(){
    var that = this;
    that.setData({
        content:"",
    });
    that.data.recordUrl = "";
    that.addStr("开始录音");
    wx.startRecord({
      success: function(res) {
      that.data.recordUrl = res.tempFilePath;
    },
     fail: function(res) {
      that.addStr("录音失败");
      //
      }
    })
  },
  stopRecord:function(){
    var that = this;
     wx.stopRecord();
     this.addStr("停止录音");
     setTimeout(function() {
       that.playRecord();
    }, 500)

  },
  playRecord:function(){
    var that = this;
     that.addStr("播放录音");
     wx.playVoice({
      filePath: that.data.recordUrl,
      complete: function(){
        that.addStr("播放完成");
      }
    })
  },
  addStr:function(str){
    str = this.data.content + str+"</br>";
    this.setData({
        content:str
    });
  }
})