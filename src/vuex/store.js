import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
// import Mock from 'mockjs'

Vue.use(Vuex)

const state = {
	scrollTop: 0,
	goback: true,
	footnavshow: false,
	isLogin: localStorage.getItem("isLogin"),
	userToken: localStorage.getItem("userToken"),
	userId: localStorage.getItem("userId"),
	userName: localStorage.getItem("userName"),
	userAvatar: localStorage.getItem("userAvatar")
}

const mutations = {
	login(state) {
		if (!state.isLogin) {
			state.isLogin = localStorage.getItem("isLogin");
			state.userToken = localStorage.getItem("userToken");
			state.userId = localStorage.getItem("userId");
			state.userName = localStorage.getItem("userName");
			state.userAvatar = localStorage.getItem("userAvatar");
		}
	},
	gobackfn(state, { show }) {
		state.goback = show;
	},
	footnavshowfn(state, { show }) {
		state.footnavshow = show;
	},
	scrollTopfn(state, { top }) {
		state.scrollTop = top;
	}
}

const actions = {

}
const getters = {
	footnavshows: state => {
		return state.footnavshow;
	}
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations
})