// 获取登录状态
export function loginStatus (state) {
	return state.loginStatus;
};

// 获取用户基础信息
export function userInfo (state) {
	return state.user;
};

// 获取用户token
export function userToken (state) {
	return state.token;
};
