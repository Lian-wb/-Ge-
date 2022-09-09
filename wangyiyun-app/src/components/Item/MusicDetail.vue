<template>
    <!-- 虚化背景 -->
    <img :src="musicList.al.picUrl" alt="" class="bgimg">
    <!-- 头部部分 -->
    <div class="detailTop">
        <div class="detailTopLeft">
            <svg class="icon liebiao" aria-hidden="true" @click="backHome">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
            <div class="leftMarquee">
                <Vue3Marquee style="color:#fff">
                    {{musicList.al.name}}
                </Vue3Marquee>
                <span v-for="item in musicList.ar" :key="item">{{item.name}}</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-youjiantou"></use>
                </svg>
            </div>
        </div>
        <div class="detailTopRight">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-fenxiang"></use>
            </svg>
        </div>
    </div>
    <!-- 中间部分 -->
    <div class="detailContent" v-show="isLyricShow">
        <img src="@/assets/needle-ab.png" alt="" class="img_needle" :class="{img_needle_active:!isbtnShow}"/>
        <img src="@/assets/cd.png" alt="" class="img_cd"/>
        <img :src="musicList.al.picUrl" alt="" class="img_ar" :class="!isbtnShow ? 'img_ar_active' : 'img_ar_paused'" @click="isLyricShow=false"/>
    </div>
    <!-- 歌词部分 -->
    <div class="musicLyric" ref="musicLyric" v-show="!isLyricShow" @click="isLyricShow=true">
        <p v-for="item in lyric" :key="item" 
        :class="[{'active':currentTime*1000>=item.time && currentTime*1000<item.pre},]" 
        :style="{'animation-duration': (item.pre-item.time)*1000 }">
            {{item.lrc}}
        </p>
    </div>
    <!-- 底部 -->
    <div class="detailFooter">
        <div class="footerTop">
            <svg class="icon liebiao" aria-hidden="true">
                <use xlink:href="#icon-aixin"></use>
            </svg>
            <svg class="icon liebiao" aria-hidden="true">
                <use xlink:href="#icon-25xiazai"></use>
            </svg>
            <svg class="icon liebiao" aria-hidden="true">
                <use xlink:href="#icon-banzou-"></use>
            </svg>
            <svg class="icon liebiao" aria-hidden="true">
                <use xlink:href="#icon-pinglun-"></use>
            </svg>
            <svg class="icon liebiao" aria-hidden="true">
                <use xlink:href="#icon-androidgengduo"></use>
            </svg>
        </div>
        <div class="footerContent">
            <input type="range" class="range" min="0" :max="duration" v-model="currentTime" step="0.05"/>
        </div>
        <div class="footer">
            <svg class="icon liebiao" aria-hidden="true">
                <use xlink:href="#icon-replay"></use>
            </svg>
            <svg class="icon liebiao" aria-hidden="true" @click="goPlay(-1)">
                <use xlink:href="#icon-shangyishoushangyige"></use>
            </svg>
            <svg class="icon bofang" aria-hidden="true" v-if="isbtnShow" @click="play">
                <use xlink:href="#icon-bofang2"></use>
            </svg>
            <svg class="icon bofang" aria-hidden="true" v-else @click="play">
                <use xlink:href="#icon-bofang1"></use>
            </svg>
            <svg class="icon liebiao" aria-hidden="true" @click="goPlay(1)">
                <use xlink:href="#icon-xiayigexiayishou"></use>
            </svg>
            <svg class="icon liebiao" aria-hidden="true">
                <use xlink:href="#icon-gengduo1"></use>
            </svg>
        </div>
    </div>
</template>

