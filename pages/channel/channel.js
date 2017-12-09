//index.js
//获取应用实例
var API_URL = 'https://www.easy-mock.com/mock/5a223177707056548f085eee/data/getTencentInfo'
const app = getApp()

Page({
  data: {
    wangzhe:null,
    kuaikan:null,
    shenjianji:null,
    activeIndex: 0,
  },
  search:function(event){
    wx.navigateTo({
      url:"../search/search"
    })
  },
  changeTab:  function(e){
    var type =
     e.target.dataset.index;
    this.setData({
      activeIndex: type
    });
  },
  swiperTab: function(e){
    var type = 
    e.detail.current;
    this.setData({
      activeIndex: type
    });
  },
  //事件处理函数
  bindViewTap: function() {
    
  },
  // 获取工作岗位列表
  onLoad: function () {
    var that = this;
    wx.request({
      url:API_URL,
      data:{},
      success:function(res){
        console.log(res.data.data);
        that.setData({
          wangzhe:res.data.data.shortVideo[0].classify,
          kuaikan:res.data.data.shortVideo[1].classify,
          shenjianji:res.data.data.shortVideo[2].classify
        })
      }
    });
  }
})
