/**
* 供应商详情页的返回参数
*/
let backInfo = {
	base: {
		companyIndustry: '',
		companyYear: '',
		companyServices: '',
		companyMoney: '',
		companyLicense: '',
		companyLegalPerson: ''
	},
	licenseInfo: {
		license: [],
		honor: [],
		case: []
	},
	contactInfo: {
		companyPhone: '',
		companyFax: '',
		companyAddress: '',
		companyHotline: '',
		companyConnect: '',
		title: '',
		phone: '',
		email: '',
		QQ: ''
	},
	companyName: '',
	companyLogo: '',
	companyIntro: '',
	companyForShort: '',
	album: [],
	companies: []
};

function pureCompanyRecord (info) {
	backInfo.contactInfo.companyFax = info.company_fax;
	backInfo.contactInfo.companyAddress = info.company_address;
	backInfo.contactInfo.companyPhone = info.company_phone;
	backInfo.companyName = info.company_name;
	backInfo.companyLogo = info.company_logo;
	backInfo.contactInfo.companyHotline = info.company_hotline;
	backInfo.contactInfo.companyConnect = info.company_connect;
	backInfo.contactInfo.phone = info.phone;
	backInfo.contactInfo.email = info.email;
	backInfo.contactInfo.title = info.title;
	backInfo.contactInfo.QQ = '';
	backInfo.base.companyIndustry = info.company_industry;
	backInfo.companyIntro = info.company_intro;
	backInfo.companyForShort = info.company_forshort;
	backInfo.base.companyLegalPerson = info.company_legalperson;
	backInfo.base.companyYear = info.company_year;
	backInfo.base.companyMoney = info.company_money;
	backInfo.base.companyLicense = info.company_license;
	backInfo.base.companyServices = info.company_services;
	backInfo.album = info.album;
	backInfo.licenseInfo.license = info.license;
	backInfo.licenseInfo.honor = info.honor;
	backInfo.companies = info.companies;
	backInfo.licenseInfo.case = info.case;
	return backInfo;
}

export default pureCompanyRecord;
