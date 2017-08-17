import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
// import Mock from 'mockjs'

Vue.use(Vuex)

const state = {
	returnshow: false,
	releaseshow: false,
	footnavshow: false,
	isLogin: localStorage.getItem("isLogin"),
	userToken: localStorage.getItem("userToken"),
	userId: localStorage.getItem("userId"),
	userName: localStorage.getItem("userName"),
	userAvatar: localStorage.getItem("userAvatar")
}

const mutations = {
	login(state) {
		console.log(121212);
		if (!state.isLogin) {
			state.isLogin = localStorage.getItem("isLogin");
			state.userToken = localStorage.getItem("userToken");
			state.userId = localStorage.getItem("userId");
			state.userName = localStorage.getItem("userName");
			state.userAvatar = localStorage.getItem("userAvatar");
		}
	},
	returnshowfn(state, { show }) {
		state.returnshow = show;
	},
	releaseshowfn(state, { show }) {
		state.releaseshow = show;
	},
	footnavshowfn(state, { show }) {
		state.footnavshow = show;
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