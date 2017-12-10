const app = getApp()
Page({  
  data:{  
    searchs:[],
    current:null,
    hidden:true, // 加载提示框是否显示  
    scrollTop : 0, // 居顶部高度  
    inputShowed: false, // 搜索输入框是否显示  
    inputVal: "", // 搜索的内容  
    histroyShowed:true //搜索记录
  },  
  bindKeyInput:function(e){
    this.data.current = e.detail.value;
  },
  showInput: function () {  
      this.setData({  
          inputShowed: true,
          histroyShowed:false  
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
  
  // 点击叉叉icon 清除输入内容，同时清空关键字，并加载数据  
  clearInput: function () {  
    this.data.current = null;
    this.setData({  
        scrollTop : 0,  
        inputVal: ""  
    });

  },   
  onHide:function(){  
    // 页面隐藏  
  },  
  onUnload:function(){  
    // 页面关闭  
  }  
})