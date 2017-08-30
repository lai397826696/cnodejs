import Loading from '../components/Loading.vue'


export default {

    install(Vue, pluginOption = {}) {
        //创建子类挂载
        const VueLoading = Vue.extend(Loading);
        let loading = null;

        //初始化并显示loading
        function $loading() {
            return new Promise(resolve => {
                //第一次调用
                if (!loading) {
                    //手动创建一个为挂载的实例
                    loading = new VueLoading().$mount()
                    //挂载
                    document.querySelector(pluginOption.container || 'body').appendChild(loading.$el);
                }

                //显示loading
                loading.show()
                resolve()
            })
        }

        //定义关闭loading方法
        $loading.close = (noAnimate = false) => {
            return new Promise(resolve => {
                // if (!loading || !loading.isShow) {
                //     resolve()
                //     return
                // }
                // //判断首页是否在关闭时需要动画
                // if (noAmimate) {
                //     //默认只在此行为下移动动画，之后的行为仍有动画
                //     loading.removeAnimate().then(() => {
                //         loading.openAnimate()
                //     })
                // }
                if(!loading || !loading.isShow) {
                    resolve()
                    return
                }
                loading.hide()
                // document.querySelector(pluginOption.container || 'body').removeChild(loading.$el);
            })
        }

        Vue.loading = Vue.prototype.$loading = $loading
    }
}