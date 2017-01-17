/**
* 全列表的返回参数
*/
let backInfo = {
	items: []
};

function pureAddressList (info) {
	backInfo.items = info.addresses.map(function (itemTpl) {
		let item = {
			id: null,
			code: null,
			name: '',
			level: 1
		};
		item.id = itemTpl.id;
		item.code = itemTpl.code;
		item.name = itemTpl.name;
		item.level = Number(itemTpl.level);
		return item;
	});
	return backInfo;
}

export default pureAddressList;
