var app = getApp();
var uploadP = require('../../utils/upload.js');
var Util = require('../../utils/util.js');
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
      url: 'https://apis.map.qq.com/ws/place/v1/search?boundary=region('+app.globalData.city+',0)&page_size=20&page_index=1&keyword=健身房&orderby=_distance&key=GQLBZ-35QKJ-JP4FA-FYMFJ-XAEVS-WZB2B',
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
        wx.showToast(
        {
          title: '提交中ing',
          icon: 'loading',
          duration: 10000
        })
        uploadP.selectImg(this.uploadBack,[this.data.imgUrl],[app.globalData.openid+"auth.jpg"]);
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
  uploadBack:function(urlist){
    this.setData({
      imgUrl : urlist[0]
    })
    var shopImgArr  = [];
    for(var i=0;i<4;i++){
      shopImgArr.push(app.globalData.openid+"shopImg_"+i.toString()+".jpg");
    }
    uploadP.selectImg(this.uploadListBack,this.data.shopImg,shopImgArr);
  },
  uploadListBack:function(urlist){
    var business = {};
    var cityGym = {};
    var mapD = this.data.items[this.data.index];
    //{business:{uid:"",gymid:"",freetime:1,price:1,password:""},cityGym:{id:"",title:"",lat:11,lng:11,address:""}}
   
    business.uid = app.globalData.openid;
    business.gymid = mapD.id;
    business.freetime = 10;
    business.price = 20;
    business.photo = this.data.imgUrl;

    cityGym.id = mapD.id;
    cityGym.title = mapD.title;
    cityGym.lat = mapD.location.lat;
    cityGym.lng = mapD.location.lng;
    cityGym.address = mapD.address;

    wx.request({
      //url: 'http://127.0.0.1/test/register.php',
      url: 'https://61652509.aimei1314.com/pp/register.php',
      header: {  
        "Content-Type": "application/x-www-form-urlencoded"  
      },  
      method: "POST",    
      data: Util.json2Form({ business : business,cityGym : cityGym }),  
      success: function(res){
        wx.hideToast();
        wx.showToast(
        {
          title: '恭喜你提交成功，请耐心等待审核结果',
          icon: 'success',
          duration: 2000
        }
        )
        wx.navigateBack({
          delta: 1, // 回退前 delta(默认为1) 页面
        })
      }
    })
  }
})