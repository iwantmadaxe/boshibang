/**
* 本企业最新项目信息的返回参数
*/
let backInfo = {
	currentPage: 1,
	items: [],
	lastPage: 1
};

function pureCompanyLatestProject (info) {
	backInfo.items = info.data.map(function (itemTpl) {
		let item = {
			type: null,
			area: '',
			id: null,
			title: '',
			intro: '',
			img1: ''
		};
		item.type = itemTpl.type;
		item.area = itemTpl.area;
		item.id = itemTpl.id;
		item.title = itemTpl.title;
		item.intro = itemTpl.intro;
		item.img1 = itemTpl.img1;
		return item;
	});
	backInfo.lastPage = Number(info.last_page);
	backInfo.currentPage = Number(info.current_page);
	return backInfo;
}

export default pureCompanyLatestProject;
