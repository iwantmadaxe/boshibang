import { clearLocal } from '../utils/localstorage.js';
import { delCookie } from '../utils/cookie.js';

export default function () {
	clearLocal('user');
	delCookie('has_auth');
	delCookie('api_token');
	return true;
};
