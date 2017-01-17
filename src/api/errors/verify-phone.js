import errors from './errors.js';
import { MessageBox } from 'mint-ui';
const errorVerifyPhone = function (response, _this) {
	if (errors(response, _this) === false) {
		return false;
	}
	// 处理具体错误
	// 格式错误提示
	if (response.status === 422) {
		if (response.body.errors.hasOwnProperty('phone')) {
			MessageBox.alert(response.body.errors.phone[0], '提示');
			return false;
		}
		MessageBox.alert('手机号错误', '提示');
		return false;
	}
	// 普通错误提示
	MessageBox.alert(response.body.message, '提示');
	return false;
};

export default errorVerifyPhone;
