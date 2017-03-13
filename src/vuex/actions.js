// action 会收到 store 作为它的第一个参数
// 既然我们只对事件的分发（dispatch 对象）感兴趣。（state 也可以作为可选项放入）

// 登录，将登录状态改为（out=>in）;修改具体认证状态;修改具体的身份状态;写入token;写入用户信息
export const goLogin = function ({ dispatch, state }, status) {
	dispatch('Change_Login_Status', status.loginStatus);
	dispatch('Change_Token', status.token);
	dispatch('Change_User_Info', status.info);
};

// 登出，将登录状态改为（in=>out）;修改具体认证状态;修改具体的身份状态;清空token;清空用户信息
export const goLogout = function ({ dispatch, state }) {
	dispatch('Change_Login_Status', 'out');
	dispatch('Change_Token', '');
	dispatch('Change_User_Info', {});
};
