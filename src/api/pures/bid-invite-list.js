/**
* 供应商管理平台我参与招标列表的返回参数
*/
let backInfo = {
	currentPage: 1,
	items: [],
	lastPage: 1
};

function pureBidInviteList (info) {
	backInfo.items = info.data.map(function (itemTpl) {
		let item = {
			title: '',
			range: '',
			address: '',
			createdAt: '',
			deadline: '',
			bidId: null,
			status: null,
			id: null,
			logo: '',
			view: ''
		};
		item.title = itemTpl.title;
		item.range = itemTpl.range;
		item.address = itemTpl.address;
		item.createdAt = itemTpl.created_at;
		item.deadline = itemTpl.deadline;
		item.bidId = Number(itemTpl.bid_id);
		item.status = Number(itemTpl.bid_status);
		item.id = Number(itemTpl.id);
		item.logo = itemTpl.company_logo;
		item.view = Number(itemTpl.view);
		return item;
	});
	backInfo.lastPage = Number(info.last_page);
	backInfo.currentPage = Number(info.current_page);
	return backInfo;
}

export default pureBidInviteList;
