## 这个冬天，让腾讯视频带给你温暖

金秋之后，便是寒冬。2017年就要过去了，这一年承载了太多的记忆，一个腾讯视频demo，帮助我们记录下来这些或难过，或美好，或感动的瞬间。

### 一个仿腾讯视频的小程序：
***
### 开发工具：
- 微信开发者工具
- [小程序开发文档](https://mp.weixin.qq.com/)
- [iconfont矢量图标库](http://www.iconfont.cn/collections)：可以找到合适的tabBar图标
- [eas-mock](https://www.easy-mock.com/)：提供虚拟数据接口
- [wilddog](www.wilddog.com)：实现毫秒级的实时数据同步功能，无需自己构建后端服务器 
***


### 项目功能：
#### 1.已经实现功能：
- 首页界面的还原
- 加载，刷新，跳转等基础事件
- swiper， scroll等滑动事件
- 利用easy-mock实现从后台获取数据等
- 利用wilddog实现搜索历史记录，微信登录功能等

#### 2.仍在努力的功能：
- 精准搜索匹配
- 评论，回复等功能
- 观看历史功能

***
### 页面注册：
    "pages/index/index", //主页
    "pages/videos/videos", //短视频
    "pages/mine/mine", //我的
    "pages/search/search", //首页和频道页面链接的搜索界面
    "pages/channel/channel", //频道
    "pages/playing/playing", //播放界面
***
### 项目展示：
#### 1.首页的展示：
![首页](https://github.com/caicong0805/wxapp_tenVideo/blob/master/images/%E9%A6%96%E9%A1%B5.gif?raw=true)

*首页其实是比较好看的，美观大方，很可惜官方已经改版了*

* 每一个swiper的背景和第一张图片是绑定的

**index.wxml部分代码**

      <image class="top-image" src="{{bannerList[activeBannerIndex].url}}" mode="widthFix"></image>

**index.js部分代码**

        bannerList  : [
      {
        url :　"../../images/hu_1.png"
      },{
        url :  "../../images/huang_1.jpg"
      },{
        url :  "../../images/zhao_1.jpg"
      }
      ],


#### 2.短视频，频道界面的展示：
![短视频](https://github.com/caicong0805/wxapp_tenVideo/blob/master/images/%E7%9F%AD%E8%A7%86%E9%A2%91.gif?raw=true)

- 这里的数据是从easy-mock获得的
- 这是我的[接口](https://www.easy-mock.com/mock/5a223177707056548f085eee/data/getTencentInfo),没有做很多，大家可以用来练练手，后续会增加的

        <swiper-item>
                    <view class="swiper-item weui-tab__content" wx:for="{{wangzhe}}">
                        <view class="contain">
                            <view class="list-title">{{item.label}} ></view>
                            <view class="detail" wx:for="{{item.video}}">
                                <image src="{{item.videoImage}}" mode="widthFix" class="wz"></image>
                                <view class="list-font"><text>{{item.title}}</text></view>
                            </view>
                        </view>
                    </view>
        </swiper-item>
        
- 因为数据都是图片，所以为了还原真实性，我用伪元素做了个三角形播放图标

        .picture ::before
        {
        position: absolute;
        border:11px solid transparent;
        border-left:17px solid #fff;
        content: "";
        top: 100px;
        left: 180px;
        }


#### 3.播放界面的展示：
![播放](https://github.com/caicong0805/wxapp_tenVideo/blob/master/images/%E6%92%AD%E6%94%BE.gif?raw=true)




#### 4.搜索界面的展示：
![搜索](https://github.com/caicong0805/wxapp_tenVideo/blob/master/images/%E6%90%9C%E7%B4%A2.gif?raw=true)

* 搜索界面引用了weui样式
* @import "./weui.wxss";
        <view class="weui-search-bar">  
            <view class="weui-search-bar__form">  
                <view class="weui-search-bar__box">  
                    <icon class="weui-icon-search_in-box" type="search" size="14"></icon>  
                    <input type="text" class="weui-search-bar__input" placeholder="请输入片名主演或导演" value="{{inputVal}}" focus="{{inputShowed}}" bindinput="bindKeyInput"/>  
                    <view class="weui-icon-clear"  bindtap="clearInput">  
                        <icon type="clear" size="14"></icon>  
                    </view>  
                </view>  
                <label class="weui-search-bar__label" hidden="{{inputShowed}}" bindtap="showInput">  
                    <icon class="weui-icon-search" type="search" size="14"></icon>  
                    <view class="weui-search-bar__text" bindtap="">搜索</view>  
                </label>  
            </view>  
            <view class="weui-search-bar__cancel-btn" hidden="{{!inputShowed}}" bindtap="addItem">搜索</view>  
        </view>  
        <view>  
            <view  class="search-log" wx:for="{{searchs}}">  
                <text style="font-size:14px;font-family:microsoft yahei">{{item.text}}</text>
                <icon type="clear"  class="inline" bindtap="deleteItem" data-key="{{item.key}}" size="14"></icon>
            </view>      
        </view> 
* 隐藏了搜索记录和搜索框
        data:{  
            searchs:[],
            current:null,
            hidden:true, // 加载提示框是否显示  
            scrollTop : 0, // 居顶部高度  
            inputShowed: false, // 搜索输入框是否显示  
            inputVal: "", // 搜索的内容  
            histroyShowed:true //搜索记录
          }

**关于wilddog**

*利用野狗sdk，我们可以实现多种实时功能，能够在各个终端修改后台数据，消息传递毫秒可达，能够为小程序开发者们上线提供一个良好的帮助*

*这是他的[官方文档](https://docs.wilddog.com/overview/index.html?_ga=1.129586255.2113090780.1512732019)*

* 首先要导入wilddog-weapp-all.js
        var wilddog = require('wilddog-weapp-all');
* 引用创建的接口
        var config = {
              syncURL:'https://appid.wilddogio.com',
              authDomain:'appid.wilddog.com'
            }
*appid为你创建的应用id*

* wilddog是以key-value的形式存储数据，创建引用会定位到根节点。若要定位到子节点，只需在url后追加路径即可:
![wilddog]() 

* 利用野狗的child()方法获取子节点，达到删除和增加的功能
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
          }

***
### 一点心得：
##### 1.遇到的问题：
* 写完数据后发现才发现内容全都不见了：

    *小程序只支持http:// 服务请求*

* 用手机测验的时候奇卡无比：
 
    *在样式swiper中加入这条代码就解决了*
      -webkit-overflow-scrolling : touch;

* 在手机测验时，整个页面会随着滑动：
    
    *在样式中加入超出则隐藏*
        overflow:hidden;

* 如果js部分出现问题了，那么就应该console一下关键数据，看看是否能够打印出来，然后慢慢排除

开发的时候遇到了一些问题，是需要慢慢琢磨的，多看文档，耐心解决。开动大脑，好的想法idea是非常重要的，优雅的编程，发散的思维，把你的想象力用代码来实现，是一件非常cooooool的事情。

#### 2.几句闲话：

如果你想要改变世界，那么我们可以做个朋友。但如果你想要卖一辈子糖水，那么我们也可以做个朋友。因为写代码，只是为了交个朋友嘛。有任何问题，你可以通过以下方式找到我：

- QQ邮箱：750746291@qq.com
- [github](https://github.com/caicong0805)
- [个人主页](http://www.weaci.cn)
***

### 彩蛋：
最后送给大家demo里出现的《三分钟回顾2017》，谢谢支持！

<iframe width=500 height=300 allowfullscreen src="http://gslb.miaopai.com/stream/PAEyMDoxMSB9hV6BVT1l5SHT-sMVVRVgHlL7bA__.mp4?mpflag=64&amp;vend=1&amp;os=3&amp;partner=1&amp;platform=2&amp;cookie_id=&amp;refer=miaopai&amp;scid=PAEyMDoxMSB9hV6BVT1l5SHT-sMVVRVgHlL7bA__"></iframe>

