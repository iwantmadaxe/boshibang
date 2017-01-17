let port = {};
if (process.env.NODE_ENV === 'production') {
	port = {
		// route: 'http://192.168.31.207/zeco/public/',
		// route: 'http://192.168.1.104:8080/',
		// route: 'http://139.196.11.82:8888/',
		// route: 'http://localhost:8080/',
		route: 'http://www.zhu-ku.com/',
		version: 'api/v1/'
	};
} else {
	port = {
		// route: 'http://192.168.31.207/zeco/public/',
		// route: 'http://192.168.1.104:8080/',
		// route: 'http://139.196.11.82:8888/',
		route: 'http://localhost:8080/',
		version: 'api/v1/'
	};
}
export default port;