<script>
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import { mapMutations, mapState } from 'vuex'
export default {
    name:'MusicDetail',
    props:['musicList','isbtnShow','play','addDuration'],
    data(){
        return{
            isLyricShow:true//是否显示歌词 / 轮盘
        }
    },
    mounted(){
        // console.log(this.lyricList.lyric);
        this.addDuration();
    },
    computed:{
        ...mapState([
            'lyricList',
            'currentTime',
            'playListIndex',
            'playList',
            'duration',
        ]),
        lyric(){//解析歌词
            let arr;
            //先判断数据拿来没有，拿到歌词了再进行处理
            if(this.lyricList.lyric){
                arr=this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item,i)=>{
                    let min=item.slice(1,3);
                    let sec=item.slice(4,6);
                    let mill=item.slice(7,10);
                    let lrc=item.slice(11,item.length);
                    let time=parseInt(min)*60*1000+parseInt(sec)*1000+parseInt(mill)
                    if(isNaN(Number(mill))){
                        mill=item.slice(7,9);
                        lrc=item.slice(10,item.length)
                        time=parseInt(min)*60*1000+parseInt(sec)*1000+parseInt(mill)
                    };
                    // 全部歌词是一个数组，一条歌词是一个对象
                    return{min,sec,mill,lrc,time}
                });
                //下一句歌词开始时间
                arr.forEach((item,i) => {
                    if(i===arr.length-1 || isNaN(arr[i+1].time)){
                        item.pre=10000
                    }else{
                        item.pre=arr[i+1].time
                    }
                    // console.log(item.pre);
                });
            }
            return arr
        }
    },
    methods:{
        backHome(){
            this.updateDetailShow(),
            this.isLyricShow=true
        },
        goPlay(n){
            let index=this.playListIndex+n;
            if(index<0){
                index=this.playList.length-1
            }else if(index==this.playList.length){
                index=0
            }
            this.updatePlayListIndex(index)
        },
        ...mapMutations(['updateDetailShow','updatePlayListIndex'])
    },
    watch:{
        currentTime(newValue){
            let p =document.querySelector("p.active")
            if(p){
                if(p.offsetTop>300){
                //歌词整体的滚动高度跟随标亮歌词的滚动
                this.$refs.musicLyric.scrollTop=p.offsetTop-300
                }
            }
            if(newValue===this.duration){
                this.updatePlayListIndex(this.playListIndex+1);
                if(this.playListIndex===this.playList.length-1){
                    this.goPlay(1);
                }
            }
        }
    },
    components: {
        Vue3Marquee,
    },
}
</script>

<style lang="less" scoped>
    .bgimg{
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: -1;
        filter: blur(1.4rem);
    }
    .detailTop {
        width: 100%;
        height: 1rem;
        display: flex;
        padding: 0.2rem;
        margin-top: 0.2rem;
        justify-content: space-between;
        align-items: center;
        fill: #fff;
        .detailTopLeft {
            display: flex;
            align-items: center;
            .leftMarquee {
                width: 2.5rem;
                height: 100%;
                margin-left: 0.4rem;
                span {
                    color: #fff;
                    opacity: 0.6;
                }
                .icon {
                    width: 0.3rem;
                    height: 0.3rem;
                    fill: #fff;
                    opacity: 0.6;
                    transform: translate(0.1rem,0.03rem);
                }
            }
        }
    }
    .detailContent {
        width: 100%;
        height: 8rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        .img_needle {
            width: 2rem;
            height: 3rem;
            position: absolute;
            left: 46%;
            transform-origin: 0 0;
            transform: rotate(-13deg);
            transition: all 2s;
        }
        .img_needle_active {
            width: 2rem;
            height: 3rem;
            position: absolute;
            left: 46%;
            transform-origin: 0 0;
            transform: rotate(0deg);
            transition: all 2s;
        }
        .img_cd {
            width: 5rem;
            height: 5rem;
            position: absolute;
            bottom: 1.2rem;
            z-index: -1;
        }
        .img_ar {
            width: 3.2rem;
            height: 3.2rem;
            border-radius: 50%;
            position: absolute;
            bottom: 2.1rem;
            animation: rotate_ar 10s linear infinite;
        }
        .img_ar_active {
            animation-play-state: running;
        }
        .img_ar_paused {
            animation-play-state: paused;
        }
        @keyframes rotate_ar {
            0% {
            transform: rotateZ(0deg); 
            }
            100% {
            transform: rotateZ(360deg);
            }
        }
    }
    .musicLyric {
        width: 100%;
        height: 8rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 0.2rem;
        overflow: scroll;
        p {
            color: #fff;
            opacity: 0.6;
            background:  -webkit-linear-gradient(left, white, white) no-repeat 0 0;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            -webkit-background-clip: text;
            margin-bottom: 0.3rem;
        }
        .active {
            color: #fff;
            font-size: 0.5rem;
            opacity: 1;
            background-size: 100% 100%;
            animation: scan 1.5s linear;
        }
        @keyframes scan {
            0% {
                background-size:100% 0%;
            }
            100% {
                background-size:100% 100%;
            }
        }
    }
    .detailFooter {
        width: 100%;
        height: 3rem;
        position: absolute;
        bottom: 0.2rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .footerTop {
            width: 100%;
            height: 1rem;
            display: flex;
            justify-content: space-around;
            align-items: center;
            .icon {
                width: 0.36rem;
                height: 0.36rem;
                fill: rgb(245, 234, 234);
            }
            .icon {
                width: 0.6rem;
                height: 0.6rem;
            }
        }
        .range {
            width: 100%;
            height: 0.06rem;
        }
        .footer {
            width: 100%;
            height: 1rem;
            display: flex;
            justify-content: space-around;
            align-items: center;
            .icon {
                fill: rgb(245, 234, 234);
            }
            .bofang {
                width: 1rem;
                height: 1rem;
            }
        }
    }
</style>