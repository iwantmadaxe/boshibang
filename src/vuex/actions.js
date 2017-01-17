// action 会收到 store 作为它的第一个参数
// 既然我们只对事件的分发（dispatch 对象）感兴趣。（state 也可以作为可选项放入）

// 登录，将登录状态改为（out=>in）;修改具体认证状态;修改具体的身份状态;写入token;写入用户信息
export const goLogin = function ({ dispatch, state }, status) {
	dispatch('Change_Login_Status', status.loginStatus);
	dispatch('Change_Auth_Status', status.authStatus);
	dispatch('Change_Identity', status.identityStatus);
	dispatch('Change_Token', status.token);
	dispatch('Change_User_Info', status.info);
};

// 登出，将登录状态改为（in=>out）;修改具体认证状态;修改具体的身份状态;清空token;清空用户信息
export const goLogout = function ({ dispatch, state }) {
	dispatch('Change_Login_Status', 'out');
	dispatch('Change_Auth_Status', null);
	dispatch('Change_Identity', null);
	dispatch('Change_Token', '');
	dispatch('Change_User_Info', {});
};

// 修改认证状态
export const changeAuth = function ({ dispatch, state }, authStatus) {
	dispatch('Change_Auth_Status', authStatus);
};

// 招标状态赋值
export const giveApplyBidCompanies = function ({ dispatch, state }, info, status) {
	dispatch('Given_Apply_Bid_Enroll', info.enroll);
	dispatch('Given_Apply_Bid_InBid', info.inBid);
	dispatch('Given_Apply_Bid_LoseBid', info.loseBid);
	dispatch('Given_Apply_Bid_WinBid', info.winBid);
	dispatch('Given_Bid_Status', status);
};
