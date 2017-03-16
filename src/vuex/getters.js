// 获取登录状态
const needComplete = function (state) {
	return state.needComplete;
};

// 获取用户token
const userToken = function (state) {
	return state.token;
};

// 获取用户订单(完整的detail)
const userOrder = function (state) {
	return state.userOrder;
};

export default { needComplete, userToken, userOrder };
