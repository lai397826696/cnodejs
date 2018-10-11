import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// const Foo = resolve => require(['./Foo.vue'], resolve)
const LazyLoading = (name) => {
	return resolve => require([`../pages/${name}.vue`], resolve)
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
			name: 'index',
			redirect: '/topics',
		},
		{
			path: '/topics',
			name: 'topics',
			// component: LazyLoading("List"),
			component: resolve => require(['../pages/List.vue'], resolve),
			meta: {
				headShow: false,
				footnavshow: true
			}
		},
		{
			path: '/topic',
			name: 'topic',
			// component: LazyLoading("Topics"),
			component: resolve => require(['../pages/Topics.vue'], resolve),
			meta: {
				headShow: true,
				title: '发布帖子',
				footnavshow: true,
				leftshow: false,
				islogin: true
			}
		},
		{
			path: '/user',
			name: 'user',
			// component: LazyLoading("User"),
			component: resolve => require(['../pages/User.vue'], resolve),
			meta: {
				headShow: true,
				title: "个人中心",
				footnavshow: true,
				leftshow: false
			}
		},
		{
			path: '/topics/:id',
			name: 'details',
			// component: LazyLoading("Details"),
			component: resolve => require(['../pages/Details.vue'], resolve),
			meta: {
				headShow: true,
				title: '帖子详情',
				footnavshow: false,
			}
		},
		{
			path: '/user/:name',
			name: 'userinfos',
			// component: LazyLoading("Userinfo"),
			component: resolve => require(['../pages/Userinfo.vue'], resolve),
			meta: {
				headShow: true,
				title: '用户信息',
				footnavshow: false,
				islogin: true,
			}
		},
		{
			path: '/login',
			name: 'login',
			// component: LazyLoading("Login"),
			component: resolve => require(['../pages/Login.vue'], resolve),
			meta: {
				headShow: true,
				title: '用户登录',
				footnavshow: false,
			}
		},
		{
			path: '/message',
			name: 'message',
			// component: LazyLoading("Message"),
			component: resolve => require(['../pages/Message.vue'], resolve),
			meta: {
				headShow: true,
				title: '消息通知',
				footnavshow: true,
				islogin: true,
				leftshow: false
			}
		},
		{
			path: '/scroll',
			name: 'scroll',
			// component: LazyLoading("Scroll"),
			component: resolve => require(['../pages/Scroll.vue'], resolve),
			meta: {
				headShow: true,
				title: '滚动条演示',
				footnavshow: false,
			}
		},
		{
			path: '/tabbox',
			name: 'tabbox',
			// component: LazyLoading("tabPage"),
			component: resolve => require(['../pages/tabPage.vue'], resolve),
			meta: {
				headShow: true,
				title: 'tab',
				footnavshow: false,
			}
		},
		{
			path: '/directive',
			name: 'directive',
			// component: LazyLoading("tabPage"),
			component: resolve => require(['../pages/Directive.vue'], resolve),
			meta: {
				headShow: true,
				title: '指令',
				footnavshow: false,
			}
		},
	]
})
