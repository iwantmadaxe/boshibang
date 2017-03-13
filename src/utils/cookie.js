// 设置cookie
const setCookie = function (name, value) {
	let Days = 30;
	let exp = new Date();
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString();
};

// 读取cookie
const getCookie = function (name) {
	let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
	let arr = document.cookie.match(reg);
	if (arr) {
		return unescape(arr[2]);
	} else {
		return null;
	}
};

// 删除cookie
const delCookie = function (name) {
	let exp = new Date();
	exp.setTime(exp.getTime() - 1);
	let cval = getCookie(name);
	if (cval != null) {
		document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString();
	}
};

export { setCookie, getCookie, delCookie };
