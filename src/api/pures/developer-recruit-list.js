/**
* 开发商管理平台招募列表的返回参数
*/
let backInfo = {
	currentPage: 1,
	items: [],
	lastPage: 1
};

function pureDeveloperRecruitList (info) {
	backInfo.items = info.data.map(function (itemTpl) {
		let item = {
			createdAt: '',
			deadline: '',
			fromNow: '',
			id: null,
			number: null,
			status: null,
			title: '',
			updatedAt: '',
			logo: ''
		};
		item.createdAt = itemTpl.created_at.split(' ')[0];
		item.deadline = itemTpl.deadline;
		item.fromNow = itemTpl.from_now;
		item.id = Number(itemTpl.id);
		item.number = Number(itemTpl.number);
		item.status = Number(itemTpl.status);
		item.title = itemTpl.title;
		item.updatedAt = itemTpl.updated_at;
		item.logo = itemTpl.logo;
		return item;
	});
	backInfo.lastPage = Number(info.last_page);
	backInfo.currentPage = Number(info.current_page);
	return backInfo;
}

export default pureDeveloperRecruitList;
