<template>
    <div class="searchTop">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
            <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <input type="text" placeholder="陈奕迅" v-model="searchKey" @keydown.enter="enterKey">
    </div>
    <div class="searchHistpry">
        <span class="searchSpan">历史</span>
        <span v-for="item in keyWordList" :key="item" class="spanKey" @click="searchHistory(item)">
            {{item}}
        </span>
        <svg class="icon" aria-hidden="true" @click="delHistory">
            <use xlink:href="#icon-shanchu"></use>
        </svg>
    </div>
    <div class="itemList">
        <div class="item" v-for="(item, i) in searchList" :key="i">
          <div class="itemLeft" @click="updataIndex(item)">
            <!-- 歌曲前面的下标 -->
            <span class="leftSpan">{{ i + 1 }}</span>
            <div>
              <p>{{ item.name }}</p>
              <!-- 作者可能有多个，也需要v-for遍历 -->
              <span v-for="(item1, index) in item.artists" :key="index">
                {{item1.name}}
              </span>
            </div>
          </div>
          <div class="itemRight">
            <!-- 判断是否需要mv图标 -->
            <svg class="icon bofang" aria-hidden="true" v-if='item.mvid !=0'>
              <use xlink:href="#icon-shipin"></use>
            </svg>
            <svg class="icon liebiao" aria-hidden="true">
              <use xlink:href="#icon-gengduo"></use>
            </svg>
          </div>
        </div>
    </div>
</template>

<script>
import {getSearchMusic} from "@/request/api/home.js"
export default {
    data(){
        return{
            keyWordList:[],
            searchKey:"",
            searchList:[],
        }
    },
    mounted(){
        this.keyWordList=JSON.parse(localStorage.getItem("keyWordList")) ? JSON.parse(localStorage.getItem("keyWordList")) : [];
    },
    methods:{
        async enterKey(){
            if(this.searchKey.trim()!==""){
                this.keyWordList.unshift(this.searchKey);
                // 双厨狂喜，原来这里可以数组去重
                this.keyWordList=[...new Set(this.keyWordList)]
                // 固定长度
                if(this.keyWordList.length>10){
                    this.keyWordList.splice(this.keyWordList.length-1,1)
                }
                localStorage.setItem("keyWordList",JSON.stringify(this.keyWordList))
                let res = await getSearchMusic(this.searchKey);
                console.log(res);
                this.searchList=res.data.result.songs;
                this.searchKey=""
            }
        },
        delHistory(){
            localStorage.removeItem("keyWordList");
            this.keyWordList=[];
        },
        async searchHistory(item){
            let res = await getSearchMusic(item);
            this.searchList=res.data.result.songs;
        },
        updataIndex(item){
            this.$store.commit("pushPlayList",item)
            this.$store.commit("updatePlayListIndex",this.$store.state.playList.length-1)
        }
    },
}
</script>

<style lang="less" scoped>
    .searchTop{
        width: 100%;
        height: 1rem;
        padding: 0 0.2rem;
        margin-top: 0.2rem;
        display: flex;
        align-items: center;
        input{
            margin-left: 0.2rem;
            border: none;
            border-bottom: 1px solid #999;
            width: 90%;
            padding: .1rem;
        }
    }
    .searchHistpry{
        width: 100%;
        padding: .2rem;
        position: relative;
        .searchSpan{
            font-weight: 700;
        }
        .spanKey{
            padding: .1rem .2rem;
            background-color: rgb(178, 176, 176);
            border-radius: .4rem;
            margin: .1rem .2rem;
            display: inline-block;
        }
        .icon{
            position: absolute;
            top: .4rem;
            right: .3rem;
        }
    }
    .itemList {
    width: 100%;
    padding: .2rem;
    .item {
      width: 100%;
      height: 1.4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .itemLeft {
        width: 85%;
        height: 100%;
        display: flex;
        align-items: center;
        .leftSpan {
          display: inline-block;
          width: 0.2rem;
          text-align: center;
        }
        div {
          p {
            width: 4.54rem;
            height: .4rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-weight: 700;
          }
          span{
            font-weight: 400;
            font-size: .24rem;
            color: #999;
          }
          margin-left: 0.3rem;
        }
      }
      .itemRight{
        width: 20%;
        height: 100%;
        display: flex;
        // justify-content: space-between;
        align-items: center;
        position: relative;
        .icon{
          fill: #999;
        }
         .bofang{
            position: absolute;
            left: 0;
          }
         .liebiao{
            position: absolute;
            right: 0;
          }
      }
    }
  }
</style>