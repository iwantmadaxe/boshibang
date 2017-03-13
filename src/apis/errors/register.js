import errors from './errors.js';
import { MessageBox } from 'mint-ui';
const errorRegister = function (response, _this) {
	if (errors(response, _this) === false) {
		return false;
	}
	// 处理具体错误
	if (response.status === 403 && response.data.code === '403001') { // 已注册
		_this.$router.push({name: 'OrderCreate'}); // 跳转创建订单
	}
	// 格式错误提示
	if (response.status === 422) {
		MessageBox.alert(response.data.message, '提示');
		return false;
	}
	// 普通错误提示
	MessageBox.alert(response.data.message, '提示');
	return false;
};

export default errorRegister;
