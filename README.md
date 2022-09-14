# 基于Vue练手的一个“仿网易云音乐移动端”项目 #

## 开始的话 ##
1、用到的主要技术：*vue2/3+vue-cli@4+vuex+vue-router+vue-vant+axios*  
2、感谢[阿里巴巴矢量图标库](https://www.iconfont.cn/)和大佬提供的[网易云音乐API接口](https://github.com/Binaryify/NeteaseCloudMusicApi)  

### 部署和调试 ##
源码提供了项目的前端部分和服务器安装包，详见🔜文件夹内各readme   
[在线demo](https://lian-wb.github.io/-Ge-/wangyiyun-app/dist/index.html)

## 主要问题 ##
1、对于较多次数的ajax请求进行了一次封装在request文件目录下，其余组件调用请求回来的数据或者传参只需要引入封装目录下的接口即可  
2、FooterMusic组件相较于其他不同，需要在多个页面中处于底部，但登陆界面又不需要底部播放栏这里用到了一个路由守卫的知识点  
3、登录接口的数据请求不回来，400状态码报错，postman也请求超时，解决方案暂时作者要去补服务器知识然后争取能调整接口适配（也渴望大佬救救）

## 剩下的几个优化问题 ##
1、代码暂时还未完全用vue3重构，作者有几个相较于vue2改变的vue3语法还需学习  
2、歌词自动滚动的动画还不够丝滑，进度条暂时只可跟随歌曲播放，还不能通过进度条更改歌曲进度（只可读）  
3、登录功能暂未开启，目前只能游客身份播放歌单和查询歌曲  
--只是本人学习vue道路上的第一个小项目留做纪念，后续也会尽量将提到的几个地方优化，对于该学习项目而言质量还是不错的，喜欢前端uu们可以一起学习，有时间再回来更新~~
