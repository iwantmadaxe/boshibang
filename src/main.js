// vendor
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

Vue.use(VueRouter);
Vue.use(VueResource);

import store from './vuex/store.js';
import App from './App';    // 基础页面
import RouteList from './route.js';    // 页面路由地址

let router = new VueRouter();

router.map(RouteList);

router.redirect({ '*': '/' });
router.start(Vue.extend({
	components: {
		app: App
	},
	store
}), '#app');

// 路由跳转控制
let indexScrollTop = 0;
router.beforeEach(transition => {
	// 修正各个页面的滑动高度
	if (transition.to.path !== '/') {
		indexScrollTop = document.body.scrollTop;
	}

	// 背景颜色修正
	if (transition.to.path === '/login' || transition.to.path === '/register' || transition.to.path === '/forget') {
		document.body.style.backgroundColor = '#fff';
	} else {
		document.body.style.backgroundColor = '#e9ecf5';
	}

	// 添加各个页面的title
	document.title = transition.to.title || document.title;

	try {
		transition.next();
	} catch (e) {
		transition.abort();
	}
});

router.afterEach(transition => {
	// 修正各个页面的滑动高度
	if (transition.to.path !== '/') {
		document.body.scrollTop = 0;
	} else {
		Vue.nextTick(() => {
			document.body.scrollTop = indexScrollTop;
		});
	}
});
