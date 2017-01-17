/**
* 企业页状态查询的返回参数
*/
let backInfo = {
	provider: null,
	attention: null,
	companyFax: '',
	companyAddress: '',
	companyPhone: '',
	companyName: '',
	companyLogo: ''
};

function pureCompanyLatestStatus (info) {
	backInfo.provider = Number(info.provider);
	backInfo.attention = Number(info.attention);
	backInfo.companyFax = info.company_fax;
	backInfo.companyAddress = info.company_address;
	backInfo.companyPhone = info.company_phone;
	backInfo.companyName = info.company_name;
	backInfo.companyLogo = info.company_logo;
	return backInfo;
}

export default pureCompanyLatestStatus;
