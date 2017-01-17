import errors from './errors.js';
import { MessageBox } from 'mint-ui';
const errorLogin = function (response, _this) {
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
		if (response.body.errors.hasOwnProperty('password')) {
			MessageBox.alert(response.body.errors.password[0], '提示');
			return false;
		}
		MessageBox.alert('帐号密码不匹配', '提示');
		return false;
	}
	// 普通错误提示
	MessageBox.alert(response.body.message, '提示');
	return false;
};

export default errorLogin;
