const apiRoutes = {
	sms: 'sms',    // 发送验证码
	user: 'user',    // 注册
	login: 'user/login',  //  登陆
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
	search: 'service/search'  //  搜索（即服务搜索）
};

export default apiRoutes;
