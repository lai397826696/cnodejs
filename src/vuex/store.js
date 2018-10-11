import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
Vue.use(Vuex)

const local = (arr = '') => {
	let star = window.localStorage.getItem("userinfo");
	if (!!arr && star != "undefined") return JSON.parse(star)[arr];
	return !!star ? true : false;
}

const state = {
	scrollTop: 0,
	headShow: null,
	footnavshow: null,
	leftshow: true,
	title: '',
	msgCount: 0,
	isLogin: local() ? local('success') : null,
	userToken: local() ? local('token') : null,
	userId: local() ? local('id') : null,
	userName: local() ? local('loginname') : null,
	userAvatar: local() ? local('avatar_url') : null,
}

const mutations = {
	loginfn(state, data) {
		if (!state.isLogin) {
			window.localStorage.setItem("userinfo", JSON.stringify(data))
			state.isLogin = data.success;
			state.userToken = data.token;
			state.userId = data.id;
			state.userName = data.loginname;
			state.userAvatar = data.avatar_url;
		}
	},
	headShowfn(state, { show }) {
		state.headShow = show;
	},
	titlefn(state, { title }) {
		state.title = title;
	},
	footnavshowfn(state, { show }) {
		state.footnavshow = show;
	},
	leftshowfn(state, { show }) {
		state.leftshow = show;
	},
	scrollTopfn(state, { top }) {
		state.scrollTop = top;
	},
	msgCountfn(state, { data }) {
		state.msgCount = data;
	},
	resetMsgCount(state) {
		state.msgCount = 0;
	}
}

const actions = {
	msgCountfn({ commit, state }) {
		axios.get('/message/count', {
			params: {
				accesstoken: state.userToken
			}
		}).then(res => {
			commit('msgCountfn', res.data)
		}).catch(error => {
			throw new Error(error);
		})
	}
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