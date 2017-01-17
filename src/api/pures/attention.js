/**
 * 关注列表的返回参数
 */
let backInfo = {
	currentPage: 1,
	items: [],
	lastPage: 1
};

function pureAttentionList (info) {
	backInfo.items = info.data.map(function (itemTpl) {
		let item = {
			id: null,
			logo: '',
			companyId: null,
			companyMoney: '',
			companyName: '',
			category: '',
			companyType: ''
		};
		item.id = itemTpl.id;
		item.logo = itemTpl.logo;
		item.companyId = itemTpl.attention.company_id;
		item.companyMoney = itemTpl.attention.company_money;
		item.category = itemTpl.category;
		item.companyType = itemTpl.company_type;
		item.companyName = itemTpl.attention.company_name;
		return item;
	});
	backInfo.lastPage = Number(info.last_page);
	backInfo.currentPage = Number(info.current_page);
	return backInfo;
}

export default pureAttentionList;
