//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    scrollId : 'red',
    isScrollX: true,
    bannerList  : [
      {
        url :　"../../images/hu_1.png"
      },{
        url :  "../../images/huang_1.jpg"
      },{
        url :  "../../images/zhao_1.jpg"
      }
    ],
    activeBannerIndex : 0,
    userInfo: {}
  },
  search:function(event){
    wx.navigateTo({
      url:"../search/search"
    });
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindChange : function(e){
      this.setData({activeBannerIndex : e.detail.current});
  },
  onLoad: function () {
    wx.showToast({
      title:"加载中...",
      icon:"loading",
      duration:10000,
    });
    wx.hideToast();
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){

      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
    console.log(app.globalData);
    this.setData({'windowWidth' : app.globalData.windowWidth});
  }
})
