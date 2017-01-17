/**
* 注册的返回参数
*/
let backInfo = {
	token: '',
	phone: '',
	companyType: null,
	status: null
};

function pureRegister (info) {
	backInfo.token = info.token;
	backInfo.phone = info.phone;
	backInfo.companyType = Number(info.company_type);
	backInfo.status = Number(info.status);
	return backInfo;
}

export default pureRegister;
