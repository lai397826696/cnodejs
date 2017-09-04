import Alert from '../components/Alert.vue'

export default {
    install(Vue, vueOption = {}) {
        const alertConstructor = Vue.extend(Alert);
        let alert = null;
        let alerts = [];
        let speed = 1;
        let userclose;

        let $alert = (option) => {
            alert = new alertConstructor().$mount()
            document.body.appendChild(alert.$el)
            let id = 'alert' + speed++;

            if (!!option) {
                if (typeof option === 'string') {
                    alert.message = option
                } else {
                    opt = Object.assign(opt, option)
                    alert.id = id
                    alert.message = opt.message
                    alert.duration = opt.duration
                    alert.callback = opt.callback
                }
            }
            alert.showfn()
        }

        Vue.alert = Vue.prototype.$alert = $alert
    }
}