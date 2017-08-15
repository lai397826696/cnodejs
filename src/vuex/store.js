import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
// import Mock from 'mockjs'

Vue.use(Vuex)

const state = {
	returnshow: false,
}

const mutations = {
	returnshowfn(state, {show}){
		state.returnshow=show;
	}
}

const actions = {

}
const getters = {

}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations
})