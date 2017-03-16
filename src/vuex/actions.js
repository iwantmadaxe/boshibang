// action 会收到 store 作为它的第一个参数
// 既然我们只对事件的分发（dispatch 对象）感兴趣。（state 也可以作为可选项放入）

// 登录，将登录状态改为（out=>in）;修改具体认证状态;修改具体的身份状态;写入token;写入用户信息
const goLogin = function ({ commit, state }, status) {
	commit('Change_Need_Complete', status.needComplete);
	commit('Change_Token', status.token);
};

// 登出，将登录状态改为（in=>out）;修改具体认证状态;修改具体的身份状态;清空token;清空用户信息
const goLogout = function ({ commit, state }) {
	commit('Change_Need_Complete', 'false');
	commit('Change_Token', '');
};

const changeUserOrder = function ({ commit, state }, status) {
	commit('Change_Order', status);
};

export default { goLogin, goLogout, changeUserOrder };
