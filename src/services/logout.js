import { clearLocal } from '../utils/localstorage.js';
import { delCookie } from '../utils/cookie.js';

export default function () {
	clearLocal('user');
	clearLocal('mine');
	clearLocal('mine-user');
	clearLocal('coupon-list');
	delCookie('has_auth');
	delCookie('api_token');
	return true;
};
