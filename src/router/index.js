import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

Vue.use(Router)
// const Foo = resolve => require(['./Foo.vue'], resolve)
const LazyLoading = (name) => {
	return resolve => require([`@/pages/${name}.vue`], resolve)
}

export default new Router({
	routes: [
		{
			path: '/',
			redirect: '/topics',
			// component: LazyLoading("List")
		},
		{
			path: '/topics',
			// redirect: '/',
			name: '',
			component: LazyLoading("List")
		},
		{
			path: '/good',
			name: 'good',
			component: LazyLoading("List")
		},
		{
			path: '/share',
			name: 'share',
			component: LazyLoading("List")
		},
		{
			path: '/ask',
			name: 'ask',
			component: LazyLoading("List")
		},
		{
			path: '/job',
			name: 'job',
			component: LazyLoading("List")
		},
		{
			path: '/dev',
			name: 'dev',
			component: LazyLoading("List")
		},
		{
			path: '/topics/:id',
			name: 'details',
			component: LazyLoading("Details"),
			meta: {
				returnshow: true
			}
		},
		{
			path: '/topic',
			name: 'topic',
			component: LazyLoading("Topics"),
			
		},
	]
})
