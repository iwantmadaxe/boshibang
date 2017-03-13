let port = {};
if (process.env.NODE_ENV === 'production') {
	port = {
		route: 'http://bosshelper.odinsoft.com.cn/',
		version: 'api/v1/'
	};
} else {
	port = {
		// route: 'http://localhost:8080/',
		route: 'http://bosshelper.odinsoft.com.cn/',
		version: 'api/v1/'
	};
}
export default port;
