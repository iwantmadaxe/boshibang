/**
* 找需求列表的返回参数
*/
let backInfo = {
	currentPage: 1,
	items: [],
	lastPage: 1
};

function pureDemondList (info) {
	backInfo.items = info.items.map(function (itemTpl) {
		let item = {
			address: '',
			companyLogo: '',
			companyMoney: '',
			companyName: '',
			id: null,
			indexName: '',
			project: '',
			bidNum: null,
			recruitNum: null,
			view: null
		};
		item.address = itemTpl.address;
		item.companyLogo = itemTpl.company_logo;
		item.companyMoney = itemTpl.money;
		item.companyName = itemTpl.company_name;
		item.id = Number(itemTpl.id);
		item.indexName = itemTpl.index_name;
		item.project = itemTpl.project;
		item.view = Number(itemTpl.view);
		item.bidNum = Number(itemTpl.bid_num);
		item.recruitNum = Number(itemTpl.recruit_num);
		return item;
	});
	backInfo.lastPage = Number(info.last_page);
	backInfo.currentPage = Number(info.current_page);
	return backInfo;
}

export default pureDemondList;
