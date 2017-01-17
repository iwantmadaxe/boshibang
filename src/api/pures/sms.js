/**
* 获取验证码的返回参数
*/
let code = {
	message: '发送成功'
};

function pureCode (info) {
	code.message = info.message;
	return code;
}

export default pureCode;
