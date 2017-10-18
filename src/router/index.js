import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

Vue.use(Router)
// const Foo = resolve => require(['./Foo.vue'], resolve)
const LazyLoading = (name) => {
	return resolve => require([`@/pages/${name}.vue`], resolve)
}
/*
* headShow 是否显示头部信息
* title 头部信息说明
* footnavshow 是否底部导航栏
* islogin 是否需要登录权限
*/
export default new Router({
	// mode: 'history',
	routes: [
		{
			path: '/',
			redirect: '/topics',
		},
		{
			path: '/topics',
			name: 'topics',
			component: LazyLoading("List"),
			meta: {
				headShow: false,
				footnavshow: true
			}
		},
		{
			path: '/topics/:id',
			name: 'details',
			component: LazyLoading("Details"),
			meta: {
				headShow: true,
				footnavshow: false,
				title: '帖子详情'
			}
		},
		{
			path: '/topic',
			name: 'topic',
			component: LazyLoading("Topics"),
			meta: {
				headShow: true,
				footnavshow: true,
				title: ''
			}
		},
		{
			path: '/user',
			name: 'user',
			component: LazyLoading("User"),
			meta: {
				headShow: false,
				footnavshow: true
			}
		},
		{
			path: '/user/:name',
			name: 'userinfos',
			component: LazyLoading("Userinfo"),
			meta: {
				headShow: true,
				footnavshow: false,
				islogin: true,
				title: '用户信息'
			}
		},
		{
			path: '/login',
			name: 'login',
			component: LazyLoading("Login"),
			meta: {
				headShow: true,
				footnavshow: false,
				title: '登录'
			}
		},
		{
			path: '/message',
			name: 'message',
			component: LazyLoading("Message"),
			meta: {
				headShow: true,
				footnavshow: false,
				title: '信息通知'
			}
		},
		{
			path: '/scroll',
			name: 'scroll',
			component: LazyLoading("Scroll"),
			meta: {
				headShow: true,
				footnavshow: false,
				title: '滚动条演示'
			}
		},
		{
			path: '/tabbox',
			name: 'tabbox',
			component: LazyLoading("tabPage"),
			meta: {
				headShow: true,
				footnavshow: false,
				title: ''
			}
		},
	]
})
