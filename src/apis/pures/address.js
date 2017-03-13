/**
* 全列表的返回参数
*/
let backInfo = {
	items: []
};

function pureAddressList (info) {
	backInfo.items = info.map(function (itemTpl) {
		let item = {
			id: null,
			code: null,
			name: '',
			level: 1
		};
		item.id = itemTpl.id;
		item.code = itemTpl.code;
		item.name = itemTpl.name;
		item.level = itemTpl.hasOwnProperty('level') ? Number(itemTpl.level) : 1;
		return item;
	});
	return backInfo;
}

export default pureAddressList;
