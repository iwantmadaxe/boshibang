import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions.js';
import getters from './getters.js';
Vue.use(Vuex);
/** 创建一个对象来保存应用启动时的初始状态

 */
const state = {
	needComplete: 'false',
	token: '',
	userOrder: {}
};

// 创建一个对象存储一系列我们接下来要写的 mutation 函数
const mutations = {
	Change_Need_Complete (state, needComplete) {
		state.needComplete = needComplete;
	},
	Change_Token (state, token) {
		state.token = token;
	},
	Change_Order (state, userOrder) {
		state.userOrder = userOrder;
	}
};

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations
});
