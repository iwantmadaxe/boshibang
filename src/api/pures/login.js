/**
* 登录返回参数
* token: 登录字段
* phone: 用户信息
* companyType: 1:开发商，2:供应商
* status: 0:未认证，1:认证中，2:认证通过
*/
let login = {
	token: '',
	phone: '',
	logo: '',
	companyType: null,
	status: null
};

function makeLogin (info) {
	login.token = info.token;
	login.phone = info.phone;
	login.logo = info.logo;
	login.companyType = Number(info.company_type);
	login.status = Number(info.status);
	return login;
}

export default makeLogin;
