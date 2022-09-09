import service  from "..";
// 获取首页轮播图的数据
export function getBanner(){
    return service({
        method:"GET",
        url:"/banner?type=2",
    })
}
// 获取发现好歌单
export function getMusicList(){
    return service({
        method:"GET",
        url:"/personalized?limit=10",
    })
}
// 搜索音乐
export function getSearchMusic(data){
    return service({
        method:"GET",
        url:`/cloudsearch?keywords=${data}`,
    })
}
// 登录/login/cellphone?phone=xxx&password=yyy
export function getPhoneLogin(data){
    return service({
        method:"GET",
        url:`/login/cellphone?phone=${data.phone}&password=${data.password}`,

    })
}