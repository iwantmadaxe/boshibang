/**
* 本企业中标列表的返回参数
*/
let backInfo = {
	currentPage: 1,
	items: [],
	lastPage: 1
};

function pureWinBidList (info) {
	backInfo.items = info.data.map(function (itemTpl) {
		let item = {
			updatedAt: '',
			createdAt: '',
			id: null,
			title: '',
			apply: {
				bidId: null,
				companyId: null,
				companyName: ''
			},
			logo: '',
			range: ''
		};
		item.updatedAt = itemTpl.updated_at;
		item.createdAt = itemTpl.created_at;
		item.logo = itemTpl.logo;
		item.range = itemTpl.range;
		item.id = itemTpl.id;
		item.title = itemTpl.title;
		item.apply.bidId = itemTpl.apply[0].bid_id;
		item.apply.companyId = itemTpl.apply[0].company_id;
		item.apply.companyName = itemTpl.apply[0].company_name;
		return item;
	});
	backInfo.lastPage = Number(info.last_page);
	backInfo.currentPage = Number(info.current_page);
	return backInfo;
}

export default pureWinBidList;
