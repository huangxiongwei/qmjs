var dir = "http://picupload-1252824453.cosgz.myqcloud.com/testfolder/";
var Util = require('../../utils/util.js');
var uploadP = require('../../utils/upload.js');
var app = getApp();
Page({
  data: {
    prolist: ["/image/add.jpeg","/image/add.jpeg","/image/add.jpeg","/image/add.jpeg"],
    myName: null,
    tDec: null,
    address: null,
    price: 0,
    shopinfo:null
  },
  onLoad: function (options) {
    
  },
  onReady: function () {
    // 页面渲染完成
    dir = dir + app.globalData.openid;
    this.setData({
      prolist: [dir + "shopImg_01.jpg", dir + "shopImg_1.jpg", dir + "shopImg_2.jpg", dir + "shopImg_3.jpg"],
    });
    this.getShopInfo();
  },
  getShopInfo() {
    var that = this;
    wx.request({
      url: 'https://61652509.aimei1314.com/pp/getShopInfo.php',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: Util.json2Form({ uid: app.globalData.openid }),
      success: function (res) {
        if (res.data) {
          that.data.shopinfo = res.data;
          that.setData({
            price: res.data.price
          });
          wx.request({
            url: 'https://61652509.aimei1314.com/pp/getGymInfo.php',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: Util.json2Form({ gymId: that.data.shopinfo.gymid}),
            success: function (res) {
              that.setData({
                myName: res.data.name,
                tDec: res.data.address
              });
            }
          })
          }
        else{

        }
      }
    })
  },
  viewImg: function (e) {
    var that = this;
    wx.showActionSheet({
      itemList: ['重新上传', '删除'],
      success: function (res) {
        var choosid = e.currentTarget.dataset.id;
        switch(res.tapIndex){
          case 0:
             wx.chooseImage({
              count: 1, 
              success: function(res){
                uploadP.selectImg(that.uploadBack,res.tempFilePaths,[app.globalData.openid+"shopImg_"+choosid.toString()+".jpg"]);
              }
            })
            break;
          case 1:
            wx.request({
              url: 'https://61652509.aimei1314.com/cosphp/detelePic.php',
              data: {picUrl:"testfolder/"+app.globalData.openid+"shopImg_"+choosid.toString()+".jpg"},
              method: 'GET',
              success: function(res){
                var tarArr = that.data.prolist;
                tarArr[choosid] = "/image/add.jpeg";
                that.setData({
                    prolist : tarArr
                });
              }
            });
            break;
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  binderror:function(e){
    e.currentTarget
  },
  uploadListBack:function(){
     wx.showToast(
        {
          title: '上传成功',
          icon:"success",
          duration: 1000
        })
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})