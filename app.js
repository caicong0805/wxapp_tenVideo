var wilddog = require('wilddog-weapp-all');
//app.js
App({
  onLaunch: function () {
    var config = {
      syncURL:'https://wd3319485295hajoox.wilddogio.com',
      authDomain:'wd3319485295hajoox.wilddog.com'
    }
    wilddog.initializeApp(config);
    wilddog.auth().signInWeapp(function(err,user){
      console.log(user);
    })
    // 数据库 ip db
    this.ref = wilddog.sync().ref('search')
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    var _this = this;
    wx.getSystemInfo({
      success: function(res) {
        _this.globalData.windowWidth = res.windowWidth;
      }
    })
  },
  addItem:function(text){
    this.ref.push(text);
  },
  getTodoRef:function(){
    return this.ref;
  },
  globalData: {
    userInfo: null
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})