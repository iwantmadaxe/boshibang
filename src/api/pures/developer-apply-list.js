/**
* 开发商平台供应商申请列表的返回参数
*/
let backInfo = {
	currentPage: 1,
	items: [],
	lastPage: 1
};

function pureDeveloperApplyList (info) {
	let tplInfo = info.data.filter(function (ti) {
		return (ti.apply.company_id);
	});
	backInfo.items = tplInfo.map(function (itemTpl) {
		let item = {
			companyId: '',
			companyMoney: '',
			companyName: '',
			username: '',
			logo: '',
			companyAddress: '',
			industry: ''
		};
		item.companyId = itemTpl.apply.company_id;
		item.companyMoney = itemTpl.apply.company_money;
		item.companyName = itemTpl.apply.company_name;
		item.username = itemTpl.apply.username;
		item.logo = itemTpl.apply.logo;
		item.companyAddress = itemTpl.apply.company_address;
		item.industry = itemTpl.apply.industry;
		return item;
	});
	backInfo.lastPage = Number(info.last_page);
	backInfo.currentPage = Number(info.current_page);
	return backInfo;
}

export default pureDeveloperApplyList;
