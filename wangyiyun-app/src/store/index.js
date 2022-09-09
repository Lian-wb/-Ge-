import { createStore } from 'vuex'
import {getMusicLyric} from '@/request/api/item.js'
import {getPhoneLogin} from '@/request/api/home.js'
export default createStore({
  state: {
    playList:[{//播放列表
      al:{
        id: 148461408,//这是专辑id
        name: "Hug me (抱我)",
        pic: 109951167703786930,
        picUrl: "https://p1.music.126.net/Qo43I3WbvTdXnN2DZdW43w==/109951167703786926.jpg",
        pic_str: "109951167703786926"
      },
      id: 1965890511,//播放歌曲的id
      name:"Hug me (抱我)",
      ar:[{name:"蔡徐坤"}],
    }],
    playListIndex:0,//默认下标为0
    isbtnShow:true,//播放/暂停按钮的显示
    detailShow:false,//歌曲详情页的展示
    lyricList:{},//歌词部分
    currentTime:0,//当前时间
    duration:0,//歌曲总时长
    isLogin:false,//判断是否登录
    isFooterMusic:true//判断是否显示底部组件

  },
  getters: {
  },
  mutations: {
    updateIsbtnShow(state,value){
      state.isbtnShow=value
    },
    updatePlayList(state,value){
      state.playList=value
      // console.log(state.playList);
    },
    updatePlayListIndex(state,value){
      state.playListIndex=value
    },
    updateDetailShow(state){
      state.detailShow=!state.detailShow
    },
    updateLyricList(state,value){
       state.lyricList=value
    },
    updateCurrentTime(state,value){
      state.currentTime=value
    },
    updateDuration(state,value){
      state.duration=value
    },
    pushPlayList(state,value){
      state.playList.push(value)
    },
    updateIsLogin(state,value){
      state.isLogin=true
    }
  },
  actions: {
    async getLyric(context,value){
      let res = await getMusicLyric(value)
      // console.log(res);
      context.commit("updateLyricList",res.data.lrc)
    },
    async getLogin(context,value){
      let res = await getPhoneLogin(value)
      // console.log(res);
      return res
    },
  },
  modules: {
  }
})
