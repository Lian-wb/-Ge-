<template>
  <div class="FooterMusic">
    <div class="footerLeft" @click="updateDetailShow">
        <img :src="playList[playListIndex].al.picUrl" alt="">
        <div>
            <p>{{playList[playListIndex].name}}</p>
            <span>横划切换上下首歌</span>
        </div>
    </div>
    <div class="footerRight">
        <svg class="icon" aria-hidden="true" v-if="isbtnShow" @click="play">
            <use xlink:href="#icon-bofang2"></use>
        </svg>
        <svg class="icon" aria-hidden="true" v-else @click="play">
            <use xlink:href="#icon-bofang1"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-24gf-playlistMusic4"></use>
        </svg>
    </div>
    <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"></audio>
    <van-popup v-model:show="detailShow" position="bottom" :style="{ height: '100%',width:'100' }">
        <MusicDetail 
            :musicList="playList[playListIndex]" 
            :play="play" 
            :isbtnShow="isbtnShow" 
            :addDuration="addDuration"
        />
    </van-popup> 
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import MusicDetail from '@/components/Item/MusicDetail.vue'
// import { computed,onMounted } from 'vue';
export default {
    name:"FooterMusic",
    data(){
        return{
            interVal:0
        }
    },
    components:{MusicDetail},
    computed:{
        ...mapState(['playList','playListIndex','isbtnShow','detailShow'])
    },
    mounted(){
        // console.log(this.$refs);
        this.$store.dispatch("getLyric",this.playList[this.playListIndex].id) ;
        this.updateTime()
    },
    updated(){
        // this.$store.dispatch("getLyric",this.playList[this.playListIndex].id)
        this.addDuration()
    },
    methods:{
        play(){
            // 判断音乐是否播放
            if(this.$refs.audio.paused){//Audio的暂停键选中时paused会是true
                this.$refs.audio.play();
                this.updateIsbtnShow(false);
                this.updateTime();//播放时开启定时器
            }else{
                this.$refs.audio.pause();
                this.updateIsbtnShow(true);
                clearInterval(this.interVal);//暂停清除定时器

            }
        },
        // 拿到当前歌词播放的时间
        updateTime(){
            this.interVal=setInterval(()=>{
                this.updateCurrentTime(this.$refs.audio.currentTime)
            },50)
        },
        // 拿到当前歌曲总时长
        addDuration(){
            this.updateDuration(this.$refs.audio.duration)
        },
        ...mapMutations([
            'updateIsbtnShow',
            'updateDetailShow',
            'updateCurrentTime',
            'updateDuration',
        ])
    },
    watch:{
        playListIndex(){//监听下标发生了改变，就自动播放音乐
            this.$refs.audio.autoplay=true;
            if(this.$refs.audio.paused){//如果是暂停状态，改变图标
                this.updateIsbtnShow(false)
            };
            this.$store.dispatch("getLyric",this.playList[this.playListIndex].id)
        },
        playList(){
            if(this.isbtnShow){
                this.$refs.audio.autoplay=true;
                this.updateIsbtnShow(false)
            }
            this.$store.dispatch("getLyric",this.playList[this.playListIndex].id)
        }

    }
    // setup(){
    //     const audio = ref();
    //     onMounted(()=>{
    //         console.log(audio);
    //     })
    //     return{ audio }
    // }
}
</script>

<style lang="less" scoped>
.FooterMusic{
    width: 100%;
    height: 1.4rem;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    border-top: 1px solid #999;
    display: flex;
    padding: .1rem;
    justify-content: space-between;
    .footerLeft{
        width: 60%;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        img{
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
            margin-right: .2rem;
        }
    }
    .footerRight{
        width: 20%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icon{
            width: .6rem;
            height: .6rem;
        }
    }
}
</style>