/**
* 开发商管理端招标详情页的返回参数
* bidStatus 1=>'报名中' 2=>'入围' 3=>'招标完成'
* applyStatus 1=>'报名' 2=>'入围' 3=>'落选' 4=>'中标'
*/
let backInfo = {
	id: null,
	companyId: null,
	title: '',
	providerAddress: '',
	serviceAddress: '',
	range: '',
	providerMoney: '',
	providerService: '',
	providerProject: '',
	providerOther: '',
	providerMaterial: '',
	bidStatus: null,
	deadline: '',
	createdAt: '',
	updatedAt: '',
	view: null,
	category: '',
	bidapply: []
};

function pureDeveloperBidDetail (info) {
	let tplApply = info.bidapply.map(function (item) {
		let tplItem = {
			applyId: null,
			applyStatus: null,
			logo: '',
			companyId: '',
			username: '',
			companyName: '',
			category: '',
			companyAddress: '',
			option: {
				label: '',
				value: null,
				disabled: true
			}
		};
		let option = {
			label: '申请人:' + item.companies.username,
			value: item.company_id,
			disabled: false
		};
		tplItem.applyId = item.id;
		tplItem.applyStatus = Number(item.status);
		tplItem.logo = item.companies.logo;
		tplItem.companyId = item.company_id;
		tplItem.username = item.companies.username;
		tplItem.companyName = item.companies.company_name;
		tplItem.category = item.companies.category;
		tplItem.companyAddress = item.companies.company_address;
		tplItem.option = option;
		return tplItem;
	});
	backInfo.id = info.id;
	backInfo.companyId = info.company_id;
	backInfo.title = info.title;
	backInfo.providerAddress = info.address1;
	backInfo.serviceAddress = info.address2;
	backInfo.range = info.range;
	backInfo.providerMoney = info.provider_money;
	backInfo.providerService = info.provider_service;
	backInfo.providerProject = info.provider_project;
	backInfo.providerOther = info.provider_other;
	backInfo.providerMaterial = info.provider_material;
	backInfo.bidStatus = Number(info.status);
	backInfo.deadline = info.deadline.split(' ')[0];
	backInfo.createdAt = info.created_at.split(' ')[0];
	backInfo.updatedAt = info.updated_at.split(' ')[0];
	backInfo.view = Number(info.view);
	backInfo.category = info.category;
	backInfo.bidapply = tplApply;
	return backInfo;
}

export default pureDeveloperBidDetail;
