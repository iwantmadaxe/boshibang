/**
 * 招募列表管理端的招募状态
 * status: 1=>报名中, 2=>报名结束, 3=>招募完成
 */
export default {
	name: 'recruitApplyStatus',
	read: function (value) {
		let name = '';
		switch (value) {
		case 0:
			name = '暂无';
			break;
		case 1:
			name = '报名中';
			break;
		case 2:
			name = '报名结束';
			break;
		case 3:
			name = '招募完成';
			break;
		default:
			name = '暂无';
			break;
		}
		return name;
	}
};
