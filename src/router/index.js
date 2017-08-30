import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

Vue.use(Router)
// const Foo = resolve => require(['./Foo.vue'], resolve)
const LazyLoading = (name) => {
	return resolve => require([`@/pages/${name}.vue`], resolve)
}

export default new Router({
	// mode: 'history',
	routes: [
		{
			path: '/',
			redirect: '/topics',
		},
		{
			path: '/topics',
			// redirect: '/',
			name: 'topics',
			component: LazyLoading("List"),
			meta: {
				goback: true,
				footnavshow: true
			}
		},
		{
			path: '/topics/:id',
			name: 'details',
			component: LazyLoading("Details"),
			meta: {
				// footnavshow: false
			}
		},
		{
			path: '/topic',
			name: 'topic',
			component: LazyLoading("Topics"),
			meta: {
				goback: true,
				footnavshow: true,
			}

		},
		{
			path: '/user',
			name: 'user',
			component: LazyLoading("User"),
			meta: {
				goback: true,
				footnavshow: true
			}

		},
		{
			path: '/user/info',
			name: 'userinfo',
			component: LazyLoading("Userinfo"),
			meta: {
				// footnavshow: false,
			}
		},
		{
			path: '/user/:name',
			name: 'userinfo',
			component: LazyLoading("Userinfo"),
			meta: {
				// footnavshow: false,
			}
		},
		{
			path: '/login',
			name: 'login',
			component: LazyLoading("Login"),
			meta: {
				// footnavshow: false
			}

		},
		{
			path: '/message',
			name: 'message',
			component: LazyLoading("Message"),
			meta: {
				// footnavshow: false
			}

		},
	]
})
