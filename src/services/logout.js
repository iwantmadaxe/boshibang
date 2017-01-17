import { clearLocal } from '../utils/localstorage.js';
export default function () {
	clearLocal('user');
	clearLocal('authInfo');
	clearLocal('searchHistory');
	return true;
};
