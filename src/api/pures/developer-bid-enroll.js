/**
* 开发商管理端招标详情页(入围)的返回参数
* bidStatus 1=>'报名中' 2=>'入围' 3=>'招标完成'
* applyStatus 1=>'报名' 2=>'入围' 3=>'落选' 4=>'中标'
*/
let backInfo = {
	bidapply: []
};

function pureDeveloperBidEnroll (info) {
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
	backInfo.bidapply = tplApply;
	return backInfo;
}

export default pureDeveloperBidEnroll;
