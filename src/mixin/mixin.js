const mixin = {
    methods: {
        tagType(tab, top, good) {
            let arr = {
                ask: "问答",
                share: "分享",
                job: "招聘",
                good: "精华",
                dev: "dev"
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
        },
        dateFormat(time = '') {
            if (!time) return time;
            let timearr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            let times = new Date(time).toString().split(" ");
            let month;
            for (let i = 0; i < timearr.length; i++) {
                if (timearr[i].toLocaleLowerCase().indexOf(times[1].toLocaleLowerCase()) == 0) {
                    if (i < 9) {
                        month = "0" + (i + 1);
                    } else {
                        month = i + 1;
                    }
                    break;
                }
            }
            return times[3] + "/" + month + "/" + times[2]
        }
    }
}
export default mixin;