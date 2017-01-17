/**
* 全列表的返回参数
*/
let backInfo = {
	currentPage: 1,
	items: [],
	lastPage: 1
};

function pureAllList (info) {
	backInfo.items = info.items.map(function (itemTpl) {
		let item = {
			address: '',
			companyId: null,
			companyLogo: '',
			companyMoney: '',
			companyName: '',
			fromNow: '',
			id: null,
			indexName: '',
			industry: '',
			range: '',
			status: null,
			title: '',
			deadline: '',
			view: null
		};
		item.address = itemTpl.address;
		item.companyId = Number(itemTpl.company_id);
		item.companyLogo = itemTpl.company_logo;
		item.companyMoney = itemTpl.company_money;
		item.companyName = itemTpl.company_name;
		item.fromNow = itemTpl.from_now;
		item.id = Number(itemTpl.id);
		item.indexName = itemTpl.index_name;
		item.industry = itemTpl.industry;
		item.range = itemTpl.range;
		item.status = Number(itemTpl.status);
		item.title = itemTpl.title;
		item.deadline = itemTpl.deadline;
		item.createdAt = itemTpl.created_at;
		item.view = Number(itemTpl.view);
		return item;
	});
	backInfo.lastPage = Number(info.last_page);
	backInfo.currentPage = Number(info.current_page);
	return backInfo;
}

export default pureAllList;
