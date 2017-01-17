/**
 * 招募列表管理端的招标状态
 * status: 1=>报名, 2=>入围, 3=>落选, 4=>中标
 */
export default {
	name: 'bidApplyStatus',
	read: function (value) {
		let name = '';
		switch (value) {
		case 0:
			name = '暂无';
			break;
		case 1:
			name = '报名';
			break;
		case 2:
			name = '入围';
			break;
		case 3:
			name = '落选';
			break;
		case 4:
			name = '中标';
			break;
		default:
			name = '暂无';
			break;
		}
		return name;
	}
};
