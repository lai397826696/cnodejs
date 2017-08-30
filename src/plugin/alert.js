import Alert from '../components/Alert.vue'

export default {
    install(Vue, vueOption = {}) {
        const vueAlert = Vue.extend(Alert);
        let alert = null;
        let $alert = (option) => {
            let opt = {
                title: "提供默认的提示", //提示文字
                time: 2000, //关闭时间，默认2s
                callback() { }  //关闭时回调函数
            }
            if (!!option) {
                if (typeof option === 'string') {
                    opt.title = option
                } else {
                    opt = Object.assign(opt, option)
                }
            }
            alert = new vueAlert().$mount()
            alert.title = opt.title
            document.body.appendChild(alert.$el)
            alert.show()
            setTimeout(function () {
                alert.hide()
                if (typeof opt.callback === "function") {
                    opt.callback(alert)
                }
            }, opt.time);
        }

        Vue.alert = Vue.prototype.$alert = $alert
    }
}