var bmap = require('../js/bmap-wx.js');
var wxMarkerData = [];  //定位成功回调对象  
Page({
  data: {
    ak: "3jNdwydGrnKy2eGg8humZ60sZeiBl09v", //填写申请到的ak 
  
    markers: [],
    longitude: '',   //经度  
    latitude: '',    //纬度  
    address: '',     //地址 
    futherWeather:'' 
  },
  onLoad: function (options) {
    var that = this;
    /* 获取定位地理位置 */
    // 新建bmap对象   
    var BMap = new bmap.BMapWX({
      ak: that.data.ak
    });
    var fail = function (data) {
      console.log(data);
    };
    var success = function (data) {
      //返回数据内，已经包含经纬度  
      console.log(data);
      //使用wxMarkerData获取数据  
      wxMarkerData = data.wxMarkerData;
      console.log(wxMarkerData[0])
      //把所有数据放在初始化data内  
      that.setData({
        markers: wxMarkerData,
        latitude: wxMarkerData[0].latitude,
        longitude: wxMarkerData[0].longitude,
        address: wxMarkerData[0].desc,
        cityInfo: data.originalData.result.addressComponent,
        
      });
    }
    // 发起regeocoding检索请求   
    BMap.regeocoding({
      fail: fail,
      success: success
    });
  },
  onShow: function () {
    var that = this;
    var BMap = new bmap.BMapWX({
      ak: '3jNdwydGrnKy2eGg8humZ60sZeiBl09v' 
    });
    var fail = function (data) {
      console.log('fail!!!!')
    };
    var success = function (data) {
      console.log('success!!!');
      var weatherData = data.currentWeather[0];
      console.log(data)
      
       var futherWeather = data.originalData.results[0].weather_data;
       console.log(futherWeather)
      that.setData({
    
        futherWeather: futherWeather
      });
    }
    BMap.weather({
      fail: fail,
      success: success
    });
  },
  onPullDownRefresh(){
    this.onLoad()
    wx.stopPullDownRefresh()
  }
}) 