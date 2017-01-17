import errors from './errors.js';
import { MessageBox } from 'mint-ui';
const errorBidApply = function (response, _this) {
	if (errors(response, _this) === false) {
		return false;
	}
	// 处理具体错误
	// 格式错误提示
	if (response.status === 422) {
		for (let key in response.body.errors) {
			MessageBox.alert(response.body.errors[key][0], '提示');
			break;
		}
		return false;
	}
	// 普通错误提示
	MessageBox.alert(response.body.message, '提示');
	return false;
};

export default errorBidApply;
