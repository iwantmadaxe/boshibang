// 获取登录状态
export function loginStatus (state) {
	return state.loginStatus;
};

// 获取认证状态
export function authStatus (state) {
	return state.authStatus;
};

// 获取身份状态
export function identityStatus (state) {
	return state.identityStatus;
};

// 获取全局分类
export function productionCategory (state) {
	return state.productionCategory;
};

// 获取用户基础信息
export function userInfo (state) {
	return state.user;
};

// 获取用户token
export function userToken (state) {
	return state.token;
};

// 获取招标报名
export function enroll (state) {
	return state.applyBidCompanies.enroll;
};

// 获取招标入围
export function inBid (state) {
	return state.applyBidCompanies.inBid;
};

// 获取招标中标
export function loseBid (state) {
	return state.applyBidCompanies.loseBid;
};

// 获取招标未中标
export function winBid (state) {
	return state.applyBidCompanies.winBid;
};

// 获取后台招标状态
export function bidStatus (state) {
	return state.bidStatus;
}
