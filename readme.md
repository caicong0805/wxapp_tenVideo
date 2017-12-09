## 这个冬天，让腾讯视频带给你温暖

悲秋过后，便是寒冬。2017年就要过去了，这一年承载了太多的记忆，一个腾讯视频demo，帮助我们记录下来这些或难过，或美好，或感动的瞬间吧。

### 一个仿腾讯视频的小程序：
***
### 开发工具：
- 微信开发者工具
- 小程序开发文档
- iconfont矢量图标库：可以找到合适的tabBar图标
- eas-mock：提供虚拟数据接口
- wilddog：实现毫秒级的实时数据同步功能，无需自己构建后端服务器 
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



***
### 一点心得：

***

### 最后的彩蛋：

***

