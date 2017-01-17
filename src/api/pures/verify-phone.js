/**
* 验证手机号是否注册的返回参数
*/
let verifyPhone = {
	isExist: 0
};

function makeVerifyPhone (info) {
	verifyPhone.isExist = Number(info.is_exist);
	return verifyPhone;
}

export default makeVerifyPhone;
