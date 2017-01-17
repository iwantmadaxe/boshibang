/**
* 开发商管理平台招标列表的返回参数
*/
let backInfo = {
	currentPage: 1,
	items: [],
	lastPage: 1
};

function pureDeveloperBidList (info) {
	backInfo.items = info.data.map(function (itemTpl) {
		let item = {
			createdAt: '',
			deadline: '',
			fromNow: '',
			id: null,
			status: null,
			title: '',
			updatedAt: '',
			logo: '',
			address: '',
			range: '',
			view: null,
			providerMoney: ''
		};
		item.createdAt = itemTpl.created_at.split(' ')[0];
		item.deadline = itemTpl.deadline;
		item.fromNow = itemTpl.from_now;
		item.id = Number(itemTpl.id);
		item.status = Number(itemTpl.status);
		item.title = itemTpl.title;
		item.updatedAt = itemTpl.updated_at;
		item.logo = itemTpl.logo;
		item.address = itemTpl.address;
		item.range = itemTpl.range;
		item.view = Number(itemTpl.view);
		item.providerMoney = itemTpl.provider_money;
		return item;
	});
	backInfo.lastPage = Number(info.last_page);
	backInfo.currentPage = Number(info.current_page);
	return backInfo;
}

export default pureDeveloperBidList;
