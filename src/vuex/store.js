import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
/** 创建一个对象来保存应用启动时的初始状态
 * loginStatus: in/out; authStatus: waiting/passing/notYet; identityStatus: custom/developer/supplier
 * productionCategory: [], user: {}, token: ''
 * applyBidCompanies: {enroll: [], inBid: [], loseBid: [], winBid: []}
 */
const state = {
	loginStatus: 'out',
	user: {},
	token: ''
};

// 创建一个对象存储一系列我们接下来要写的 mutation 函数
const mutations = {
	Change_Login_Status (state, status) {
		state.loginStatus = status;
	},
	Change_User_Info (state, info) {
		state.user = info;
	},
	Change_Token (state, token) {
		state.token = token;
	}
};

export default new Vuex.Store({
	state,
	mutations
});
