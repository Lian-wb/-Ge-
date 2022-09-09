import service  from "..";
// 获取歌单详情页的数据
export function getMusicItemTop(data){
    return service({
        method:"GET",
        url:`/playlist/detail?id=${data}`
    })
}
// 获取歌单的所有歌曲
export function getMusicItemList(data){
    return service({
        method:"GET",
        url:`/playlist/track/all?id=${data}&limit=20&offset=0`
    })
}
// 获取歌曲的歌词
export function getMusicLyric(data){
    return service({
        method:"GET",
        url:`/lyric?id=${data}`
    })
}