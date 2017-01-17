const apiRoutes = {
	login: 'login',    // 验证登录
	verifyLocal: 'verifyLocal',    // 验证是否已经注册
	sms: 'sms',    // 发送验证码
	register: 'register',    // 注册
	forgetpass: 'forgetpass',    // 忘记密码
	changepass: 'updatepass',    // 修改密码
	search: 'search',    // 搜索
	recruitdetail: 'recruitdetail',    // 招募详情(非管理平台)
	recruitApply: 'recruit_apply',    // 企业招募报名
	companyLatestStatus: 'company_latest_status',    // 企业页状态查询
	companyLatestRecruit: 'company_latest_recruit',    // 企业页最新招募
	companyLatestBid: 'company_latest_bid',    // 企业页最新招标
	biddetail: 'biddetail',    // 招标详情(非管理平台)
	bidApply: 'bid_apply',    // 企业招标报名
	industry: 'industry2',    // 获取所有行业
	winMyBidList: 'winbid_list2',    // 本企业中标列表
	companyLatestProject: 'company_latest_project',    // 本企业项目信息列表
	companyRecord: 'company_record',    // 供应商详情页
	certificateStatus: 'certificate_status',    // 企业信息认证状态
	certificate: 'certificate',    // 企业信息认证提交
	address: 'address',    // 获取地址
	recruit: 'recruit',    // 招募列表（管理端）
	recruit_detail: 'recruit_detail',    // 企业招募详情(管理平台)
	recruitChecked: 'recruit_checked',    // 企业招募入库(管理平台)
	provider: 'provider',    // 供应商列表(管理平台)
	providerList: 'provider_list',    // 供应商申请列表(管理平台)
	providerManage: 'provider_manage',    // 管理供应商申请
	bid: 'bid',    // 企业招标列表(管理平台)
	bid_detail: 'bid_detail',    // 企业招标详情(管理平台)
	bidChecked: 'bid_checked',    // 企业招标操作(管理平台)
	myRecruit: 'my_recruit',    // 我参与的招募(管理平台)
	myBid: 'my_bid',    // 我参与的招标(管理平台)
	attention: 'attention',    // 我关注列表(管理平台)
	attentionUpdate: 'attention_update',    // 关注取关(管理平台)
	myNum: 'my_num',    // 招标招募数量查询(供应商管理平台)
	bidInviteList: 'bid_invite_list',    // 企业邀请招标列表(供应商管理平台)
	bidInviteRespond: 'bid_invite_respond',    // 企业邀请招标回应(管理平台)
	winbidList: 'winbid_list',    // 中标列表
	wechatOauthLogin: 'wechat/oauth/login'    // 微信绑定认证
};

export default apiRoutes;
