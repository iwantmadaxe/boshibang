/**
* 供应商管理平台我参与招标列表的返回参数
*/
let backInfo = {
	currentPage: 1,
	items: [],
	lastPage: 1
};

function pureMyBidList (info) {
	backInfo.items = info.data.map(function (itemTpl) {
		let item = {
			title: '',
			companyName: '',
			area: '',
			createdAt: '',
			updatedAt: '',
			deadline: '',
			fromNow: '',
			bidId: null,
			status: null,
			id: null,
			logo: ''
		};
		item.title = itemTpl.bid.title;
		item.companyName = itemTpl.company_name;
		item.area = itemTpl.area;
		item.createdAt = itemTpl.bid.created_at.split(' ')[0];
		item.updatedAt = itemTpl.updated_at.split(' ')[0];
		item.deadline = itemTpl.bid.deadline;
		item.fromNow = itemTpl.from_now;
		item.bidId = Number(itemTpl.bid_id);
		item.status = Number(itemTpl.status);
		item.id = Number(itemTpl.id);
		item.logo = itemTpl.logo;
		return item;
	});
	backInfo.lastPage = Number(info.last_page);
	backInfo.currentPage = Number(info.current_page);
	return backInfo;
}

export default pureMyBidList;
