// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './vuex/store'
import api from './assets/js/api'
import './assets/js/dpr'
import './assets/css/global.css'

Vue.config.productionTip = false
// Vue.prototype.$api = api

Vue.prototype.$http = axios
Vue.prototype.$api = "https://cnodejs.org/api/v1";
Vue.prototype.$token = "595447be-4e58-4ebb-9fc2-8057979109d4";

// Vue.prototype={
// 	"$http": axios,
// 	"$api": "https://cnodejs.org/api/v1",
// 	"$token": "595447be-4e58-4ebb-9fc2-8057979109d4",
// }
Vue.prototype.goback=()=>{
	console.log("goback");
}


router.beforeEach((to, from, next) => {
	//是否显示底部导航栏
	if (!!to.meta.footnavshow) {
		store.commit('footnavshowfn', { show: to.meta.footnavshow });
	} else {
		store.commit('footnavshowfn', { show: to.meta.footnavshow });
	}

	//是否显示返回上一步路由的顶部框
	if (to.meta.goback) {
		store.commit('gobackfn', { show: !to.meta.goback });
	} else {
		store.commit('gobackfn', { show: !to.meta.goback });
	}
	next();
})

/* eslint-disable no-new */
new Vue({
	el: '#app',
	store,
	router,
	template: '<App/>',
	components: { App }
})
