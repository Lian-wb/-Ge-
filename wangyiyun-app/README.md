# wangyiyun-app

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### plugins下的插件
为了解决main.js中不希望太多“引入”代码的问题，将vant的引入通过一个数组和函数（调用时返回app.use）给main中添加需要的vant组件

### 使用vant的Swpier轮播图组件
一直没有效果，最后根据报错（【Vant】 SwipeItem must be a child component of Swipe）找到了原来是npm i vant装到上一级目录了

### 制作发现好歌单的MusicList组件时
报错：runtime-core.esm-bundler.js?d2dd:38 [Vue warn]: Property "musicList" was accessed during render but is not defined on instance. 
后来发现是v-for渲染axios拿来的数据时，由于前面musiclist定义时是用vue3的reactive去定义的，要写代理.属性名即state.musiclist，而不是习惯了用vue2中data定义的直接写musiclist了

### vue3中用到query路由传参
在setup里边因为不能访问this，所以也没有this.$router和this.$route。vue3新的组合API：useRoute

### FooterMusic展示在App.vue里
因为其他组件包括home，都不像FooterMusic始终在页面底部

### vue3中vuex的糖语法使用不如vue2方便

### 获取歌词
在request用ajax获取当前id的歌词，store里设置函数存储，但何时触发这个函数一开始想的是在FooterMusic组件中下标换歌了就触发，所以在mounted和updated钩子里去触发，后来发现点击播放暂停也会触发更新触发函数，这样就会一直去后台调用数据，所以后后面优化的时候把这个函数触发写到watch监听歌曲id变化了
————但后面发现，监听下标这个方法切换歌单第一首歌行不通歌词，所以还需要监听播放列表的改变——从而知道下标都是0的状况下但歌单也变了

### 歌词滚动高亮时
必须要先点击默认的歌再切歌才能实现高亮滚动，开局直接换歌的话歌词会换但是高亮滚动停留在第一句————发现是获取歌曲播放当前时间的定时器在点击播放/暂停按钮时才会开启，所以在底部组件挂载时也开启了定时器

### 几个后期优化问题
1、歌词高亮滚动不太丝滑
2、进度条不能引起currentTime改变——vuex中state的currentTime只可读