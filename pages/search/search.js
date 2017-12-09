const app = getApp()
Page({  
  data:{  
    searchs:[],
    current:null,
    //searchLogList:[],  存储搜索历史记录信息  
    hidden:true, // 加载提示框是否显示  
    scrollTop : 0, // 居顶部高度  
    inputShowed: false, // 搜索输入框是否显示  
    inputVal: "", // 搜索的内容  
    //searchLogShowed: false 是否显示搜索历史记录  
  },  
  bindKeyInput:function(e){
    this.data.current = e.detail.value;
  },
  showInput: function () {  
    var that = this;  
      that.setData({  
          inputShowed: true,  
          // searchLogShowed: true  
      });  
  },  
  addItem:function(){
    if(this.data.current != null){
      // 将所有的后台业务交给app.js
      app.addItem(this.data.current)
    }
    this.setData({
      inputVal:""
    })
  },
  deleteItem:function(e){
    var key = e.target.dataset.key;
    this.ref.child(key).remove();
  },
  //事件处理函数
  // deleteItem:function(e){
  //   var key = e.target.dataset.key;
  //   this.ref.child(key).remove();
  // },
  onLoad:function(options){  
    this.ref = app.getTodoRef();
    this.ref.on('child_added',function(snapshot,prkey){
      var key = snapshot.key()
      var text = snapshot.val()
      // JSON结构
      var newItem = {key:key, text:text}
      this.data.searchs.push(newItem);
      this.setData({
        searchs:this.data.searchs
      })
    },this);
    this.ref.on('child_removed',function(snapshot){
      var key = snapshot.key();
      var index = this.data.searchs.findIndex(
        (item,index)=>{
          if(item.key == key){
            return true;
          }
          return false;
        });
        if(index >= 0){
          this.data.searchs.splice(index,1);
          this.setData({
            searchs:this.data.searchs
          })
        }
    },this)
    // 页面初始化 options为页面跳转所带来的参数  
    // var that = this;  
    // wx.getSystemInfo({  
    //   success: function(res) {  
    //     that.setData( {  
    //       windowHeight: res.windowHeight,  
    //       windowWidth: res.windowWidth  
    //     })  
    //   }  
    // });  
    // 如果缓存中有值，先从缓存中读取  
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },  
  onReady:function(){  
    // 页面渲染完成  
  },  
  onShow:function(){  
    // 页面显示  
  },  
  
  // 显示搜索输入框和搜索历史记录  

  
  // 显示搜索历史记录  
  // searchLogShowed: function(){  
  //   var that = this;  
  //   if ("" != wx.getStorageSync('searchLog')) {  
  //     that.setData({  
  //         searchLogShowed: true,  
  //         searchLogList : wx.getStorageSync('searchLog')  
  //     });  
  //   } else {  
  //     that.setData({  
  //         searchLogShowed: true  
  //     });  
  //   }  
  // },  
  
  // 点击 搜索 按钮后 隐藏搜索记录，并加载数据  
  // searchData: function () {  
  //   var that = this;  
  //   searchLogList:wx.getStorageSync('searchLog')

    // 搜索后将搜索记录缓存到本地   
  // },  
  
  // 点击叉叉icon 清除输入内容，同时清空关键字，并加载数据  
  clearInput: function () {  
    var that = this;  
    that.data.current = null;
    that.setData({  
        scrollTop : 0,  
        inputVal: ""  
    });

  },  
  
  // 输入内容时 把当前内容赋值给 查询的关键字，并显示搜索记录  
  // inputTyping: function (e) {  
  //   var that = this;  
  //     that.setData({  
  //         inputVal: e.detail.value,  
  //         // searchLogShowed: true  
  //     });  
  // },  
  
  // 通过搜索记录查询数据  
  // searchDataByLog: function(e){  
    // 从view中获取值，在view标签中定义data-name(name自定义，比如view中是data-log="123" ; 那么e.target.dataset.log=123)  
  //   var that = this;  
  //   that.setData({  
  //       msgList : [],  
  //       scrollTop : 0,  
  //       searchLogShowed: false  
  //   });  
  // },  
  // 清除搜索记录  
  // clearSearchLog:function(){  
  //   var that = this;  
  //   that.setData({  
  //     hidden:false  
  //   });  
  //   wx.removeStorageSync("searchLog");  
  //   that.setData({  
  //       scrollTop : 0,  
  //       searchLogShowed: false,  
  //       hidden:true  
  //   });  
  // },  
  onHide:function(){  
    // 页面隐藏  
  },  
  onUnload:function(){  
    // 页面关闭  
  }  
})