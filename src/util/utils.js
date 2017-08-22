const mixin = {
    methods: {
        tagType(tab, top, good) {
            // if (top) return "置顶"
            // if (good) return "精华"
            let arr = {
                ask: "问答",
                share: "分享",
                job: "招聘",
                good: "精华"
            }
            return arr[tab]
        },
        getTime(time) {
            let lasttime = new Date(time);
            let newtime = (new Date() - lasttime) / 1000; //秒
            if (newtime < 60) {
                return Math.floor(newtime) + "秒前";
            } else if (newtime / 60 < 60) {
                return Math.floor(newtime / 60) + "分钟前";
            } else if (newtime / 3600 < 24) {
                return Math.floor(newtime / 3600) + "小时前";
            } else if (newtime / 3600 / 24 < 30) {
                return Math.floor(newtime / 3600 / 24) + "天前";
            } else if (newtime / 3600 / 24 / 30 < 12) {
                return Math.floor(newtime / 3600 / 24 / 30) + "个月前";
            } else {
                return Math.floor(newtime / 3600 / 24 / 30 / 12) + "年前";
            }
        }
    }
}
// const mixin = {
//     tagType(tab, top, good) {
//         // if (top) return "置顶"
//         // if (good) return "精华"
//         let arr = {
//             ask: "问答",
//             share: "分享",
//             job: "招聘",
//             good: "精华"
//         }
//         return arr[tab]
//     },
//     getTime(time) {
//         let lasttime = new Date(time);
//         let newtime = (new Date() - lasttime) / 1000; //秒
//         if (newtime < 60) {
//             return newtime + "秒前";
//         } else if (newtime / 60 < 60) {
//             return Math.floor(newtime / 60) + "分钟前";
//         } else if (newtime / 3600 < 24) {
//             return Math.floor(newtime / 3600) + "小时前";
//         } else if (newtime / 3600 / 24 < 30) {
//             return Math.floor(newtime / 3600 / 24) + "天前";
//         } else if (newtime / 3600 / 24 / 30 < 12) {
//             return Math.floor(newtime / 3600 / 24 / 30) + "个月前";
//         } else {
//             return Math.floor(newtime / 3600 / 24 / 30 / 12) + "年前";
//         }
//     }
// }
export default mixin;