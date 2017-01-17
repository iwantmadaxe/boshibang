/**
* 数据验证
*/
// 手机号验证
export const phone = function (num) {
	num = num.trim();
	if (/^1[34578][0-9]{9}$/.test(num)) {
		return true;
	}
	return false;
};

// 邮箱验证
export const email = function (str) {
	str = str.trim();
	if (/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(str)) {
		return true;
	}
	return false;
};

// 必填验证
export const requiredMe = function (str) {
	if (typeof str === 'string' || typeof str === 'number') {
		str = str.trim();
	}
	if (str === null || str === undefined || str === '') {
		return false;
	}
	return true;
};

// 验证数量
export const limitLength = function (str, max, min) {
	str = str.trim().toString();
	let num = str.length;
	max = Number(max);
	min = Number(min);
	if (isNaN(max) || max === null || max === undefined || max === '') {
		max = 0;
	}
	if (isNaN(min) || min === null || min === undefined || min === '') {
		min = -1;
	}
	if (num > max) {
		return 'more';
	} else if (num < min) {
		return 'less';
	} else {
		return 'ok';
	}
};

// 验证相等
export const equal = function (val, oldVal) {
	val = val.trim();
	oldVal = oldVal.trim();
	if (val === oldVal) {
		return true;
	} else {
		return false;
	}
};
