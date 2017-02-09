//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    address:"我的地址：",
    lat:"",
    lng:"",
    markers:[{
      
    }],
    polyline: [],
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })    
    wx.getLocation({
      type: 'wgs84',
      success: function(res){
        var latitude = res.latitude
        var longitude = res.longitude
        wx.request({
          url: 'https://apis.map.qq.com/ws/geocoder/v1/?location='+latitude+','+longitude+'&key=GQLBZ-35QKJ-JP4FA-FYMFJ-XAEVS-WZB2B&get_poi=1',
          data: {},
          method: 'GET',
          success: function(res){
            that.setData({address:res.data.result.address_component.city});
            that.getShopList();
          }
        })
        that.setData({lat:latitude,lng:longitude});
      }
    })
  },
  getShopList(){
    var that = this;
    if(!app.globalData.shopList){
       wx.request({
      url: 'https://61652509.aimei1314.com/pp/getShopList.php',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        var arr = [];  
        var tid = 0;
        res.data.forEach(function(eitem,index,tarr){
          arr.push({
            iconPath: eitem.ico,
            id: tid,
            latitude: eitem.lat,
            longitude: eitem.lng,
            width: 50,
            height: 50
          });
          tid ++;
        })
        that.setData({markers:arr});
        app.globalData.shopList = res.data;
      }
    })
    }
   
   
  },
  markertap:function(event){
    var that = this;
    var id = event.markerId;
    var latitude = that.data.markers[id].latitude;
    var longitude = that.data.markers[id].longitude;
    var urls='../detail/detail?tid='+id+'&latitude='+latitude+'&longitude='+longitude;
    wx.navigateTo(wx.navigateTo({url:urls}));
  }
})
