// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './vuex/store'
import './assets/js/dpr'
import './assets/css/global.css'
import VueLoading from './plugin/loading'
import VueAlter from './plugin/alert'

Vue.config.productionTip = false

Vue.use(VueLoading);
Vue.use(VueAlter);

Vue.prototype.$http = axios

axios.defaults.baseURL = 'https://cnodejs.org/api/v1';
axios.interceptors.request.use(function (config, boo) {
	Vue.prototype.$loading();
	return config;
}, function (error) {
	Vue.prototype.$loading('请求错误');
	Vue.prototype.$loading.close();
	return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
	Vue.prototype.$loading.close()
	return response;
}, function (error) {
	Vue.prototype.$loading('接收错误');
	Vue.prototype.$loading.close();
	return Promise.reject(error);
});


router.beforeEach((to, from, next) => {
	console.log(to);
	//验证跳转的路由是否要登录权限
	if (!!to.meta.islogin) {
		if (!store.state.isLogin || to.params.name == "null") {
			Vue.prototype.$alert("还没有登录呢~")
			return false;
		}
	} else {
		
	}
	//是否显示固定头部
	store.commit('headShowfn', { show: to.meta.headShow });
	if (String(to.meta.leftshow)=='false') {
		store.commit('leftshowfn', { show: to.meta.leftshow });
	} else {
		store.commit('leftshowfn', { show: !to.meta.leftshow });
	}
	//头部文字
	store.commit('titlefn', { title: to.meta.title });
	//是否显示底部导航栏
	store.commit('footnavshowfn', { show: to.meta.footnavshow });

	next();
})

const Bus = new Vue()
/* eslint-disable no-new */
new Vue({
	el: '#app',
	data: { 
		Bus
	},
	store,
	router,
	template: '<App/>',
	components: { App }
})
