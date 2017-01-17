/**
* 本企业招标的返回参数
*/
let backInfo = {
	currentPage: 1,
	items: [],
	lastPage: 1
};

function pureCompanyLatestBid (info) {
	backInfo.items = info.data.map(function (itemTpl) {
		let item = {
			updatedAt: '',
			deadline: '',
			id: null,
			providerMoney: '',
			title: '',
			province: '',
			range: ''
		};
		item.updatedAt = itemTpl.updated_at.split(' ')[0];
		item.deadline = itemTpl.deadline.split(' ')[0];
		item.id = itemTpl.id;
		item.providerMoney = itemTpl.provider_money;
		item.title = itemTpl.title;
		item.province = itemTpl.province.name;
		item.range = itemTpl.range;
		return item;
	});
	backInfo.lastPage = Number(info.last_page);
	backInfo.currentPage = Number(info.current_page);
	return backInfo;
}

export default pureCompanyLatestBid;
