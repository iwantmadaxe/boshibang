/**
* 供应商管理平台我参与招募列表的返回参数
*/
let backInfo = {
	currentPage: 1,
	items: [],
	lastPage: 1
};

function pureMyRecruitList (info) {
	backInfo.items = info.data.map(function (itemTpl) {
		let item = {
			title: '',
			companyName: '',
			area: '',
			createdAt: '',
			updatedAt: '',
			deadline: '',
			fromNow: '',
			recruitId: null,
			view: null,
			status: null,
			id: null,
			logo: '',
			providerMoney: ''
		};
		item.title = itemTpl.recruit.title;
		item.companyName = itemTpl.company_name;
		item.area = itemTpl.area;
		item.createdAt = itemTpl.recruit.created_at.split(' ')[0];
		item.updatedAt = itemTpl.updated_at.split(' ')[0];
		item.deadline = itemTpl.recruit.deadline;
		item.fromNow = itemTpl.from_now;
		item.recruitId = Number(itemTpl.recruit_id);
		item.view = Number(itemTpl.view);
		item.status = Number(itemTpl.status);
		item.id = Number(itemTpl.id);
		item.logo = itemTpl.logo;
		item.providerMoney = itemTpl.recruit.provider_money;
		return item;
	});
	backInfo.lastPage = Number(info.last_page);
	backInfo.currentPage = Number(info.current_page);
	return backInfo;
}

export default pureMyRecruitList;
