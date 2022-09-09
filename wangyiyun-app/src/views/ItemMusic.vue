<template>
  <ItemMusicTop :playlist="state.playlist"/>
  <ItemMusicList :itemList="state.itemList" :subscribedCount = "state.playlist.subscribedCount"/>
</template>

<script> 
import { useRoute } from 'vue-router';
import { onMounted, reactive } from 'vue';
import {getMusicItemTop, getMusicItemList} from '@/request/api/item.js'
import ItemMusicTop from '@/components/Item/ItemMusicTop.vue'
import ItemMusicList from '@/components/Item/ItemMusicList.vue'
export default {
    name:'ItemMusic',
    components:{ItemMusicTop, ItemMusicList},
    setup(){
        const state = reactive({
            playlist:{},//接收歌单详情页
            itemList:[]//接收具体歌曲
        });
        onMounted(async()=>{
            let id=useRoute().query.id;
            // console.log(id);
        // 获取歌单详情页
            let top = await getMusicItemTop(id);
            // console.log(top);
            state.playlist = top.data.playlist;
        // 获取歌单的歌曲
            let list= await getMusicItemList(id);
            // console.log(list);
            state.itemList = list.data.songs;
            // console.log(state.itemList);
        // 防止页面刷新，数据丢失，将数据保存在sessionStorage
            sessionStorage.setItem('itemDetail',JSON.stringify(state))
        });
        return { state }
    }
}
</script>

<style>

</style>