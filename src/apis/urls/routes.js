const apiRoutes = {
	sms: 'sms',    // 发送验证码
	user: 'user',    // 注册
	mine: 'user/mine',    // 我的页面
	userProfile: 'user/profile',  //  用户信息
	login: 'user/login',  //  登陆
	logout: 'user/logout',  //  退出登陆
	forget: 'user/password/forget',  //  忘记密码
	category: 'category',  //  服务类别
	services: 'services',  //  服务列表
	service: 'service',  //  服务详情
	address: 'option/area',  //  地址列表
	order: 'order',  //  下单接口
	orders: 'orders',  //  订单列表
	contact: 'contact',  //  联系人（增改删）
	contacts: 'contacts',  //  联系人列表
	contactDefault: 'contact/default',  //  默认联系人
	search: 'service/search',  //  搜索（即服务搜索）
	comment: 'comment',  //  评论
	comments: 'comments',  //  评论列表
	coupon: 'coupon',  //  优惠券
	couponSuit: 'coupon/suitable',  //  适合的优惠券列表
	shoppingCart: 'shoppingCart',  //   从购物车删除
	shoppingCartJoin: 'shoppingCart',  //  购物车
	shoppingCartList: 'shoppingCart/list'  //  购物车列表
};

export default apiRoutes;
