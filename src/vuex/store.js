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
	authStatus: 'notYet',
	identityStatus: 'custom',
	productionCategory: [],
	user: {},
	token: '',
	applyBidCompanies: {
		enroll: [],
		inBid: [],
		loseBid: [],
		winBid: []
	},
	bidStatus: null
};

// 创建一个对象存储一系列我们接下来要写的 mutation 函数
const mutations = {
	Change_Login_Status (state, status) {
		state.loginStatus = status;
	},
	Change_Auth_Status (state, status) {
		switch (status) {
		case 0:
			state.authStatus = 'notYet';
			break;
		case 1:
			state.authStatus = 'waiting';
			break;
		case 2:
			state.authStatus = 'passing';
			break;
		default:
			state.authStatus = 'notYet';
			break;
		}
	},
	Change_Identity (state, identity) {
		switch (identity) {
		case 0:
			state.identityStatus = 'custom';
			break;
		case 1:
			state.identityStatus = 'developer';
			break;
		case 2:
			state.identityStatus = 'supplier';
			break;
		default:
			state.identityStatus = 'custom';
			break;
		}
	},
	Change_Production_Category (state, cat) {
		state.productionCategory = cat;
	},
	Change_User_Info (state, info) {
		state.user = info;
	},
	Change_Token (state, token) {
		state.token = token;
	},
	Given_Apply_Bid_Enroll (state, info) {
		state.applyBidCompanies.enroll = info;
	},
	Given_Apply_Bid_InBid (state, info) {
		state.applyBidCompanies.inBid = info;
	},
	Given_Apply_Bid_LoseBid (state, info) {
		state.applyBidCompanies.loseBid = info;
	},
	Given_Apply_Bid_WinBid (state, info) {
		state.applyBidCompanies.winBid = info;
	},
	Given_Bid_Status (state, status) {
		state.bidStatus = status;
	}
};

export default new Vuex.Store({
	state,
	mutations
});
